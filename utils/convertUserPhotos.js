const convertUserPhotos = (userPhotos, username) => {
  const photoList = userPhotos.map((photo) => {
    return {
      id: photo.id,
      username,
      description: photo.description
        ? photo.description
        : "No description provided.",
      url: photo.urls.raw,
    };
  });
  return photoList;
};
export default convertUserPhotos;
