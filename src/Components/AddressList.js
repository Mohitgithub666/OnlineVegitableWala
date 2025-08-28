import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Alert, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as ActionTypes from '../redux/actionTypes';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scale } from '../styles/responsiveSize';
import { BASE_URL } from '../apiEndpoints/Base_Url';
import { showToast } from '../styles/utils/toast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { getAddresData } from '../redux/actions/UserAction';



// Address card component
const AddressCard = ({ address, handleAddressSelection, selectedAddress, userData, deleteAddress, handleDialPress }) => {
    return (
        <Pressable style={styles.card} onPress={() => handleAddressSelection(address)}>
            {selectedAddress && selectedAddress.id === address.id ? (
                <View
                    numberOfLines={1}
                    style={[
                        { justifyContent: 'space-between', marginRight: scale(8), flexDirection: 'row', },
                    ]}>
                    <Text style={[styles.address, { backgroundColor: 'green', color: '#fff', paddingHorizontal: 2, borderRadius: 2 }]}>Default</Text>
                    <Icon
                        name="check"
                        size={scale(24)}
                        color={'#4CAF50'}
                        style={styles.iconStyle}

                    />
                </View>
            ) : null}
            <Text style={styles.address}>{address.address}</Text>
            {
                address.street &&
                <Text style={styles.address}>Street:- {address.street}</Text>
            }
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.phone}>Pincode:- {address.pincode},</Text>
                <Pressable onPress={() => handleDialPress(userData.mobileNumber)}>
                    <Text style={[styles.phone, {}]}>Mobile:- <Text style={{ color: 'blue' }}>
                        {userData.mobileNumber}
                    </Text></Text>
                </Pressable>
                <Pressable onPress={() => deleteAddress(address.id)}>
                    <MaterialCommunityIcons
                        name="delete"
                        size={scale(24)}
                        color={'grey'}
                        style={styles.iconStyle}
                    />
                </Pressable>
            </View >
            {/* <Text style={styles.phone}>{address.pincode}</Text> */}
        </Pressable >
    );
};

// Reusable AddressList component
const AddressList = ({ addresses }) => {
    const dispatch = useDispatch()
    const selectedAddress = useSelector(state => state?.product?.selectedAddres) || [];
    const userData = useSelector(state => state?.auth?.data?.customer_data);
    const { saasId, storeId } = userData || {}
    const customerDataId = userData?.id;


    const handleAddressSelection = useCallback(address => {
        dispatch({
            type: ActionTypes.SELECTEDADDRRES,
            payload: address,
        });
    }, [dispatch]);

    const deleteAddress = async (id) => {
        const Url = `${BASE_URL}customer/delete-customer-address-app/${id}/${saasId}/${storeId}`;
        try {

            const response = await axios.delete(Url);
            if (response?.status === 200) {
                showMessage({
                    message: 'Address deleted successfully',
                    type: 'success',
                });
                dispatch(getAddresData(saasId, storeId)); // Assuming this is a Redux action to refresh the addresses
            } else {
                Alert.alert('Something went wrong');
            }
        } catch (error) {
            console.error('Error deleting address:', error);
            Alert.alert('Error', 'Failed to delete the address');
        }
    };

    const handleDialPress = (phoneNumber) => {
        const url = `tel:${phoneNumber}`;
        Linking.openURL(url).catch((err) => console.error('Error opening dialer:', err));
    };



    return (
        <View style={styles.container}>
            <FlatList
                data={addresses || []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <AddressCard
                    address={item}
                    handleAddressSelection={handleAddressSelection}
                    selectedAddress={selectedAddress}
                    userData={userData}
                    deleteAddress={deleteAddress}
                    handleDialPress={handleDialPress}
                />}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<AddresHeader />}
            />
        </View>
    );
};
const AddresHeader = () => {
    return (
        <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}>Saved Address</Text>
        </View>
    )
}

// Styles
const styles = StyleSheet.create({
    container: {
        padding: 8,
        // backgroundColor: '#fff',

    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 5,
        elevation: 1,
        borderWidth:1,
        borderColor:'grey',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    address: {
        fontSize: 14,
        color: '#333',
        marginBottom: 10,
    },
    phone: {
        fontSize: 14,
        color: '#333',
    },
    addressContainer: {
        marginHorizontal: 0,
        borderRadius: 5,
        justifyContent: 'center',
    },
    addressTitle: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold'
    },
});

export default AddressList;
