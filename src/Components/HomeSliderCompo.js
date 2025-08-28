// import React, {useRef, useEffect, useState} from 'react';
// import {
//   Animated,
//   Dimensions,
//   Image,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   View,
// } from 'react-native';
// import {useSelector} from 'react-redux';
// import {useFocusEffect} from '@react-navigation/native';
// import {BASE_URL} from '../apiEndpoints/Base_Url';
// import imgPath from '../constants/imgPath';

// const {width} = Dimensions.get('window');
// const data = ['brown', 'orange', 'red', 'blue', 'green'];

// export default function Banner() {
//   const saasId1 = useSelector(
//     state => state?.auth?.data?.customer_data?.saasId,
//   );
//   const [bannerKey, setBannerKey] = useState(0);
//   const [images, setImages] = useState([
//     {id: 1, img: `${BASE_URL}saas-master/get-banner/${saasId1}`},
//     {id: 2, img: `${BASE_URL}saas-master/get-banne2/${saasId1}`},
//     {id: 3, img: `${BASE_URL}saas-master/get-bannerLogo3/${saasId1}`},
//   ]);
//   const [forceRenderKey, setForceRenderKey] = useState(0); // State to force re-render

//   const scrollValue = useRef(new Animated.Value(0)).current;
//   const scrollViewRef = useRef(null);
//   const translateX = scrollValue.interpolate({
//     inputRange: [0, width],
//     outputRange: [0, 20],
//   });
//   const inputRange = [0];
//   const scaleOutputRange = [1];
//   data.forEach(
//     (_, i) =>
//       i !== 0 && inputRange.push(...[(width * (2 * i - 1)) / 2, width * i]),
//   );
//   data.forEach((_, i) => i !== 0 && scaleOutputRange.push(...[0, 1]));
//   const scaleX = scrollValue.interpolate({
//     inputRange,
//     outputRange: scaleOutputRange,
//   });

//   // Update images when saasId1 changes
//   useEffect(() => {
//     setImages([
//       {
//         id: 1,
//         img: `${BASE_URL}saas-master/get-banner/${saasId1}?key=$${new Date()}`,
//       },
//       {
//         id: 2,
//         img: `${BASE_URL}saas-master/get-banne2/${saasId1}?key=$${new Date()}`,
//       },
//       {
//         id: 3,
//         img: `${BASE_URL}saas-master/get-bannerLogo3/${saasId1}?key=$${new Date()}`,
//       },
//     ]);
//     setForceRenderKey(prev => prev + 1); // Update key to force re-render
//   }, [saasId1, bannerKey]);

//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       index = (index + 1) % data.length;
//       scrollViewRef.current.scrollTo({x: index * width, animated: true});
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // Re-render Banner when screen is focused
//   useFocusEffect(
//     React.useCallback(() => {
//       // Trigger a re-render by changing the key of the Banner component
//       setBannerKey(prevKey => prevKey + 1);
//     }, []),
//   );

//   // console.log("images",images)s
//   return (
//     <View style={styles.container}>
//       <ScrollView
//         ref={scrollViewRef}
//         horizontal
//         pagingEnabled
//         decelerationRate="fast"
//         showsHorizontalScrollIndicator={false}
//         onScroll={Animated.event(
//           [{nativeEvent: {contentOffset: {x: scrollValue}}}],
//           {useNativeDriver: false},
//         )}
//         scrollEventThrottle={16}>
//         {images.map(x => (
//           <Pressable
//             style={[styles.card, {backgroundColor: x}]}
//             key={`${x.id}-${forceRenderKey}`} // Update key to force re-render
//             onPress={() => console.log('onPress', x)}>
//             <Image
//               key={bannerKey} // Update key to force re-render
//               style={[{width: '100%', height: '100%', borderRadius: 8}]}
//               source={{
//                 uri: x.img,
//               }}
//               // source={imgPath.banner}
//               // resizeMode="contain"
//             />
//           </Pressable>
//         ))}
//       </ScrollView>
//       <View style={styles.indicatorContainer} pointerEvents="none">
//         {images.map(x => (
//           <Indicator key={x.id} />
//         ))}
//         <Animated.View
//           style={[
//             styles.activeIndicator,
//             {
//               position: 'absolute',
//               transform: [{translateX}, {scaleX}],
//             },
//           ]}
//         />
//       </View>
//     </View>
//   );
// }

// function Indicator() {
//   return <View style={styles.indicator} />;
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 3,
//     borderRadius: 8,
//     // backgroundColor: 'red',
//   },
//   card: {
//     width: width - 10,
//     height: '100%',
//     marginHorizontal: 5,
//     borderRadius: 5,
//   },
//   indicatorContainer: {
//     alignSelf: 'center',
//     position: 'absolute',
//     bottom: 20,
//     flexDirection: 'row',
//   },
//   indicator: {
//     height: 10,
//     width: 10,
//     borderRadius: 5,
//     backgroundColor: '#00000044',
//     marginHorizontal: 5,
//   },
//   activeIndicator: {
//     height: 10,
//     width: 10,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//     marginHorizontal: 5,
//   },
// });

import React, {useRef, useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {BASE_URL} from '../apiEndpoints/Base_Url';
import imgPath from '../constants/imgPath';

const {width} = Dimensions.get('window');
const data = ['brown', 'orange', 'red', 'blue', 'green'];

export default function Banner() {
  const saasId1 = useSelector(
    state => state?.auth?.data?.customer_data?.saasId,
  );
  const [bannerKey, setBannerKey] = useState(0);
  const [images, setImages] = useState([
    {id: 1, img: `${BASE_URL}saas-master/get-banner/${saasId1}`},
    {id: 2, img: `${BASE_URL}saas-master/get-banne2/${saasId1}`},
    {id: 3, img: `${BASE_URL}saas-master/get-bannerLogo3/${saasId1}`},
  ]);
  const [forceRenderKey, setForceRenderKey] = useState(0); // State to force re-render

  const scrollValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const translateX = scrollValue.interpolate({
    inputRange: [0, width],
    outputRange: [0, 20],
  });
  const inputRange = [0];
  const scaleOutputRange = [1];
  data.forEach(
    (_, i) =>
      i !== 0 && inputRange.push(...[(width * (2 * i - 1)) / 2, width * i]),
  );
  data.forEach((_, i) => i !== 0 && scaleOutputRange.push(...[0, 1]));
  const scaleX = scrollValue.interpolate({
    inputRange,
    outputRange: scaleOutputRange,
  });

  // Update images when saasId1 changes
  useEffect(() => {
    setImages([
      {
        id: 1,
        img: `${BASE_URL}saas-master/get-banner/${saasId1}?key=$${new Date()}`,
      },
      {
        id: 2,
        img: `${BASE_URL}saas-master/get-banne2/${saasId1}?key=$${new Date()}`,
      },
      {
        id: 3,
        img: `${BASE_URL}saas-master/get-bannerLogo3/${saasId1}?key=$${new Date()}`,
      },
    ]);
    setForceRenderKey(prev => prev + 1); // Update key to force re-render
  }, [saasId1, bannerKey]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % data?.length;
      scrollViewRef.current.scrollTo({x: index * width, animated: true});
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Re-render Banner when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      // Trigger a re-render by changing the key of the Banner component
      setBannerKey(prevKey => prevKey + 1);
    }, []),
  );

  // console.log("images",images)s
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollValue}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        {images.map(x => (
          <Pressable
            style={[styles.card, {backgroundColor: x}]}
            key={`${x.id}-${forceRenderKey}`} // Update key to force re-render
            onPress={() => console.log('onPress', x)}>
            <Image
              key={bannerKey} // Update key to force re-render
              style={[
                {
                  width: '100%',
                  height: '100%',
                  borderRadius: 2,
                  alignSelf: 'center',
                  backgroundColor: '#f8f8f8',
                },
              ]}
              source={{
                uri: x.img,
              }}
            />
          </Pressable>
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer} pointerEvents="none">
        {images.map(x => (
          <Indicator key={x.id} />
        ))}
        <Animated.View
          style={[
            styles.activeIndicator,
            {
              position: 'absolute',
              transform: [{translateX}, {scaleX}],
            },
          ]}
        />
      </View>
    </View>
  );
}

function Indicator() {
  return <View style={styles.indicator} />;
}

const styles = StyleSheet.create({
  container: {},
  card: {
    width: width - 10,
    width: width,
    height: '100%',
  },
  indicatorContainer: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#00000044',
    marginHorizontal: 5,
  },
  activeIndicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
});
