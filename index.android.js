/**
 * Adoption Pets App
 * https://github.com/rationalappdev/adopt-me
 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  BackAndroid,
  Navigator,
  StyleSheet,
  ToolbarAndroid,
  View,
} from 'react-native';
import App from './App';
import PetScreen from './PetScreen';

let _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

const RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
  if (route.name === 'app') {
    return (
      <App navigator={navigationOperations} />
    );
  } else if (route.name === 'pet') {
    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid
          actions={[]}
          onIconClicked={navigationOperations.pop}
          style={styles.toolbar}
          titleColor="white"
          title={route.pet.name} />
        <PetScreen
          style={{flex: 1}}
          navigator={navigationOperations}
          pet={route.pet}
        />
      </View>
    );
  }
};

class AdoptMe extends Component {

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'app'}}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={RouteMapper}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: '#a9a9a9',
    height: 56,
  },
});

AppRegistry.registerComponent('AdoptMe', () => AdoptMe);
