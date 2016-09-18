'use strict';

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import _ from 'lodash';
import getImage from './getImage';

export default class PetCell extends Component {

  render({ pet } = this.props) {
    const image = getImage(pet);
    return (
      <View>
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            {image
              ? <Image source={image} style={styles.petImage} />
              : <View style={styles.noImage}><Text style={styles.noImageText}>No image</Text></View>
            }
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.petName} numberOfLines={1}>
              {pet.name}
            </Text>
            <Text style={styles.petBreed} numberOfLines={1}>
              {pet.breeds && pet.breeds.breed
                ? (
                  _.isObject(pet.breeds.breed)
                    ? _.join(_.toArray(pet.breeds.breed), '/')
                    : pet.breeds.breed
                )
                : null
              }
            </Text>
            <Text style={styles.petDescription} numberOfLines={2}>
              {pet.description}
            </Text>
            <Text style={styles.petLocation}>
              {pet.contact.city}, {pet.contact.state}, {pet.contact.zip}
            </Text>
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    borderStyle: 'solid',
    borderBottomColor: '#dddddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 5,
  },
  imageContainer: {
    backgroundColor: '#dddddd',
    width: 90,
    height: 90,
    marginRight: 10
  },
  textContainer: {
    flex: 1,
  },
  noImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    color: '#aaaaaa',
  },
  petImage: {
    width: 90,
    height: 90,
  },
  petName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  petBreed: {
    fontSize: 13,
  },
  petDescription: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
  },
  petLocation: {
    fontSize: 12,
    color: 'gray',
  },
});
