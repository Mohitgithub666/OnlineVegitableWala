import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';


const MyImgCompo = ({ imageUri, ImgCompoStyle,resizeMode, otherComponents }) => {
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <View>
      <Image
        style={[ImgCompoStyle, { overflow:'hidden' }]}
        source={{
          uri: imageUri,
          // priority: priority.low,
          // priority: FastImage.priority.high,
        }}
        // resizeMode={FastImage.resizeMode.resizeMode}
        resizeMode='contain'
        onLoadStart={() => setImgLoading(true)} // Set loading to true when the image starts loading
        onLoad={() => setImgLoading(false)} // Set loading to false when the image is loaded

      />

      {imgLoading && (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {otherComponents && otherComponents}
    </View>
  );
};

export default MyImgCompo;
