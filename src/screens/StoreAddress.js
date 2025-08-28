import React, { useState, useEffect, } from 'react';
import { View, Text, PermissionsAndroid, Platform, Alert, TouchableOpacity, StyleSheet, ScrollView, BackHandler, Image } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';



import imgPath from '../constants/imgPath';
import Buttons from '../Components/Buttons';
import { extractPincode } from '../styles/utils/location';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getStoreIds } from '../redux/actions/AuthAction';
import * as ActionTypes from '../redux/actionTypes';




const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];
const StoreAddress = ({ navigation, route }) => {
    const { number } = route?.params;
    const [currentLocation, setCurrentLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [pincode, setPincode] = useState('');
    const [storeId, setStoreId] = useState('');
    const [saasId, setSaasId] = useState('');
    const dispatch = useDispatch()
    const bothId = useSelector(state => state?.city?.bothId);


    const [address, setAddress] = useState('');
    const [hideButton, setHideButton] = useState(false);
    const themes = useTheme().colors
    const GOOGLE_API_KEY = 'AIzaSyC9AHMzRRjBrAhpqI1m2xErTCH_3h-kLlE';

    console.log("bothIdStore", bothId)

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);
                setCurrentLocation({ currentLatitude, currentLongitude });
                console.log("currentLongitude", currentLongitude, 'currentLatitude', currentLatitude);
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
                setPincode(pincode)
                setHideButton(true)

                console.log('Reverse Geocoded Address:', formattedAddress);
            } else {
                Alert.alert('Error', 'Unable to get address for the given location');
            }
        } catch (error) {
            console.error('Error during reverse geocoding:', error);
            Alert.alert('Error', 'Failed to reverse geocode location');
        }
    };

    const ConfirmPincode = (pincode) => {
        dispatch(getStoreIds(pincode))
        setHideButton(false)
    }
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };


    useEffect(() => {
        // Add the beforeRemove event listener
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            // Check the action type
            if (e.data.action.type === 'GO_BACK') {
                e.preventDefault();

                // Show a confirmation dialog
                Alert.alert(
                    'Are you sure?',
                    'Do you want to exit the app?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => { },
                        },
                        {
                            text: 'OK',
                            style: 'destructive',
                            // Exit the app
                            onPress: () => BackHandler.exitApp(),
                        },
                    ]
                );
            }
        });

        // Return the unsubscribe function to clean up
        return unsubscribe;
    }, [navigation]);



    return (
        <ScrollView contentContainerStyle={[styles.container, {}]}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
        >
            <Image
                style={[{ height: 150, width: 150, alignSelf: 'center', marginBottom: 20 }]}
                source={imgPath.applogo}
                resizeMode='center'
            />

            <GooglePlacesAutocomplete
                placeholder="Search for an address"
                minLength={2}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    if (details) {
                        const lat = details.geometry.location.lat;
                        const lng = details.geometry.location.lng;
                        setSelectedLocation({ latitude: lat, longitude: lng });
                        console.log('Selected Location:', lat, lng);
                        reverseGeocode(lat, lng);
                    }
                }}
                query={{
                    key: GOOGLE_API_KEY,
                    language: 'en',
                    components: 'country:in',
                }}
                styles={{
                    textInputContainer: [styles.textInputContainer, { backgroundColor: themes.YellowBGButton }],
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
                            <Icon name="location" size={30} color={themes.activeColor} />
                        </TouchableOpacity>
                    </View>
                )}

            />


            {address ? (
                <View style={styles.addressContainer}>
                    <Text style={[styles.addressTitle, { color: themes.black }]}>Address:</Text>
                    <Text style={[styles.addressText, { color: themes.primaryGreyHex }]}>{address}</Text>

                    {
                        pincode ?

                            hideButton &&
                            <Buttons
                                titel={`Confirm ${pincode} Pincode`}
                                onPress={() => {
                                    ConfirmPincode(pincode)
                                }}
                            />
                            :
                            (
                                <Text style={[styles.addressTitle, { color: themes.red, fontWeight: '400' }]}>PinCode not available choose another address</Text>
                            )

                    }

                </View>
            ) : (
                <Text style={{color:'grey',marginTop:10}}>No address available</Text>
            )}
            {/* {renderLabel()} */}
            {
                bothId?.length > 0 ?
                    <View style={{ gap: 16 }}>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={bothId || []}
                            search
                            maxHeight={300}
                            labelField="store_name"
                            valueField="store_name"
                            placeholder={!isFocus ? 'Select Store' : '...'}
                            searchPlaceholder="Search..."
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item);
                                setIsFocus(false);
                                dispatch({
                                    type: ActionTypes.BOTHID,
                                    payload: [item],
                                });

                            }}
                            renderLeftIcon={() => (
                                <MaterialCommunityIcons name={'store-marker'} size={20} color={isFocus ? 'grey' : 'grey'} style={styles.icon} />

                            )}
                        />
                        <Buttons
                            titel={`Next`}
                            onPress={() => {
                                // ConfirmPincode(pincode)
                                // navigation.navigate('Signup', { number: number, saasId: saasId, storeId: storeId })
                                navigation.navigate('Signup', { number: number })
                                console.log("Next",saasId,storeId)
                            }}
                        />
                    </View>
                    :
                    null
            }

            {/* <Buttons
                titel={`chekc`}
                onPress={() => {
                    // ConfirmPincode(pincode)
                    handleResetData()

                }}
            /> */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#FFF',
        marginTop: 120
    },
    textInputContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 4,
        elevation: 4

    },
    textInput: {
        height: 40,
        borderRadius: 5,
        paddingLeft: 10,
        margin: 10,
        backgroundColor: '#F0F0F0',
    },
    googlePlacesContainer: {
        backgroundColor: '#FFF',
        flex: 0,
        borderRadius: 8,
        marginTop: 10

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
        gap: 8
    },
    addressTitle: {
        fontWeight: 'bold',
    },
    addressText: {
        marginTop: 5,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop: 8
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

});


export default StoreAddress