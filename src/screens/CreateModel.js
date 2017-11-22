import React from 'react';
import { Text, View, ScrollView, Button, Picker, TouchableHighlight, Dimensions, TextInput, ImagePickerIOS, Image, TouchableOpacity } from 'react-native';
import styles from '../styles'

export default class CreateModelScreen extends React.Component {
  static navigationOptions = {
    title: 'Enter your Data',
  };

  constructor(props) {
    super(props)
    this.state = {
      spreadsheet: [[{value: null, type: null}, {value: null, type: null}],
                    [{value: null, type: null}, {value: null, type: null}]],
      row: 0,
      col: 0,
      type: 'TEXT',
    }
  }

  setValue = (value = null, type = null) => {
    let spreadsheetCopy = this.state.spreadsheet
    let obj = {value: value, type: type}
    spreadsheetCopy[this.state.row][this.state.col] = obj
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
      this.setState({type: this.state.spreadsheet[this.state.row][this.state.col + 1].type || 'TEXT'})
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
      this.setState({type: this.state.spreadsheet[this.state.row + 1][this.state.col].type || 'TEXT'})
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
                switch(col.type) {
                  case 'IMAGE':
                    return (
                      <TouchableOpacity key={i*row.length + j} onPress={() => this.setState({row: i, col: j})} style={{width: 50, height: 50}}>
                      <Image style={{width: 50, height: 50, borderColor: 'black', borderWidth: 1, backgroundColor: this.state.col == j && this.state.row == i ? 'black' : 'transparent'}}

                            source={{ uri: this.state.spreadsheet[i][j].value }}
                      ></Image>
                      </TouchableOpacity>
                    )
                  default: // includes TEXT case
                    return (
                      <Text onPress={() => this.setState({row: i, col: j})} style={{width: 50, height: 50, borderColor: 'black', borderWidth: 1, backgroundColor: this.state.col == j && this.state.row == i ? 'black' : 'transparent', color: this.state.col == j && this.state.row == i ? 'white' : 'black',}}
                            key={i*row.length + j}>{col.value || 'null'}</Text>
                    )
                }

              })
            }
          </View>
        )
      })
    )
  }

  pickImage = () => {
    // openSelectDialog(config, successCallback, errorCallback);
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      this.setState({ imgTest: imageUri });
      this.setValue(imageUri, 'IMAGE')
    }, error => console.error(error));
  }

  setType = (type) => {
    // let spreadsheetCopy = this.state.spreadsheet
    // spreadsheetCopy[this.state.row][this.state.col].type = type
    this.setState({
      // spreadsheet: spreadsheetCopy
      type: type
    })
  }

  renderInputs() {
    return (
      <View style={[{width: '100%', padding: 15}, styles.flexCol]}>

        <Text style={{marginBottom: 10}}>Row {this.state.row + 1}, Column {this.state.col + 1}</Text>
        <Text>---SELECT TYPE---</Text>
        <View style={[styles.flexRow, {justifyContent: 'center'}]}>
          <TouchableHighlight
            onPress={() => {this.setType('TEXT')}}
            style={[styles.navButton, {backgroundColor: this.state.type == 'TEXT' ? '#dabeff' : 'transparent'}]}
          >
            <Text>TEXT</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {this.setType('IMAGE')}}
            style={[styles.navButton, {backgroundColor: this.state.type == 'IMAGE' ? '#dabeff' : 'transparent'}]}
          >
            <Text>IMAGE</Text>
          </TouchableHighlight>
        </View>
        {
          this.state.type == 'IMAGE'
            &&
            <View>
            <TouchableHighlight
                style={[styles.navButton], {height: 40, marginVertical: 20}}
                onPress={this.pickImage}
              >
              <Text style={[styles.bigButtonText, {backgroundColor: '#aaffaa', padding: 20}]}>
                UPLOAD IMAGE
              </Text>
            </TouchableHighlight>
            </View>
          }
          {
            this.state.type == 'TEXT' &&
            <View style={{marginVertical: 20}}>
              <Text>ENTER TEXT HERE:</Text>
              <TextInput
                style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => {this.setValue(text, 'TEXT')}}
                value={this.getValue()}
                selectTextOnFocus={true}
              />
            </View>
          }
      </View>
    )
  }

  render() {
    const {navigate} = this.props.navigation;
    const {height, width} = Dimensions.get('window');
    return (
      <View style={[styles.flexCol, styles.fullScreen, {width: '100%'}]}>

        <View style={{flex: .33, width: '100%'}}>
          {this.renderInputs()}
        </View>

        <View style={{flex: .33, width: '100%'}}>
          <ScrollView style={{borderColor: 'lightgrey', borderWidth: 1}}>
          {
            this.renderPreview()
          }
          </ScrollView>
        </View>

        <View style={[styles.flexCol, {flex: .33, width: '100%'}]}>
          <TouchableHighlight
            style={[styles.navButton]}
              onPress={() => {
                this.setState({row: Math.max(this.state.row - 1, 0)})
                this.setState({type: this.state.spreadsheet[Math.max(this.state.col - 1, 0)][this.state.col].type || 'TEXT'})
              }}
            >
              <Text style={[styles.bigButtonText]}>
                ^
              </Text>
          </TouchableHighlight>
          <View style={[styles.flexRow, {justifyContent: 'center'}]}>
            <TouchableHighlight
                style={[styles.navButton, {marginRight: 40}]}
                onPress={() => {
                  this.setState({col: Math.max(this.state.col - 1, 0)})
                  this.setState({type: this.state.spreadsheet[this.state.row][Math.max(this.state.col - 1, 0)].type || 'TEXT'})
                }}
              >
                <Text style={[styles.bigButtonText]}>
                  {`<`}
                </Text>
            </TouchableHighlight>
            <TouchableHighlight
            style={[styles.navButton]}
              onPress={this.nextCol}
            >
              <Text style={[styles.bigButtonText]}>
                {`>`}
              </Text>
          </TouchableHighlight>
        </View>

              <TouchableHighlight
              style={[styles.navButton]}
                onPress={this.nextRow}
              >
                <Text style={[styles.bigButtonText]}>
                  v
                </Text>
            </TouchableHighlight>

          <TouchableHighlight
            style={[styles.navButton]}
            >
              <Text style={[styles.bigButtonText]}>
                E-MAIL SPREADSHEET
              </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
