import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Button,
  Picker,
  TouchableHighlight,
  Dimensions,
  TextInput,
  ImagePickerIOS,
  NativeModules,
  Image,
  TouchableOpacity } from 'react-native';

import styles from '../styles'

import Camera from 'react-native-camera';

export default class CreateModelScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state

    return {
      title: 'Create Your Sheet',
      headerRight: <Button title='Reset' onPress={() => params.handleReset()} />
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      spreadsheet: [[{value: null, type: null}, {value: null, type: null}],
                    [{value: null, type: null}, {value: null, type: null}]],
      row: 0,
      col: 0,
      type: 'TEXT'
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleReset: this.reset });
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

  getType = () => {
    return this.state.spreadsheet[this.state.row][this.state.col] ?
      this.state.spreadsheet[this.state.row][this.state.col].type
      :
      null
  }

  newCol = () => {
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

  nextCol = () => {
    if (this.state.col < this.state.spreadsheet[0].length - 1) {
      this.setState({
        col: this.state.col + 1
      })
      this.setState({type: this.state.spreadsheet[this.state.row][this.state.col + 1].type || 'TEXT'})
      return;
    } else {
      this.newCol()

    }
  }

  newRow = () => {
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

  nextRow = () => {
    if (this.state.row < this.state.spreadsheet.length - 1) {
      this.setState({
        row: this.state.row + 1
      })
      this.setState({type: this.state.spreadsheet[this.state.row + 1][this.state.col].type || 'TEXT'})
      return;
    } else {
      this.newRow()
    }
  }

  renderPreview () {
    return (
      this.state.spreadsheet.map((row, i) => {
        return(
          <View key={i} style={[styles.flexRow, {marginRight: 30}]}>

            {
              row.map((col, j) => {
                switch(col.type) {
                  case 'IMAGE':
                    return (
                      <TouchableOpacity key={i*row.length + j} onPress={() => this.setState({row: i, col: j})} style={{width: 50, height: 50}}>
                      <Image style={{width: 50, height: 50, borderColor: 'black', borderWidth: 1, backgroundColor: this.state.col == j && this.state.row == i ? 'black' : 'white'}}
                            source={{ uri: this.state.spreadsheet[i][j].value }}
                      ></Image>
                      </TouchableOpacity>
                    )
                  default: // includes TEXT case
                    return (
                      <Text onPress={() => this.setState({row: i, col: j})} style={{width: 50, height: 50, borderColor: 'black', borderWidth: 1, backgroundColor: this.state.col == j && this.state.row == i ? 'black' : 'white', color: this.state.col == j && this.state.row == i ? 'white' : 'black',}}
                            key={i*row.length + j}>{col.value || `${i},${j}\n(null)`}</Text>
                    )
                }

              })
            }
          </View>
        )
      })
    )
  }

  setType = (type) => {
    // let spreadsheetCopy = this.state.spreadsheet
    // spreadsheetCopy[this.state.row][this.state.col].type = type
    this.setState({
      // spreadsheet: spreadsheetCopy
      type: type
    })
  }

  pickImage = () => {
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      console.log(imageUri)
      NativeModules.ReadImageData.readImage(imageUri, (image) => {
        console.log(image)
        const data_uri = 'data:image/jpg;base64,' + image
        this.setState({ imgTest: data_uri });
        this.setValue(data_uri, 'IMAGE')
      })
      // let photo = {
      //     uri: imageUri,
      //     type: 'image/jpeg',
      //     name: 'photo.jpg'
      // };

      // this.setState({ imgTest: imageUri });
      // this.setValue(imageUri, 'IMAGE')

    },
    error => {
      // console.error(error)
      console.log('there was an error')
    });
  }

  takePicture = () => {
     this.camera.capture()
       .then((data) => {
         console.log(data.mediaUri)
         NativeModules.ReadImageData.readImage(data.mediaUri, (image) => {
           console.log(image)
           const data_uri = 'data:image/jpg;base64,' + image
           this.setState({ imgTest: data_uri });
           this.setValue(data_uri, 'IMAGE')
         })
         // this.setState({ imgTest: data.mediaUri });
         // this.setValue(data.mediaUri, 'IMAGE');
       })
       .catch(err => console.error(err));
   }

   reset = () => {
     this.setState({
       spreadsheet: [[{value: null, type: null}, {value: null, type: null}],
                     [{value: null, type: null}, {value: null, type: null}]],
       row: 0,
       col: 0,
       type: 'TEXT',
     })
   }

  renderInputs() {

    const {navigate} = this.props.navigation;
    return (
      <View style={[{width: '100%', padding: 15}, styles.flexCol]}>

        <Text style={[styles.h1, {marginBottom: 10}]}>Row {this.state.row + 1}, Column {this.state.col + 1}</Text>
        <View style={[styles.flexRow, {width: '100%', justifyContent: 'center'}]}>
          <TouchableHighlight
            onPress={() => {this.setType('TEXT')}}
            style={[styles.typeButton, {flex: 1, borderRightWidth: 0, borderBottomWidth: this.state.type == 'TEXT' ? 0 : 1}]}
          >
            <Text>TEXT</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {this.setType('IMAGE')}}
            style={[styles.typeButton, {flex: 1, borderBottomWidth: this.state.type == 'IMAGE' ? 0 : 1}]}
          >
            <Text style={[styles.flexCenter]}>IMAGE</Text>
          </TouchableHighlight>
        </View>
        {
          this.state.type == 'IMAGE'
            &&
            <View style={{width: '100%', borderWidth: 1, borderColor: 'black', borderTopWidth: 0, padding: 10}}>
              <TouchableHighlight
                  style={[styles.camButton]}
                  onPress={this.pickImage}
                >
                <Text style={[styles.bigButtonText]}>
                  Upload From Camera Roll
                </Text>
              </TouchableHighlight>

                <Camera
                   ref={(cam) => {
                     this.camera = cam;
                   }}
                   aspect={Camera.constants.Aspect.fill}
                   style={[styles.camButton, {backgroundColor: 'pink'}]}
                >
                   <Text onPress={this.takePicture} style={[styles.bigButtonText]}>
                     Capture With Camera
                   </Text>
                </Camera>

          {
            this.getValue() && this.getType() == 'IMAGE' &&
            <TouchableHighlight
              style={[styles.camButton]}
              onPress={() => navigate('PreviewImage', {model: this.getValue()})}
            >
              <Text style={[styles.bigButtonText]}>
                Preview Image
              </Text>
            </TouchableHighlight>
          }

            </View>
          }
          {
            this.state.type == 'TEXT' &&
            <View style={{width: '100%', borderWidth: 1, borderColor: 'black', borderTopWidth: 0, padding: 10}}>
              <Text style={[styles.h1]}>Enter Text:</Text>
              <TextInput
                style={{height: 40, width: '100%', borderColor: 'gray', borderWidth: 1}}
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
      <ScrollView style={[{width: '100%', backgroundColor: 'pink'}]}>
        <View style={{width: '100%'}}>
          {this.renderInputs()}
        </View>

        <View style={{width: '100%'}}>
          <ScrollView horizontal={true} style={{paddingHorizontal: 15}}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <View>
                {
                  this.renderPreview()
                }
              </View>
              {
                //<Text onPress={this.newCol} style={{fontSize: 30, margin: 10}}>+</Text>
              }
            </View>
          </ScrollView>
        </View>

        <View style={[styles.flexCol, {width: '100%', padding: 20}]}>
          <TouchableHighlight
            style={[styles.navButton]}
              onPress={() => {
                this.setState({row: Math.max(this.state.row - 1, 0)})
                this.setState({type: this.state.spreadsheet[Math.max(this.state.col - 1, 0)][this.state.col].type || 'TEXT'})
              }}
            >
              <Text style={[styles.h1]}>
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
                <Text style={[styles.h1]}>
                  {`<`}
                </Text>
            </TouchableHighlight>
            <TouchableHighlight
            style={[styles.navButton]}
              onPress={this.nextCol}
            >
              <Text style={[styles.h1]}>
                {`>`}
              </Text>
          </TouchableHighlight>
        </View>

              <TouchableHighlight
                style={[styles.navButton]}
                onPress={this.nextRow}
              >
                <Text style={[styles.h1]}>
                  v
                </Text>
            </TouchableHighlight>
          <TouchableHighlight
            style={{backgroundColor: 'white', padding: 10, marginTop: 15, width: '100%'}}
            onPress={() => navigate('Submit', {model: this.state.spreadsheet, reset: this.reset})}
          >
              <Text style={{fontFamily: "Avenir-Medium", fontSize: 20, color: 'pink', textAlign: 'center'}}>
                Next
              </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}
