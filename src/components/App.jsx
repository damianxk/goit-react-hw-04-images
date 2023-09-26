import React, { useState, useEffect } from 'react';
import { fetchImages } from '../API/API';
import { Searchbar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import './App.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      if (!query) return;
      makeImages(query, page);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, page]
  );

  const makeImages = async () => {
    setIsLoading(true);

    try {
      const responseApi = await fetchImages(query, page);

      const selectedProperties = responseApi.hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => {
          return { id, webformatURL, largeImageURL, tags };
        }
      );

      setPictures(prevPictures => [...prevPictures, ...selectedProperties]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      alert(`Error!`);
    }
  }, [error]);

  const handleFormSubmit = searchQuery => {
    if (query !== searchQuery) {
      setQuery(searchQuery);
      setPictures([]);
      setPage(1);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const isShowGallery = pictures.length > 0 && query;
  const isShowButton = isShowGallery && !isLoading && !(pictures.length % 12);

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <div className="container">
        {isShowGallery && <ImageGallery pictures={pictures} page={page} />}
        {isShowButton && <Button onClick={handleLoadMore} />}
        {isLoading && <Loader />}
      </div>
    </>
  );
};
