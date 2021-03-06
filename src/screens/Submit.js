import React from 'react';
import { Image, View, Dimensions, TouchableOpacity, Text, Linking, TouchableHighlight, TextInput } from 'react-native';
import styles from '../styles'

export default class Submit extends React.Component {
  static navigationOptions = {
    title: 'Submit',
  };
  constructor(props) {
    super(props)
    this.state = {
      title: 'spreadsheet',
      recipients: ['azisis219@gmail.com'],
      submitted: false,
      url: '',
      isPrivate: true
    }
  }

  submitSpreadsheet = () => {
    let body = JSON.stringify({
      data: this.props.navigation.state.params.model,
      title: this.state.title,
      recipients: this.state.recipients,
      private: this.state.isPrivate
    })

    fetch('http://local.paom.com:8000/api/spreadsheets/', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(body)
     }).then(response => {
       if (response.status == 200) {
         this.setState({submitted: true})
       }
       return response.json();
     })
     .then(data => {
         console.log(data)
         this.setState({url: data.url})
         return data;
     })
     .catch(error => {
         console.log(error)
         return error;
     });
  }

  renderSuccess = () => {
    const {navigate} = this.props.navigation;

    return (
      <View>
        <Text style={[styles.h1, {marginBottom: 15}]}>Your spreadsheet has been sent!</Text>
        <Text onPress={() => Linking.openURL(this.state.url)} style={[styles.h1, {marginBottom: 15}]}>{this.state.url}</Text>
        <TouchableHighlight
          style={{backgroundColor: 'white', padding: 10}}
          onPress={() => {this.props.navigation.state.params.reset(); navigate('Home')}}
          >
            <Text style={{textAlign: 'center', fontFamily: "Avenir-Medium", fontSize: 20, color: 'pink'}}>
              New Spreadsheet
            </Text>
        </TouchableHighlight>
      </View>
    )
  }

  renderSubmit = () => {
    const {width, height} = Dimensions.get('window');
    const {navigate} = this.props.navigation;

    return (
      <View>
        <View style={{padding: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[{flex: .25}, styles.h1]}>Title:</Text>
          <TextInput
            onChangeText={(text) => this.setState({title: text})}
            style={{height: 40, flex: .75, borderColor: 'gray', borderWidth: 1}}
            value={this.state.title}
          />
        </View>
        <View style={{padding: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[{flex: .25}, styles.h1]}>Send To:</Text>
          <TextInput
            onChangeText={(email) => {emails = this.state.recipients; emails[0] = email; this.setState({recipients: emails})}}
            style={{height: 40, flex: .75, borderColor: 'gray', borderWidth: 1}}
            value={this.state.recipients[0]}
          />
        </View>
        <View style={[styles.flexRow, {justifyContent: 'center'}]}>
          <Text style={{textAlign: 'center', fontFamily: "Avenir-Medium", fontSize: 20, color: 'white'}}>
            Private:
          </Text>
          <TouchableOpacity
            onPress={() => {this.setState({isPrivate: true})}}
            style={{backgroundColor: this.state.isPrivate ? 'white' : 'pink', margin: 15, width: 24, height: 24, borderColor: 'black', borderWidth: 2, borderRadius: 12}}
          />
          <Text style={{textAlign: 'center', fontFamily: "Avenir-Medium", fontSize: 20, color: 'white'}}>
            Public:
          </Text>
          <TouchableOpacity
            onPress={() => {this.setState({isPrivate: false})}}
            style={{backgroundColor: this.state.isPrivate ? 'pink' : 'white', margin: 15, width: 24, height: 24, borderColor: 'black', borderWidth: 2, borderRadius: 12}}
          />
        </View>
        <TouchableHighlight
          style={{backgroundColor: 'white', padding: 10}}
          onPress={this.submitSpreadsheet}
          >
            <Text style={{textAlign: 'center', fontFamily: "Avenir-Medium", fontSize: 20, color: 'pink'}}>
              SUBMIT
            </Text>
        </TouchableHighlight>
      </View>
    )

  }

  render() {
    return (
      <View style={[styles.fullScreen, {padding: 15, backgroundColor: 'pink'}]}>
        {this.state.submitted ? this.renderSuccess() : this.renderSubmit()}
      </View>
    );
  }
}
