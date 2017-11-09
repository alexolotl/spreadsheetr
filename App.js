import React from 'react';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.11
import HomeScreen from './src/screens/HomeScreen';
import CreateModelScreen from './src/screens/CreateModel';
import CreateRecordScreen from './src/screens/CreateRecord';

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  CreateModel: { screen: CreateModelScreen },
  CreateRecord: { screen: CreateRecordScreen },
});

export default SimpleApp;
