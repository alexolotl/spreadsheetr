// GLOBAL STYLESHEET

import React from 'react'
import { StyleSheet, Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({

  fullScreen: {
    width: width,
    height: '100%'
  },

  padding: {
    padding: 20,
  },

  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    width: '100%'
  },

  flexCol: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    width: '100%'
  },

  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },

  underline: {
    textDecorationLine: 'underline'
  },

  bigButton: {
      backgroundColor: '#dddddd',
      height: 50,
      width: '80%',
      margin: 20,
  },

  smallButton: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginTop: 15,
    marginBottom: 15
  },

  bigButtonText: {
    fontSize: 20,
    textAlign: 'center'
  },

  h1: {
    fontSize: 36,
    fontFamily: 'Helvetica'
  },

  textCenter: {
    textAlign: 'center'
  },

  navButton: {
    margin: 5,
    padding:5,
    borderColor: 'black',
    borderWidth: 1
  },

  preview: {
   flex: 1,
   justifyContent: 'flex-end',
   alignItems: 'center',
   height: 20,
   width: 20
 },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 5,
    margin: 5
  }

});
