import React from 'react';
import { Text, View, ScrollView, Button, Picker, TouchableHighlight, Dimensions } from 'react-native';
import styles from '../styles'

import SelectFormatRow from '../components/SelectFormatRow'

export default class CreateModelScreen extends React.Component {
  static navigationOptions = {
    title: 'Structure Your Data',
  };

  constructor(props) {
    super(props)
    this.state = {
      dataTypes: [{format: 'text', value: 'Column 1'}],
      counter: 2 // used to name new columns without repetition, even if you delete one
    }
  }
  appendRow = () => { // causing problems
    this.setState({counter: this.state.counter + 1}) // increase column naming index to avoid duplicates
    let newArray = this.state.dataTypes.slice();
    newArray.push({format: 'text', value: `Column ${(this.state.counter).toString()}`});
    this.setState({dataTypes: newArray})
  }
  deleteRow = (index) => {
    let newArray = this.state.dataTypes.slice();
    newArray.splice(index, 1);
    this.setState({dataTypes: newArray})
  }
  setFormat = (format, i) => {
    let newArray = this.state.dataTypes.slice();
    newArray[i].format = format;
    this.setState({dataTypes: newArray})
  }
  setValue = (value, i) => {
    let newArray = this.state.dataTypes.slice();
    newArray[i].value = value;
    this.setState({dataTypes: newArray})
  }
  render() {
    const {navigate} = this.props.navigation;
    const {height, width} = Dimensions.get('window');
    return (
      <View style={[styles.flexCol, styles.fullScreen]}>
        <ScrollView style={[styles.fullScreen]}>
          {
            this.state.dataTypes.map((type, i) => {
              return (
                <SelectFormatRow
                  key={i}
                  index={i}
                  format={this.state.dataTypes[i].format}
                  value={this.state.dataTypes[i].value}
                  onSetFormat={this.setFormat}
                  onSetValue={this.setValue}
                  onDelete={this.deleteRow}
                />
              )
            })
          }
          <Button
            title="Add Column"
            onPress={this.appendRow}
          />
        </ScrollView>

        <View style={[styles.flexRow]}>
            <TouchableHighlight
              onPress={() => navigate('CreateRecord', {model: this.state.dataTypes.slice()})}
              style={[styles.bigButton, styles.flexRow]}
            >
              <Text style={[styles.bigButtonText]}>
                New Record
              </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
