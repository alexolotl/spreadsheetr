import React from 'react';
import { Text, View, ScrollView, Button, Picker, TouchableHighlight, Dimensions, TextInput } from 'react-native';
import styles from '../styles'

import SelectFormatRow from '../components/SelectFormatRow'

export default class CreateModelScreen extends React.Component {
  static navigationOptions = {
    title: 'Structure Your Data',
  };

  constructor(props) {
    super(props)
    this.state = {
      spreadsheet: [[{value: null, type: null}]],
      row: 0,
      col: 0
    }
  }

  setValue = (value, type) => {
    let spreadsheetCopy = this.state.spreadsheet
    let obj = {value: value, type: type}
    spreadsheetCopy[this.state.row, this.state.col] = obj
    this.setState({
      spreadsheet: spreadsheetCopy
    })
  }

  getValue = () => {
    return this.state.spreadsheet[this.state.row][this.state.col] ?
      this.state.spreadsheet[this.state.row][this.state.col].value
      :
      null
  }

  newColumn = () => {

  }
  render() {
    const {navigate} = this.props.navigation;
    const {height, width} = Dimensions.get('window');
    return (
      <View style={[styles.flexCol, styles.fullScreen]}>
        <ScrollView style={[styles.fullScreen]}>
          <View style={[styles.flexCol, {width: '100%'}]}>
            <Text>Column {this.state.col + 1}</Text>
            <TextInput
              style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => {this.setValue(text, 'TEXT')}}
              value={this.getValue()}
              selectTextOnFocus={true}
            />
          </View>

          <View>{this.state.spreadsheet.map((val, i) => {
            return (
                <Text key={i} style={{color: this.state.col == i ? 'blue' : 'black'}}>{val.type}: {val.value}</Text>
            )
          })}</View>
        </ScrollView>

        <View style={[styles.flexCol]}>
            <TouchableHighlight
              onPress={() => {this.setState({col: this.state.col + 1})}}
            >
              <Text style={[styles.bigButtonText]}>
                Next Column
              </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {this.setState({col: Math.max(this.state.col - 1, 0)})}}
          >
            <Text style={[styles.bigButtonText]}>
              Prev Column
            </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {this.setState({row: this.state.row + 1, col: 0})}}
        >
          <Text style={[styles.bigButtonText]}>
            New Row Entry
          </Text>
      </TouchableHighlight>
        </View>
      </View>
    );
  }
}
