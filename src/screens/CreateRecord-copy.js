import React from 'react';
import { Text, TextInput, View, ScrollView, Button, Picker } from 'react-native';
import styles from '../styles'

export default class CreateModelScreen extends React.Component {
  static navigationOptions = {
    title: 'Enter Your Data',
  };

  constructor(props) {
    super(props);
    let newArray = this.props.navigation.state.params.model.slice();
    // newArray.forEach((obj) => {obj.value = null})
    
    // AEZ TODO - this seems to be referencing and overwriting the original rather than copying it into the new state
    // right now, the model is stored as [{format, value}, {format, value},...]
    // the record here is a copy of that, where value will be initialized to null and entered in
    this.state = {
      record: newArray
    }
  }
  editValue = (index, value) => {
    let newRecord = this.state.record.slice();
    newRecord[index].value = value;
    this.setState({record: newRecord})
  }

  renderDataInput = (index) => {
    switch(this.state.record[index].format) {
      case 'text':
        return (
          <TextInput
            style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(value) => this.editValue(index, value)}
            value={this.state.record[index].value}
            selectTextOnFocus={true}
          />
        );
      case 'image':
        return (
          <Text>Input Image Here</Text>
        );
      case 'number':
        return (
          <TextInput
            style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(value) => this.editValue(index, value)}
            value={this.state.record[index].value}
            selectTextOnFocus={true}
          />
        );
      case 'date':
        return (
          <TextInput
            style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(value) => this.editValue(index, value)}
            value={this.state.record[index].value}
            selectTextOnFocus={true}
          />
        );
      default:
        return (
          <Text>Input (undefined format) Here</Text>
        )
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={[styles.flexCol, styles.fullScreen]}>
        <ScrollView>
          {
            this.props.navigation.state.params.model.map((item, index) => {
              return (
                <View style={[styles.hr, styles.padding]} key={index}>
                  <Text style={[styles.underline]}>
                    {item.value}
                  </Text>
                  {this.renderDataInput(index)}
                </View>
              )
            })
          }
        </ScrollView>

        <View style={[styles.flexRow]}>
          <Button
            title="NEXT"
            onPress={() => navigate('CreateRecord')}
          />
        </View>
      </View>
    );
  }
}
