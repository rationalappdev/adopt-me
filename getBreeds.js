import isObject from 'lodash/isObject';
import toArray from 'lodash/toArray';
import join from 'lodash/join';

export default function getBreeds(pet: Object): string {
  return pet.breeds && pet.breeds.breed
    ? (
      isObject(pet.breeds.breed)
        ? join(toArray(pet.breeds.breed), '/')
        : pet.breeds.breed
    )
    : null;
}
