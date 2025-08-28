import React from 'react';
import {
  Button,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const requestSmsPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const Permissions = () => (
  <View style={styles.container}>
    <Text style={styles.item}>Try permissions</Text>
    <Button title="request permissions" onPress={requestCameraPermission} />
    <Button title="request permissions" onPress={requestSmsPermission} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Permissions;






///

// import { PermissionsAndroid, Platform, Alert } from 'react-native';
// // import Geolocation from 'react-native-geolocation-service';

// // export const androidCameraPermission = () =>
// //     new Promise(async (resolve, reject) => {
// //         try {
// //             if (Platform.OS === 'android' && Platform.Version > 22) {
// //                 const granted = await PermissionsAndroid.requestMultiple([
// //                     PermissionsAndroid.PERMISSIONS.CAMERA,
// //                     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
// //                     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
// //                 ]);
// //                 console.log(granted, 'the granted value');

// //                 if (
// //                     granted['android.permission.CAMERA'] !== 'granted' ||
// //                     granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== 'granted' ||
// //                     granted['android.permission.READ_EXTERNAL_STORAGE'] !== 'granted'
// //                 ) {
// //                     Alert.alert(
// //                         'Alert',
// //                         "Don't have permission to open camera",
// //                         [{ text: 'Okay' }],
// //                         { cancelable: true }​​​​​​​​
// //                     )
// //                     return resolve(false);
// //                     // alert(strings.DO_NOT_HAVE_PERMISSIONS_TO_SELECT_IMAGE);
// //                 }
// //                 return resolve(true);
// //             }

// //             return resolve(true);
// //         } catch (error) {
// //             return resolve(false);
// //         }
// //     });

// // export const locationPermission = () => {​​​​​​​​
// // if (Platform.OS === 'android' && Platform.Version > 22) {​​​​​​​​
// // return PermissionsAndroid.request(
// // PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
// // );
// // }​​​​​​​​

// // return Promise.resolve('granted');
// // }​​​​​​​​;

// export const locationPermission = () => newPromise(async (resolve, reject) => {
//     if (Platform.OS === 'ios') {
//         try {
//             const permissionStatus = await Geolocation.requestAuthorization('whenInUse');
//             if (permissionStatus === 'granted') {
//                 return resolve('granted');
//             }
//             reject('Permission not granted');
//         } catch (error) {
//             return reject(error);
//         }
//     }
//     return PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     ).then((granted) => {
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             //console.log('You can use the location');
//             return resolve('granted');
//         }
//         //console.log('Location permission denied');
//         return reject('Location Permission denied');
//     }).catch((error) => {
//         console.log('Ask Location permission error: ', error);
//         return reject(error);
//     });
// });

