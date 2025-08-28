// import React, { useState, useCallback, useMemo } from 'react';
// import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Pressable } from 'react-native';
// import { useFocusEffect, useNavigation, useTheme } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { showMessage } from 'react-native-flash-message';
// import Headers from '../Components/Headers';
// import Buttons from '../Components/Buttons';
// import NoDataFound from '../Components/NoDataFound';
// import { showToast } from '../styles/utils/toast';
// import { BASE_URL, GOOGLE_API_KEY } from '../apiEndpoints/Base_Url';
// import commonStyles from '../styles/commonStyles';
// import { scale, textScale } from '../styles/responsiveSize';
// import * as ActionTypes from '../redux/actionTypes';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import AddressList from '../Components/AddressList';
// import Geolocation from '@react-native-community/geolocation';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { extractPincode } from '../styles/utils/location';
// import AddressTextInput from '../Components/AddressTextInput';

// const Address = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const colors = useTheme().colors;
//   const userData = useSelector(state => state?.auth?.data?.customer_data);
//   const saasid = userData?.saasId;
//   const storeId = userData?.storeId;
//   const customerDataId = userData?.id;
//   const addressesRedux = useSelector(state => state?.product?.addresses) || [];
//   const selectedAddress = useSelector(state => state?.product?.selectedAddres) || [];
//   const [formData, setFormData] = useState({
//     address: '',
//     street: '',
//     address_type: '',
//     pincode: '',
//     city: '',
//     state: '',
//     store_id: storeId,
//     saas_id: saasid,
//     latitude: 'latitude',
//     longitude: 'longitude'
//   });

//   const [address, setAddress] = useState('');
//   const [selectedLocation, setSelectedLocation] = useState(null);



//   const getAddressesData = useCallback(async () => {
//     const endUrl = `${BASE_URL}customer/get-all-customer-address-app/${customerDataId}/${saasid}/${storeId}`;
//     try {
//       const response = await axios.get(endUrl);
//       const addressArray = response?.data?.data || [];

//       dispatch({
//         type: ActionTypes.ADDRRESS,
//         payload: addressArray,
//       });

//       if (addressArray.length == 0) {
//         dispatch({
//           type: ActionTypes.SELECTEDADDRRES,
//           payload: null,
//         });
//       } else if (addressArray.length == 1) {
//         dispatch({
//           type: ActionTypes.SELECTEDADDRRES,
//           payload: addressArray[0],
//         });
//       } else if (addressArray.length > 1) {
//         dispatch({
//           type: ActionTypes.SELECTEDADDRRES,
//           payload: addressArray[0],
//         });
//       }
//     } catch (error) {
//       showToast('Error fetching address');
//     }
//   }, [customerDataId, saasid, storeId]);

//   useFocusEffect(useCallback(() => {
//     getAddressesData();
//   }, [getAddressesData]));



//   const memoizedAddresses = useMemo(() => addressesRedux, [addressesRedux]);
//   const mainAddreesarray = memoizedAddresses.reverse()
//   // console.log('address', mainAddreesarray[0])

//   const handleSubmit = async () => {
//     // console.log("addAddress", formData)

//     try {
//       const endUrl = `${BASE_URL}customer/create-address/${customerDataId}`;
//       const response = await axios.post(endUrl, formData);
//       if (response.status) {
//         getAddressesData()
//         setAddress('')
//       } else {
//       }
//       showMessage({
//         message: "Address Saved succesfully",
//         type: "success",
//       });
//     } catch (error) {
//       showToast("Network Error")
//     }


//   };

 


//   // const GOOGLE_API_KEY = 'AIzaSyC9AHMzRRjBrAhpqI1m2xErTCH_3h-kLlE';

//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         const currentLongitude = JSON.stringify(position.coords.longitude);
//         const currentLatitude = JSON.stringify(position.coords.latitude);
//         // setCurrentLocation({ currentLatitude, currentLongitude });
//         // console.log("currentLongitude", currentLongitude, 'currentLatitude', currentLatitude);
//         setFormData(prevState => ({ ...prevState, ['latitude']: currentLatitude }));
//         setFormData(prevState => ({ ...prevState, ['longitude']: currentLongitude }));

//         reverseGeocode(currentLatitude, currentLongitude);
//       },
//       (error) => {
//         console.log('Error getting location:', error);
//         Alert.alert('Unable to fetch location', error.message);
//       },
//       {
//         enableHighAccuracy: false,
//         timeout: 30000,
//         maximumAge: 1000,
//       }
//     );
//   };


//   const reverseGeocode = async (latitude, longitude) => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
//           // `https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJBfc2I9M1K4gRZ-4AoyXIvAE&key=${GOOGLE_API_KEY}`
//       );
//       const data = await response.json();

//       if (data.status === 'OK') {
//         const formattedAddress = data.results[0].formatted_address;
//         setAddress(formattedAddress);
//         // console.log('Reverse Geocoded Address:', formattedAddress);
//         const pincode = extractPincode(formattedAddress);
//         setFormData(prevState => ({ ...prevState, ['address']: formattedAddress }));
//         setFormData(prevState => ({ ...prevState, ['pincode']: pincode }));


//       } else {
//         Alert.alert('Error', 'Unable to get address for the given location');
//       }
//     } catch (error) {
//       console.error('Error during reverse geocoding:', error);
//       Alert.alert('Error', 'Failed to reverse geocode location');
//     }
//   };

//   return (
//     <View style={[styles.container, { backgroundColor:'#f7f7f7' }]}>
//       <Headers title={'Your Address'} />

//       <GooglePlacesAutocomplete
//         placeholder="Search for an address"
//         minLength={2}
//         fetchDetails={true}
//         onPress={(data, details = null) => {
//           if (details) {
//             const lat = details.geometry.location.lat;
//             const lng = details.geometry.location.lng;
//             setSelectedLocation({ latitude: lat, longitude: lng });
//             console.log('Selected Location:', lat, lng, "details", details);
//             setFormData(prevState => ({ ...prevState, ['latitude']: lat }));
//             setFormData(prevState => ({ ...prevState, ['longitude']: lng }));
//             reverseGeocode(lat, lng);

//           }
//         }}
//         query={{
//           key: GOOGLE_API_KEY,
//           language: 'en',
//           components: 'country:in',
//         }}
//         styles={{
//           textInputContainer: styles.textInputContainer,
//           textInput: styles.textInput,
//           container: styles.googlePlacesContainer,
//         }}
//         renderLeftButton={() => (
//           <View style={styles.leftButton}>
//             <Icon name="search" size={20} color="#000" />
//           </View>
//         )}
//         renderRightButton={() => (
//           <View style={styles.rightButton}>
//             <TouchableOpacity onPress={getCurrentLocation}>
//               <Icon name="location" size={30} color={colors.activeColor} />
//             </TouchableOpacity>
//           </View>
//         )}
//       />

//       {address ? (
//         <View style={[styles.addressContainer, { paddingHorizontal: 20, backgroundColor: '#fff', gap: 6 }]}>
//           <Text style={[styles.addressTitle,]}>Address:</Text>
//           <Text style={styles.addressText}>{address}</Text>
//           <AddressTextInput
//             placeholder="Add Flat/House No /Street"
//             value={formData.street}
//             // autoFocus={true}
//             onChangeText={text => setFormData({ ...formData, 'street': text })}
//           />
//           <Buttons
//             titel={'Save'}
//             onPress={() => {
//               handleSubmit()
//             }}
//           />
//         </View>
//       ) : (
//         null

//       )}








//       {memoizedAddresses && memoizedAddresses?.length > 0 ? (
//         <View style={[styles.innerContainer, {}]}>
//           {/* <AddressList addresses={addresses} /> */}
//           <AddressList addresses={memoizedAddresses} />

//         </View>
//       ) : (
//         <NoDataFound text="No Address" iconName="map-marker-off" iconSize={50} />
//       )}
//       <Buttons
//         titel={'Continue'}
//         onPress={() => {
//           if (selectedAddress !== null) {
//             navigation.goBack();
//           } else {
//             showToast('Please Select Address');
//           }
//         }}
//       />
//     </View>
//   );
// };

// export default Address;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // marginTop: 8,
//     backgroundColor: '#fff'

//   },
//   innerContainer: {
//     flex: 1,
//     marginHorizontal: scale(8),
//     marginTop: 8,
//     // backgroundColor:'red'

//   },
//   addressContainer: {
//     backgroundColor: 'white',
//     marginHorizontal: 0,
//     flex: 0,
//     borderRadius: 5,
//     justifyContent: 'center',
//     elevation: 5,
//     marginHorizontal: 8,
//     // borderTopWidth:1,
//     // backgroundColor:'green'
    
//   },
//   addressItem: {
//     marginLeft: scale(16),
//     paddingBottom: scale(8),
//     paddingTop: scale(8),
//   },
//   addressType: {
//     ...commonStyles.fontBold18,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   addressDetails: {
//     fontWeight: '400',
//     fontSize: textScale(14),
//     color: '#000',
//     alignSelf: 'center',
//     flex: 1,
//     borderTopWidth: 0.5,
//     borderColor: 'grey',
//     textAlign: 'center',
//     width: '90%'
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   buttonContainer: {
//     marginVertical: scale(8),
//   },
//   cardInsiseStyle: {
//     flexDirection: 'row',
//     gap: 25

//   },
//   iconStyle: {
//     paddingRight: 10

//   }, textInputContainer: {
//     width: '100%',
//     borderColor: 'grey',
//   },
//   textInput: {
//     height: 40,
//     borderRadius: 5,
//     paddingLeft: 10,
//     margin: 10,
//     backgroundColor: '#F0F0F0',
//     backgroundColor: '#fff'

//   },
//   googlePlacesContainer: {
//     flex: 0,
//     borderRadius: 8,
//     marginHorizontal: 8,
//     backgroundColor:'#ECE447',
//     borderRadius:20

//   },
//   leftButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//   },
//   rightButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//   },
//   addressContainer: {
//     marginTop: 10,
//   },
//   addressTitle: {
//     fontWeight: 'bold',
//     color: '#000'
//   },
//   addressText: {
//     marginTop: 5,
//     color: '#000'
//   },
// });



















import React, { useState, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Pressable } from 'react-native';
import { useFocusEffect, useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import Headers from '../Components/Headers';
import Buttons from '../Components/Buttons';
import NoDataFound from '../Components/NoDataFound';
import { showToast } from '../styles/utils/toast';
import { BASE_URL, GOOGLE_API_KEY } from '../apiEndpoints/Base_Url';
import commonStyles from '../styles/commonStyles';
import { scale, textScale } from '../styles/responsiveSize';
import * as ActionTypes from '../redux/actionTypes';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AddressList from '../Components/AddressList';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAddresData } from '../redux/actions/UserAction';
import { extractPincode } from '../styles/utils/location';
import AddressTextInput from '../Components/AddressTextInput';

const Address = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const colors = useTheme().colors;
  const userData = useSelector(state => state?.auth?.data?.customer_data);
  const saasid = userData?.saasId;
  const storeId = userData?.storeId;
  const customerDataId = userData?.id;
  const addressesRedux = useSelector(state => state?.product?.addresses) || [];
  const selectedAddress = useSelector(state => state?.product?.selectedAddres) || [];
  const [formData, setFormData] = useState({
    address: '',
    street: '',
    address_type: '',
    pincode: '',
    city: '',
    state: '',
    store_id: storeId,
    saas_id: saasid,
    latitude: 'latitude',
    longitude: 'longitude'
  });
  

  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);


  const getAddressesData = useCallback(async () => {
    const endUrl = `${BASE_URL}customer/get-all-customer-address-app/${customerDataId}/${saasid}/${storeId}`;
    try {
      const response = await axios.get(endUrl);
      const addressArray = response?.data?.data || [];

      dispatch({
        type: ActionTypes.ADDRRESS,
        payload: addressArray,
      });

      if (addressArray.length == 0) {
        dispatch({
          type: ActionTypes.SELECTEDADDRRES,
          payload: null,
        });
      } else if (addressArray.length == 1) {
        dispatch({
          type: ActionTypes.SELECTEDADDRRES,
          payload: addressArray[0],
        });
      } else if (addressArray.length > 1) {
        dispatch({
          type: ActionTypes.SELECTEDADDRRES,
          payload: addressArray[0],
        });
      }
    } catch (error) {
      showToast('Error fetching address');
    }
  }, [customerDataId, saasid, storeId]);

  useFocusEffect(useCallback(() => {
    getAddressesData();
  }, [getAddressesData]));



  const memoizedAddresses = useMemo(() => addressesRedux, [addressesRedux]);
  const mainAddreesarray = memoizedAddresses.reverse()
  

  const handleSubmit = async () => {

    try {
      const endUrl = `${BASE_URL}customer/create-address/${customerDataId}`;
      const response = await axios.post(endUrl, formData);
      if (response.status) {
        getAddressesData()
        setAddress('')
      } else {
      }
      showMessage({
        message: "Address Saved succesfully",
        type: "success",
      });
    } catch (error) {
      showToast("Network Error")
    }


  };

 


  // const GOOGLE_API_KEY = 'AIzaSyC9AHMzRRjBrAhpqI1m2xErTCH_3h-kLlE';

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setFormData(prevState => ({ ...prevState, ['latitude']: currentLatitude }));
        setFormData(prevState => ({ ...prevState, ['longitude']: currentLongitude }));

        reverseGeocode(currentLatitude, currentLongitude);
      },
      (error) => {
        console.log('Error getting location:', error);
        Alert.alert('Unable to fetch location', error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      }
    );
  };


  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();

      if (data.status === 'OK') {
        const formattedAddress = data.results[0].formatted_address;
        setAddress(formattedAddress);
        const pincode = extractPincode(formattedAddress);
        setFormData(prevState => ({ ...prevState, ['address']: formattedAddress }));
        setFormData(prevState => ({ ...prevState, ['pincode']: pincode }));


      } else {
        Alert.alert('Error', 'Unable to get address for the given location');
      }
    } catch (error) {
      console.error('Error during reverse geocoding:', error);
      Alert.alert('Error', 'Failed to reverse geocode location');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor:'#f7f7f7' }]}>
    <Headers title={'Your Address'} /> 
    
    <GooglePlacesAutocomplete
        placeholder="Search for an address"
        minLength={2}
        fetchDetails={true}
        onPress={(data, details = null) => {
          if (details) {

            const lat = details.geometry.location.lat;
            const lng = details.geometry.location.lng;
            setSelectedLocation({ latitude: lat, longitude: lng });
            console.log('Selected Location:', lat, lng, "details", details);
            setFormData(prevState => ({ ...prevState, ['latitude']: lat }));
            setFormData(prevState => ({ ...prevState, ['longitude']: lng }));
            reverseGeocode(lat, lng);

          }
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
          components: 'country:in',
        }}
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          container: styles.googlePlacesContainer,
        }}
        renderLeftButton={() => (
          <View style={styles.leftButton}>
            <Icon name="search" size={20} color="#000" />
          </View>
        )}
        renderRightButton={() => (
          <View style={styles.rightButton}>
            <TouchableOpacity onPress={getCurrentLocation}>
              <Icon name="location" size={30} color={colors.activeColor} />
            </TouchableOpacity>
          </View>
        )}
      />



     
      {address ? (
        <View style={[styles.addressContainer, { paddingHorizontal: 20, backgroundColor: '#fff', gap: 6 }]}>
          <Text style={[styles.addressTitle,]}>Address:</Text>
          <Text style={styles.addressText}>{address}</Text>
          <AddressTextInput
            placeholder="Add Flat/House No /Street"
            value={formData.street}
            onChangeText={text => setFormData({ ...formData, 'street': text })}
          />
          <Buttons
            titel={'Save'}
            onPress={() => {
              handleSubmit()
            }}
          />
        </View>
      ) : (
        null

      )}


      {memoizedAddresses && memoizedAddresses?.length > 0 ? (
        <View style={[styles.innerContainer, {}]}>
          {/* <AddressList addresses={addresses} /> */}
          <AddressList addresses={memoizedAddresses} />

        </View>
      ) : (
        <NoDataFound text="No Address" iconName="map-marker-off" iconSize={50} />
      )}
      <Buttons
        titel={'Continue'}
        onPress={() => {
          if (selectedAddress !== null) {
            navigation.goBack();
          } else {
            showToast('Please Select Address');
          }
        }}
      />
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'

  },
  innerContainer: {
    flex: 1,
    marginHorizontal: scale(8),
    marginTop: 8,

  },
  addressContainer: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    flex: 0,
    borderRadius: 5,
    justifyContent: 'center',
    elevation: 5,
    marginHorizontal: 8,
  },
  addressItem: {
    marginLeft: scale(16),
    paddingBottom: scale(8),
    paddingTop: scale(8),
  },
  addressType: {
    ...commonStyles.fontBold18,
    fontWeight: 'bold',
    color: '#000',
  },
  addressDetails: {
    fontWeight: '400',
    fontSize: textScale(14),
    color: '#000',
    alignSelf: 'center',
    flex: 1,
    borderTopWidth: 0.5,
    borderColor: 'grey',
    textAlign: 'center',
    width: '90%'
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    marginVertical: scale(8),
  },
  cardInsiseStyle: {
    flexDirection: 'row',
    gap: 25

  },
  iconStyle: {
    paddingRight: 10

  }, textInputContainer: {
    width: '100%',
    borderColor: 'grey',
  },
  textInput: {
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
    margin: 10,
    backgroundColor: '#F0F0F0',
    backgroundColor: '#fff'

  },
  googlePlacesContainer: {
    flex: 0,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor:'#ECE447',
    borderRadius:20

  },
  leftButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  rightButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  addressContainer: {
    marginTop: 10,
  },
  addressTitle: {
    fontWeight: 'bold',
    color: '#000'
  },
  addressText: {
    marginTop: 5,
    color: '#000'
  },
});






























