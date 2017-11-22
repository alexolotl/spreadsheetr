import React from 'react';
import { Text, View, ScrollView, Button, Picker, TouchableHighlight, Dimensions, TextInput } from 'react-native';
import styles from '../styles'

import ImagePicker from 'react-native-image-picker'

export default class CreateModelScreen extends React.Component {
  static navigationOptions = {
    title: 'Structure Your Data',
  };

  constructor(props) {
    super(props)
    this.state = {
      spreadsheet: [[{value: null, type: null}, {value: null, type: null}],
                    [{value: null, type: null}, {value: null, type: null}]],
      row: 0,
      col: 0,
      imgTest: null
    }
  }

  setValue = (value = null, type = null) => {
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

  nextCol = () => {
    if (this.state.col < this.state.spreadsheet[0].length - 1) {
      this.setState({
        col: this.state.col + 1
      })
      return;
    } else {
      let spreadsheetCopy = this.state.spreadsheet
      let newEmptyCol = []
      for (let i = 0; i < spreadsheetCopy.length; i++) {
        spreadsheetCopy[i].push({value: null, type: null})
      }
      this.setState({
        col: this.state.col + 1,
        spreadsheet: spreadsheetCopy
      })
    }
  }

  nextRow = () => {
    if (this.state.row < this.state.spreadsheet.length - 1) {
      this.setState({
        row: this.state.row + 1
      })
      return;
    } else {
      let spreadsheetCopy = this.state.spreadsheet
      let newEmptyRow = []
      for (let i = 0; i < this.state.spreadsheet[0].length; i++) {
        newEmptyRow[i] = {value: null, type: null}
      }
      spreadsheetCopy.push(newEmptyRow)
      this.setState({
        row: this.state.row + 1,
        col: 0,
        spreadsheet: spreadsheetCopy
      })
    }
  }

  renderPreview () {
    return (
      this.state.spreadsheet.map((row, i) => {
        return(
          <View key={i} style={[styles.flexRow]}>
            {
              row.map((col, j) => {
                return (
                  <Text onPress={() => this.setState({row: i, col: j})} style={{padding: 5, borderColor: 'black', borderWidth: 1, backgroundColor: this.state.col == j && this.state.row == i ? 'black' : 'transparent', color: this.state.col == j && this.state.row == i ? 'white' : 'black',}}
                        key={i*row.length + j}>{col.value || 'null'}</Text>
                )
              })
            }
          </View>
        )
      })
    )
  }
  pickImage = () => {
    var options = {
      title: 'Select Avatar',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info below in README)
     */
     console.log(ImagePicker)
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          imgTest: source
        });
      }
    });
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

          <View>
          {
            this.renderPreview()
          }
          {
            this.state.imgTest && <img src={this.state.imgTest}></img>
          }
          </View>
        </ScrollView>

        <TouchableHighlight
            style={[styles.navButton]}
            onPress={this.pickImage}
          >
            <Text style={[styles.bigButtonText]}>
              Pick Image
            </Text>
        </TouchableHighlight>

        <View style={[styles.flexCol]}>
          <View style={[styles.flexRow]}>
            <TouchableHighlight
                style={[styles.navButton]}
                onPress={() => {this.setState({col: Math.max(this.state.col - 1, 0)})}}
              >
                <Text style={[styles.bigButtonText]}>
                  Prev Column
                </Text>
            </TouchableHighlight>
            <TouchableHighlight
            style={[styles.navButton]}
              onPress={this.nextCol}
            >
              <Text style={[styles.bigButtonText]}>
                Next Column
              </Text>
          </TouchableHighlight>
        </View>
        <View style={[styles.flexRow]}>
              <TouchableHighlight
                style={[styles.navButton]}
                  onPress={() => {this.setState({row: Math.max(this.state.row - 1, 0)})}}
                >
                  <Text style={[styles.bigButtonText]}>
                    Prev Row
                  </Text>
              </TouchableHighlight>
              <TouchableHighlight
              style={[styles.navButton]}
                onPress={this.nextRow}
              >
                <Text style={[styles.bigButtonText]}>
                  Next Row
                </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}
