import React from 'react';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import GetOtp from '../screens/GetOtp';
import OtpVerification from '../screens/OtpVerification';
import ResetPassword from '../screens/ResetPassword';
import NewPassword from '../screens/NewPassword';
import Test from '../screens/Test';
import StoreAddress from '../screens/StoreAddress';
import LocationScreen from '../screens/LocationScreen';
import AuthBottomTab from './AuthBottomTab';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();


export default function AuthStack() {
  return (
    <Stack.Navigator>
       <Stack.Screen
        name="LocationScreen"
        component={LocationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GetOtp"
        component={GetOtp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtpVerification"
        component={OtpVerification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StoreAddress"
        component={StoreAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Test"
        component={Test}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AuthBottomTab"
        component={AuthBottomTab}
        options={{headerShown: false}}
      />
     
      
    </Stack.Navigator>
  );
}



