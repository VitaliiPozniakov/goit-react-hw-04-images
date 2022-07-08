import React from 'react';
import PropTypes from 'prop-types';

const ModalContent = ({ images, idOfChooseImage }) => {
  const chooseImage = images.find(image => image.id === idOfChooseImage);

  const { largeImageUrl, description } = chooseImage;
  return (
    <>
      <img src={largeImageUrl} alt={description} />
    </>
  );
};

export default ModalContent;

ModalContent.prototype = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      littleImageUrl: PropTypes.string.isRequired,
      largeImageUrl: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
  IdOfChooseImage: PropTypes.func,
};
