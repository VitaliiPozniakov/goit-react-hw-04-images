import React from 'react';
import { GalleryItem, Image } from './ImageGalleryItem.styled';
import { useContext } from 'react';
import ctx from '../Context/authContext';

const ImageGalleryItem = () => {
  const { getIdOfChooseImage, toggleModal, images } = useContext(ctx);

  const handleImageClick = idOfChooseImg => {
    getIdOfChooseImage(idOfChooseImg);
    toggleModal();
  };

  return (
    <>
      {images.map(({ id, littleImageUrl, description }) => (
        <GalleryItem key={id}>
          <Image
            src={littleImageUrl}
            alt={description}
            onClick={() => handleImageClick(id)}
          />
        </GalleryItem>
      ))}
    </>
  );
};

export default ImageGalleryItem;
