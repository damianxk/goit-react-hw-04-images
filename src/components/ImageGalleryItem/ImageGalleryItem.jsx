import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  src = '',
  alt = '',
  largeImage = '',
  isShowModal,
}) => {
  const makeModal = () => {
    isShowModal(largeImage, alt);
  };

  return (
    <li className={css.imageGalleryItem}>
      <img src={src} alt={alt} onClick={makeModal} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  isShowModal: PropTypes.func.isRequired,
};
