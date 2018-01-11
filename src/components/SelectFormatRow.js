import React from 'react';
import { Text, View, Button, TextInput, Picker, TouchableHighlight } from 'react-native';
import styles from '../styles';

export default class SelectFormatRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'text'
    }
  }

  render() {

    return (
      <View style={[styles.flexCol, styles.hr, styles.padding]}>

        <View style={[styles.flexRow, {width: '100%'}]}>
          <Text>Column Title:</Text>
          <TextInput
            style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => {this.props.onSetValue(text, this.props.index)}}
            value={this.props.value}
            selectTextOnFocus={true}
          />
        </View>
        <View style={[styles.flexRow]}>
          <TouchableHighlight
            onPress={()=>{this.props.onSetFormat('text', this.props.index); this.setState({selected: 'text'})}}
            style={[styles.smallButton, {backgroundColor: this.state.selected == 'text' ? 'grey' : 'white'}]}
          >
            <Text>Text</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={()=>{this.props.onSetFormat('image', this.props.index); this.setState({selected: 'image'})}}
            style={[styles.smallButton, {backgroundColor: this.state.selected == 'image' ? 'grey' : 'white'}]}
          >
            <Text>Image</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={()=>{this.props.onSetFormat('number', this.props.index); this.setState({selected: 'number'})}}
            style={[styles.smallButton, {backgroundColor: this.state.selected == 'number' ? 'grey' : 'white'}]}
          >
            <Text>Number</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={()=>{this.props.onSetFormat('date', this.props.index); this.setState({selected: 'date'})}}
            style={[styles.smallButton, {backgroundColor: this.state.selected == 'date' ? 'grey' : 'white'}]}
          >
            <Text>Date</Text>
          </TouchableHighlight>
          <Button
            onPress={() => {this.props.onDelete(this.props.index)}}
            title="X"
          />
        </View>

      </View>
    );
  }
}
