export default function getImage(pet: Object): {uri: ?string} {
  let uri = pet && pet.media.photos && pet.media.photos.photo ? pet.media.photos.photo[3] : null;
  return uri ? { uri } : null;
}
