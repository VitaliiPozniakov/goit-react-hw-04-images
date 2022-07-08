import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import { fetchImages } from 'services/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import ModalContent from './ModalContent';
import { BtnLoadMore } from './App.styled';
import Loader from './Loader';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [idOfChooseImage, setIdOfChooseImage] = useState(null);
  const [totalImages, setTotalImages] = useState(null);

  useEffect(() => {
    const fetchAndSetDataFromBackend = async () => {
      if (query === '') {
        return;
      }

      const dataFromBackend = await fetchImages(query, page);
      const { hits } = dataFromBackend;
      const imagesArray = hits.map(hit => ({
        id: hit.id,
        littleImageUrl: hit.webformatURL,
        largeImageUrl: hit.largeImageURL,
        description: hit.tags,
      }));

      if (page === 1) {
        setImages(imagesArray);
        setTotalImages(dataFromBackend.totalHits);
        return;
      }

      if (page !== 1) {
        setImages(prevImages => [...prevImages, ...imagesArray]);
        return;
      }
    };

    try {
      setIsLoading(prevIsLoading => !prevIsLoading);
      fetchAndSetDataFromBackend();
      setIsLoading(prevIsLoading => !prevIsLoading);
    } catch (err) {
      console.log(error);
      setError(err.message);
    }
  }, [query, page, setImages, setTotalImages, setIsLoading, setError, error]);

  const getSearchRequest = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const getIdOfChooseImage = idOfChooseImage => {
    setIdOfChooseImage(idOfChooseImage);
  };

  const toggleModal = () => {
    setShowModal(prevShowmodal => !prevShowmodal);
  };

  const handleBtnLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <Searchbar onSubmitProp={getSearchRequest} />
      {images && (
        <ImageGallery
          images={images}
          onImageClickChooseId={getIdOfChooseImage}
          onImageClickOpenModal={toggleModal}
        />
      )}
      {isLoading && <Loader />}
      {images && images.length < totalImages && !isLoading && (
        <BtnLoadMore type="button" onClick={handleBtnLoadMore}>
          Load more
        </BtnLoadMore>
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <ModalContent images={images} idOfChooseImage={idOfChooseImage} />
        </Modal>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
