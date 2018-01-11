import React from 'react';
import { Image, View, Dimensions, Text, TouchableHighlight, TextInput } from 'react-native';
import styles from '../styles'

export default class Submit extends React.Component {
  static navigationOptions = {
    title: 'Submit',
  };
  constructor(props) {
    super(props)
    this.state = {
      title: 'spreadsheet',
      recipients: ['azisis219@gmail.com']
    }
  }

  submitSpreadsheet = () => {
    let body = JSON.stringify({
      data: this.props.navigation.state.params.model,
      title: this.state.title,
      recipients: this.state.recipients
    })

    fetch('http://local.paom.com:8000/api/spreadsheets/', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(body)
     }).then(response => {
       console.log(response.json())
       return response.json();
     })
     .then(data => {
         console.log(data)
         return data;
     })
     .catch(error => {
         console.log(error)
         return error;
     });
  }

  render() {
    const {width, height} = Dimensions.get('window');
    const {navigate} = this.props.navigation;
    return (
      <View style={[styles.fullScreen, {padding: 15, backgroundColor: 'pink'}]}>
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
        <TouchableHighlight
          style={{backgroundColor: 'white', padding: 10}}
          onPress={this.submitSpreadsheet}
          >
            <Text style={{textAlign: 'center', fontFamily: "Avenir-Medium", fontSize: 20, color: 'pink'}}>
              SUBMIT
            </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
