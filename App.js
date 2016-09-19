'use strict';

import React, { Component } from 'react';
import {
  ActivityIndicator,
  ListView,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import _ from 'lodash';
import PetCell from './PetCell';
import PetScreen from './PetScreen';

import dismissKeyboard from 'dismissKeyboard';

const API_KEY = 'cb55e117215c6eb73506d7164b0a3b6d';

const convert = (obj) => {
  let result = {};
  _.map(obj, (item, key) => {
    let value;
    if (typeof (item) === 'object') {
      if (item.$t) { value = item.$t; }
      else { value = convert(item); }
    }
    else { value = item; }
    result[key] = value;
  });
  return result;
};

let resultsCache = [];

export default class App extends Component {

  state = {
    isLoading: false,
    isLoadingTail: false,
    lastOffset: 0,
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
  };

  componentDidMount() {
    this.fetchPets();
  }

  fetchPets = () => {

    const offset = this.state.lastOffset,
      URL = `https://api.petfinder.com/pet.find?location=US&format=json&offset=${offset}&key=${API_KEY}`;

    if (_.isEmpty(resultsCache)) {
      this.setState({isLoading: true});
    }

    fetch(URL)
      .then((response) => response.json())
      .catch((error) => {
        this.setState({
          dataSource: this.getDataSource([]),
          isLoading: false,
        });
      })
      .then((data) => {
        resultsCache = _.concat(resultsCache, _.toArray(convert(data.petfinder.pets.pet)));
        this.setState({
          isLoading: false,
          isLoadingTail: false,
          lastOffset: data.petfinder.lastOffset.$t,
          dataSource: this.getDataSource(resultsCache),
        });
      })
      .done();
  }

  getDataSource = (pets: Array<any>): ListView.DataSource => {
    return this.state.dataSource.cloneWithRows(pets);
  }

  selectPet = (pet: Object) => {
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: pet.name,
        component: PetScreen,
        passProps: {pet},
      });
    } else {
      dismissKeyboard();
      this.props.navigator.push({
        title: pet.name,
        name: 'pet',
        pet: pet,
      });
    }
  }

  onEndReached = () => {
    // We're already fetching
    if (this.state.isLoadingTail) {
      return;
    }
    this.setState({
      isLoadingTail: true,
    });
    this.fetchPets();
  }

  renderRow = (
    pet: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void
  ) => {
    return (
      <PetCell
        key={pet.id}
        onSelect={() => this.selectPet(pet)}
        onHighlight={() => highlightRowFunc(sectionID, rowID)}
        onUnhighlight={() => highlightRowFunc(null, null)}
        pet={pet}
      />
    );
  }

  renderFooter = () => {
    if (!this.state.isLoadingTail) {
      return <View style={styles.scrollSpinner} />;
    }

    return <ActivityIndicator style={styles.scrollSpinner} />;
  }

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading
          ? <View style={styles.loading}><Text>Loading...</Text></View>
          : <ListView
            dataSource={this.state.dataSource}
            renderFooter={this.renderFooter}
            renderRow={this.renderRow}
            onEndReached={this.onEndReached}
            automaticallyAdjustContentInsets={false}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps={true}
            showsVerticalScrollIndicator={false}
          />
        }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 64 : 0,
    flex: 1,
    backgroundColor: 'white',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollSpinner: {
    marginVertical: 20,
  },
});
