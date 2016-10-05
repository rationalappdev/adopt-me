'use strict';

import React, { Component } from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import getImage from './getImage';
import getBreeds from './getBreeds';

export default class PetScreen extends Component {

  render({ pet } = this.props) {
    const image = getImage(pet);
    const url = `https://www.petfinder.com/petdetail/${pet.id}`;
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.imageContainer}>
          {image
            ? <Image source={image} style={styles.petImage} />
            : <View style={styles.noImage}><Text style={styles.noImageText}>No image</Text></View>
          }
        </View>
        <View style={styles.mainSection}>
          <Text style={styles.petDecsription}>{pet.description}</Text>
          <Text>{' '}</Text>
          <Text>Age: {pet.age}</Text>
          <Text>Breeds: {getBreeds(pet)}</Text>
          <Text>Location: {pet.contact.city}, {pet.contact.state}, {pet.contact.zip}</Text>
          <Text>Email: {pet.contact.email}</Text>
          <Text>{' '}</Text>
          <Text style={{color: 'blue'}} onPress={() => Linking.openURL(url)}>
            {url}
          </Text>
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: '#dddddd',
    flex: 1,
  },
  petImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  noImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    color: '#aaaaaa',
  },
  mainSection: {
    flex: 1,
    padding: 10,
  },
});
