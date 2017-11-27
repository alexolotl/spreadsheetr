import React from 'react';
import { Image, View, Dimensions } from 'react-native';
import styles from '../styles'

export default class PreviewImage extends React.Component {
  static navigationOptions = {
    title: 'Image Preview',
  };
  render() {
    const {height, width} = Dimensions.get('window');
    const {navigate} = this.props.navigation;
    return (
      <View style={[styles.flexCol, styles.fullScreen]}>
        <Image style={{width: width, height: width}} source={{ uri: this.props.navigation.state.params.model }} />
      </View>
    );
  }
}
