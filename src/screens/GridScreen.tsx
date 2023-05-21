import React, { useCallback } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";

export interface IImage {
  id: string;
  url: string;
}

interface IScreenProps {
  columns: number;
  images: IImage[];
  fetchMore: () => void;
}

const GridScreen = ({
  images,
  columns,
  fetchMore,
}: IScreenProps) => {
  const numColumns = columns || 2;
  const itemWidth = Dimensions.get("window").width / numColumns;

  const renderItem = useCallback(
    ({ item }: { item: IImage }) => (
      <View style={[styles.imageContainer, { width: itemWidth }]}>
        <Image source={{ uri: item.url }} style={styles.image} />
      </View>
    ),
    [itemWidth]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        key={columns}
        numColumns={numColumns}
        renderItem={renderItem}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={<ActivityIndicator color={"#000"} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    margin: 5,
    aspectRatio: 1, // Maintain aspect ratio for square images
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default GridScreen;
