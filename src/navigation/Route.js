import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { Text, useColorScheme, View, Modal } from 'react-native';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import colors from '../styles/colors';
import NoInternet from '../Components/NoInternet';
import NavigationService from './NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setFcmTokenAction } from '../redux/actions/UserAction';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const theme = useColorScheme() === 'dark' ? colors.dark : colors.light;
  const accessToken = useSelector(state => state?.auth?.data?.jwt_response);
  const product = useSelector(state => state?.auth?.data?.customer_data);
  const userId = product?.id;

  const token = null;
  const dispatch = useDispatch()

  useEffect(() => {
    getFcmToken()
  })

  const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    dispatch(setFcmTokenAction(userId, fcmToken))

  }

  let network = NoInternet();
  const NoInternetModal = () => {
    return (
      <View>
        {network == false ? (
          <Modal transparent={true} animationType={'slide'} isVisible={network}>
            <View style={{ flex: 1, zIndex: -1, justifyContent: 'center' }}>
              <View
                style={{
                  height: 60,
                  width: '90%',
                  alignSelf: 'center',
                  backgroundColor: 'black',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  elevation: 5,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    // margin: 15,
                    fontWeight: '500',
                    color: 'white',
                  }}>
                  No Internet Connection!
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    // margin: 15,
                    fontWeight: '500',
                    color: 'white',

                    // justifyContent: 'center',
                    // alignItems: 'center',
                    // alignSelf: 'center',
                    // marginBottom: 10,
                  }}>
                  Please check your internet connection.
                </Text>
              </View>
            </View>
          </Modal>
        ) : null}
      </View>
    );
  };


  return (
    <NavigationContainer theme={theme}
      // <NavigationContainer 
      ref={(ref) => NavigationService.setTopLevelNavigator(ref)}

    >
      {accessToken !== undefined ? <MainStack /> : <AuthStack />}
      {/* {<MainStack />} */}
      <NoInternetModal />
    </NavigationContainer>
  );
}







