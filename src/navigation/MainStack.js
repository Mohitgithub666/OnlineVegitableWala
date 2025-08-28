import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import Orders from '../screens/Orders';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Paymentscreen from '../screens/Paymentscreen';
import Address from '../screens/Address';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {scale} from '../styles/responsiveSize';
import OtpVerification from '../screens/OtpVerification';
import {useSelector} from 'react-redux';
import Search from '../screens/Search';
import KycInputsForm from '../Components/KycInputsForm';
import RenderViewOrder from '../Components/RenderViewOrder';
import OrderNumber from '../screens/OrderNumber';
import Test from '../screens/Test';
import OrderDetails from '../screens/OrderDetails';
import Help from '../Components/Help';
import Aboutus from '../Components/Aboutus';
import ItemDetails from '../screens/ItemDetails';
import Account from '../screens/Account';
import PrivacyPolicy from '../Components/PrivacyPolicy';
import Return from '../Components/Return';
import SubCategory from '../screens/SubCategory';

const Stack = createNativeStackNavigator();
export default function MainStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      {/* Add other screens if needed */}
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="Paymentscreen" component={Paymentscreen} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="KycInputsForm" component={KycInputsForm} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="RenderViewOrder" component={RenderViewOrder} />
      <Stack.Screen name="OrderNumber" component={OrderNumber} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Aboutus" component={Aboutus} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="Return" component={Return} />
      <Stack.Screen name="ItemDetails" component={ItemDetails} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="SubCategory" component={SubCategory} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  const Tab = createBottomTabNavigator();
  const cartArray = useSelector(state => state?.product.cart?.data?.products);
  const cartLength = cartArray?.length > 0 ? cartArray.length : null;
  const accessToken = useSelector(state => state?.auth?.data?.jwt_response);
  console.log('accessToken', accessToken);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {backgroundColor: '#fff'},
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
            return (
              <FontAwesome
                name={iconName}
                size={size}
                color={focused ? 'green' : focused}
              />
            );
          } else if (route.name === 'Orders') {
            iconName = 'box';
            return (
              <Feather
                name={iconName}
                size={size}
                color={focused ? 'green' : focused}
              />
            );
          } else if (route.name === 'Cart') {
            iconName = 'shoppingcart';
            return (
              <AntDesign
                name={iconName}
                size={size}
                color={focused ? 'green' : focused}
              />
            );
          } else if (route.name === 'Profile') {
            iconName = 'user';
            return <AntDesign name={iconName} size={size} color={color} />;
          } else if (route.name === 'Paymentscreen') {
            iconName = 'wallet';
            return <Icon name={iconName} size={scale(size)} color={color} />;
          } else if (route.name === 'Test') {
            iconName = 'wallet';
            return <Icon name={iconName} size={scale(size)} color={color} />;
          } else if (route.name === 'Succesfull') {
            iconName = 'wallet';
            return <Icon name={iconName} size={scale(size)} color={color} />;
          } else if (route.name === 'Account') {
            iconName = 'user';
            return <Icon name={iconName} size={scale(size)} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#D64046',
        inactiveTintColor: '#BFBFBF',
        labelStyle: {fontSize: 13},
      }}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
          tabBarBadge: cartLength,
          tabBarBadgeStyle: {backgroundColor: 'white', color: 'green'},
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{headerShown: false}}
      />
      {accessToken !== 'GUEST' && (
        <>
          <Tab.Screen
            name="Account"
            component={Account}
            options={{headerShown: false}}
          />
        </>
      )}

      {/* <Tab.Screen
        name="Paymentscreen"
        component={Paymentscreen}
        options={{headerShown: false, title: 'Payment'}}
      /> */}

      {/* <Tab.Screen
        name="Test"
        component={Test}
        options={{headerShown: false, title: 'Test'}}
      /> */}
    </Tab.Navigator>
  );
}
