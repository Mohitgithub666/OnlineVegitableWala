import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ImageSlider } from '@pembajak/react-native-image-slider-banner';

const Banner = ({ data, autoPlay, closeIconColor, caroselImageStyle, indicatorContainerStyle }) => {
  return (
    <View style={styles.container}>
      <ImageSlider
        data={data}
        autoPlay={autoPlay}
        closeIconColor={closeIconColor}
        caroselImageStyle={caroselImageStyle}
        indicatorContainerStyle={indicatorContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Add any common styles for the banner container
    borderRadius:8,
    // backgroundColor:'red',
    
  },
});

export default Banner;
