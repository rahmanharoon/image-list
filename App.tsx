import React, { useState, useEffect } from "react";
import { SafeAreaView, Button } from "react-native";
import GridScreen, { IImage } from "./src/screens/GridScreen";

const App = () => {
  const [page, setPage] = useState(1);
  const [columns, setColumns] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3e7cc266ae2b0e0d78e279ce8e361736&format=json&nojsoncallback=1&safe_search=1&tags=kitten&per_page=10&page=${page}`
      );
      const data = await response.json();

      if (data && data.photos && data.photos.photo) {
        const fetchedImages = data.photos.photo.map((photo: any) => ({
          id: photo.id,
          url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`,
        }));
        setImages((prevImages: IImage[]) => {
          const uniqueImages = fetchedImages.filter(
            (image: IImage) =>
              !prevImages.some((prevImage) => prevImage.id === image.id)
          );
          return [...prevImages, ...uniqueImages];
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setIsLoading(false);
    }
  };

  const fetchMoreImages = () => {
    if (!isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const changeColumns = (numColumns: number) => setColumns(numColumns);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button title="1x1" onPress={() => changeColumns(1)} />
      <Button title="2x2 Grid" onPress={() => changeColumns(2)} />
      <Button title="3x3 Grid" onPress={() => changeColumns(3)} />
      <GridScreen
        images={images}
        columns={columns}
        fetchMore={fetchMoreImages}
      />
    </SafeAreaView>
  );
};

export default App;
