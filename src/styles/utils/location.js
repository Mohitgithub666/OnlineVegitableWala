import { Alert, PermissionsAndroid } from "react-native";

// export const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//             {
//                 title: 'Location Permission',
//                 message: 'This app requires access to your location.',
//                 buttonNeutral: 'Ask Me Later',
//                 buttonNegative: 'Cancel',
//                 buttonPositive: 'OK',
//             }
//         );

//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log('Location permission granted');
//             // getCurrentLocation();
//         } else {
//             console.log('Location permission denied');
//             Alert.alert('Location permission denied');
//         }
//     } else {
//         // getCurrentLocation();
//     }
// };



export const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
        const alreadyGranted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (alreadyGranted) {
            return true; // Permission is already granted
        }

        // Request permission if not granted
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'This app requires access to your location.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true; // Permission granted
        } else {
            Alert.alert('Location permission denied');
            return false; // Permission denied
        }
    } else {
        // iOS implementation can be added here
        Alert.alert('Location permission check is not implemented for iOS yet.');
        return false;
    }
};


export const extractPincode = (address) => {
    // Regular expression to match a 6-digit pincode
    const pincodeMatch = address.match(/\b\d{6}\b/);
    return pincodeMatch ? pincodeMatch[0] : null; // If a pincode is found, return it; otherwise, return null
};