import React from 'react';
import { Text, View, Button } from 'react-native';
import styles from '../styles';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={[styles.flexCol, styles.fullScreen]}>
        <Button
            onPress={() => navigate('CreateModel')}
            title="Model Your Data"
        />
      </View>);
  }
}
