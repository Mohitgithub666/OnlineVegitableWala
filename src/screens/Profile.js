import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale, scale, textScale } from '../styles/responsiveSize';
import Headers from '../Components/Headers';
import imgPath from '../constants/imgPath';
import store from '../redux/Store';
import { getAbout, getAddresData } from '../redux/actions/UserAction';
import Wallet from '../Components/Wallet';

const Profile = () => {
  const product = useSelector(state => state?.auth?.data?.customer_data);
  const storeName = useSelector(state => state?.auth?.data?.store_name);
  const store_number = useSelector(state => state?.auth?.data?.store_number);
  const selectedAddress = useSelector(state => state?.product?.selectedAddres);
  const dispatch = useDispatch();
  const [aboutUs, setaboutUs] = useState('')
  const customerDataId = product?.id;




  const [userProfile, setUserProfile] = useState({
    userEmail: product?.email,
    address: selectedAddress,
    phoneNumber: product?.mobileNumber,
    userName: product?.name,
  });

  useEffect(() => {
    setUserProfile(prevProfile => ({
      ...prevProfile,
      address: selectedAddress,
    }));
  }, [selectedAddress]);

  const noAddressSelecteds = userProfile.address;
  const userType = useSelector(state => state?.auth?.data?.customer_data?.customerType);



  const handleLogout = () => {
    store.dispatch({ type: "RESET" })
  };

  useEffect(() => {
    getAboutData()
  }, [])

  const getAboutData = async () => {
    const resp = await dispatch(getAbout())
    setaboutUs(resp?.data)
    getAddresData(product?.saasId, product?.storeId, customerDataId)
  }




  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Headers
        title='Profile'
        showShare={true}
      />

      <View style={styles.profileContainer}>
        {/* <SideModal/> */}


        <Image
          source={imgPath.avtar}
          style={styles.profilePicture}
          resizeMode='contain'

        />
        <Text style={styles.username}>{userProfile.userName}</Text>

        <View style={{ width: '90%' }}>
          <View style={styles.wallet}>
            <Wallet />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Number   </Text>
            <Text style={styles.infoText}>{userProfile.phoneNumber}</Text>

          </View>

        </View>

        {userType === 'seller' ? null : (
          <View style={[styles.infoContainer, { width: '90%', overflow: 'hidden', }]}>
            <Text style={styles.infoLabel}>Address   </Text>
            <Text style={[styles.infoText, {}]} numberOfLines={4}>
              {noAddressSelecteds && typeof noAddressSelecteds === 'object' && Object.keys(noAddressSelecteds).length > 0
                ? `${noAddressSelecteds.pincode}, ${noAddressSelecteds.city}, ${noAddressSelecteds.state}`
                : 'No Address Selected'
              }
            </Text>

          </View>
        )}

        <View style={{ width: '90%', marginTop: scale(20) }}>
          <Text style={[styles.infoLabel, { alignSelf: 'center' }]}>Store Details</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Name     </Text>
            <Text style={styles.infoText}>{storeName}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Number </Text>
            <Text style={styles.infoText}>{store_number || '1234567890'}</Text>
          </View>

        </View>    

      </View>

    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    // backgroundColor: 'pink',
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: scale(20),
  },
  profilePicture: {
    width: scale(140),
    height: scale(140),
    // width: scale(180),
    // height: scale(180),
    borderRadius: scale(90),
    borderWidth: 0.4,
    borderColor: 'grey',
  },
  username: {
    fontSize: textScale(28),
    fontWeight: 'bold',
    marginVertical: scale(10),
    color: 'black',
  },
  infoContainer: {
    flexDirection: 'row',
    marginTop: scale(15),
    width: '100%'
  },
  infoLabel: {
    fontSize: textScale(18),
    fontWeight: 'bold',
    marginRight: scale(15),
    color: '#000',
  },
  infoText: {
    fontSize: textScale(16),
    color: 'grey'
  },
  logOutStyle: {
    marginTop: scale(70),
    width: '100%',
  },
  wallet: {
    backgroundColor: '#fff',
    backgroundColor: '#f7f7f5',
    // backgroundColor: '#e8e6e1',
    height: moderateScale(180),
    borderRadius: scale(16),
    elevation: 8
    // opacity:0.5
  }
});

export default Profile;
