// ProfileScreen.js

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import imgPath from '../constants/imgPath';
import { useSelector } from 'react-redux';
import Cart from './Cart';
import { useNavigation } from '@react-navigation/native';
import Orders from './Orders';
import Profile from './Profile';
import Address from './Address';
import Help from '../Components/Help';
import Aboutus from '../Components/Aboutus';
import { ShareAppLink } from '../styles/utils/commonFunctions';
import store from '../redux/Store';
import PrivacyPolicy from '../Components/PrivacyPolicy';
import Return from '../Components/Return';

const Account = () => {
  const { customer_data } = useSelector(state => state?.auth?.data);
  const { futterLine6: help, futterLine7: appLink, futterLine8: aboutUs, futterLine9: PrivacyPolicy, futterLine10: returnData, } = useSelector(state => state?.auth?.data?.store_data) || {}
  const storeName = useSelector(state => state?.auth?.data?.store_name);

  const navigation = useNavigation()
  const handleLogout = () => {
    store.dispatch({ type: "RESET" })
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={imgPath.avtar}
          style={styles.profileImage}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.name}>{customer_data?.name}</Text>
          {
            customer_data?.email &&
            <TouchableOpacity style={styles.emailContainer}>
              <Text style={styles.email}>{customer_data?.email}</Text>
              {/* <Icon name="pencil-outline" size={16} color="green" style={styles.editIcon} /> */}
            </TouchableOpacity>
          }

        </View>
      </View>

      <View style={styles.bothView}>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <Pressable key={index} style={styles.menuItem} onPress={() => {
              if (item.action == 'share') {
                ShareAppLink(appLink, storeName);
              } else {

                navigation.navigate(item.screen);
              }
            }}>
              <Icon name={item.icon} size={24} color="black" />
              <Text style={styles.menuText}>{item.title}</Text>
              <Icon name="chevron-forward-outline" size={24} color="black" />
            </Pressable>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out-outline" size={24} color="green" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const menuItems = [
  { title: 'Profile', icon: 'person-outline', screen: Profile },
  { title: 'Orders', icon: 'cart-outline', screen: Orders },
  { title: 'Delivery Address', icon: 'location-outline', screen: Address },
  { title: 'Privacy Policy', icon: 'book', screen: PrivacyPolicy },
  { title: 'Return', icon: 'return-down-back', screen: Return },
  { title: 'Help', icon: 'help-circle-outline', screen: Help },
  { title: 'Share', icon: 'share', action: 'share' },
  { title: 'About', icon: 'information-circle-outline', screen: Aboutus },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  headerTextContainer: {
    marginLeft: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  email: {
    fontSize: 14,
    color: '#888',
  },
  editIcon: {
    marginLeft: 5,
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    flex: 1,
    marginLeft: 20,
    fontSize: 16,
    color: '#000'
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginVertical: 20,
    borderTopColor: '#ccc',
    backgroundColor: '#F2F3F2',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 4,


  },
  logoutText: {
    marginLeft: 10,
    fontSize: 18,
    color: 'green',
    fontWeight: 'semibold'
  },
  bothView: {
    // justifyContent: 'space-between',
    // backgroundColor:'red',
    // flexGrow:1
  }
});

export default Account;
