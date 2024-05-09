import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";

const Carousel = () => {
  const flatlistRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= carouselData.length) {
        nextIndex = 0; // Loop back to the first image
      }
      flatlistRef.current.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const getItemLayout = (data, index) => ({
    length: Dimensions.get("window").width - 40, // Adjusted width with margin
    offset: (Dimensions.get("window").width - 40) * index,
    index: index,
  });

  const carouselData = [
    {
      id: "01",
      image: require("../assets/images/slider_1.png"),
    },
    {
      id: "02",
      image: require("../assets/images/slider_2.png"),
    },
    {
      id: "03",
      image: require("../assets/images/slider_3.jpeg"),
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
    );
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (Dimensions.get("window").width - 50));
    setActiveIndex(index);
  };

  const renderDotIndicators = () => {
    return carouselData.map((dot, index) => (
      <View
        key={index}
        style={[
          styles.dotIndicator,
          { backgroundColor: activeIndex === index ? "grey" : "lightgrey" },
        ]}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={carouselData}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.dotContainer}>{renderDotIndicators()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
	marginTop:30,
    borderRadius: 10,
    overflow: "hidden", // Clip the rounded corners
  },
  contentContainer: {
    paddingHorizontal: 25, // Adjusted padding for images
  },
  imageContainer: {
    marginHorizontal: 20, // Adjusted margin to center images
  },
  image: {
    width: Dimensions.get("window").width - 80, // Adjusted width with margin
    height: 200,
    borderRadius: 10, // Rounded corners for images
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dotIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default Carousel;
