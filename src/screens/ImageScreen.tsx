import React from "react";
import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { useNavigation, useRoute } from "@react-navigation/native";

const ImageScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // @ts-ignore
  const { uri } = route.params;
  const images = [
    {
      // Simplest usage.
      url: uri,

      // width: number
      // height: number
      // Optional, if you know the image size, you can set the optimization performance

      // You can pass props to <Image />.
      props: {
        // headers: ...
      },
    },
  ];

  const onCancel = () =>
    //   @ts-ignore
    navigation.navigate("MainScreen");

  return (
    <Modal visible={true} transparent={true}>
      <ImageViewer
        enableSwipeDown
        enableImageZoom
        imageUrls={images}
        onCancel={onCancel}
        onSwipeDown={onCancel}
      />
    </Modal>
  );
};

export default ImageScreen;
