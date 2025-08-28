import { Text, View, TouchableOpacity, Keyboard, StyleSheet, ScrollView, Alert, BackHandler, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale, moderateScaleVertical, } from '../styles/responsiveSize';
import commonStyles from '../styles/commonStyles';
import FontConst from '../Assets/FontFamily/FontConst';
import TextInputCompo from '../Components/TextInputCompo';
import { useNavigation, useTheme } from '@react-navigation/native';
import Buttons from '../Components/Buttons';
import Login from './Login';
import { SignUpAction, } from '../redux/actions/AuthAction';
import imgPath from '../constants/imgPath';

import store from '../redux/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';





const Signup = ({ route }) => {
  const { number, } = route?.params;
  const bothId = useSelector(state => state?.city?.bothId);

  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    mobile_number: number,
    password: "",
    delivery_address: "",
    customer_name: "",
    store_id: bothId?.store_id,
    saas_id: bothId?.saas_id,
    email: "",
  });


  console.log("number", number)

  console.log("bothIda", bothId,)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const colors = useTheme().colors;

  const handleResetData = () => {
    store.dispatch({ type: "RESET" })
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
              onPress: () => {
                handleResetData()
                  , BackHandler.exitApp()
              },
            },
          ]
        );
      }
    });

    // Return the unsubscribe function to clean up
    return unsubscribe;
  }, [navigation]);







  const handleSubmit = async () => {
    Keyboard.dismiss();
    let isValid = true;

    // Validate other fields...
    if (!inputs.customer_name) {
      handleError('Please input name', 'customer_name');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 3) {
      handleError('Min password length of 3', 'password');
      isValid = false;
    }

    const db = await AsyncStorage.getItem('STORE')
    const objectDB = JSON.parse(db)

    if (isValid) {
      const data = JSON.stringify({
        mobile_number: inputs.mobile_number,
        password: inputs.password,
        delivery_address: inputs.delivery_address,
        customer_name: inputs.customer_name,
        email: inputs.email,
        store_id: objectDB.storeId,
        saas_id: objectDB.saasId,
      });

      try {

        const res = await dispatch(SignUpAction(data))
        if (res == true) {
          navigation.navigate(Login)
        }

        console.log("SIgnUp", data)
      } catch (error) {
        console.error('Error during sign up:', error);
      }
    }

  };


  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));

  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };




  return (
    <ScrollView contentContainerStyle={[styles.container, {}]}
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
    >
      <Image
        style={[{ height: 150, width: 150, alignSelf: 'center', marginBottom: 20 }]}
        source={imgPath.applogo
        }
        resizeMode='center'
      />
      <View style={{ marginVertical: moderateScaleVertical(30), justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[commonStyles.fontBold24, { color: colors.text, fontWeight: 'bold' }]}>SignUp</Text>
      </View>
      <View style={[styles.modalView, {
        paddingVertical: moderateScaleVertical(14),
      }]}>


        <TextInputCompo
          onChangeText={text => handleOnchange(text, 'customer_name')}
          onFocus={() => handleError(null, 'customer_name')}
          iconName="account-outline"
          placeholder="Enter  name"
          error={errors.customer_name}

        />

        <TextInputCompo
          onChangeText={text => handleOnchange(text, 'password')}
          onFocus={() => handleError(null, 'password')}
          iconName="lock-outline"
          label="Password"
          placeholder="Enter your password"
          error={errors.password}
          password
        />
        <Buttons
          onPress={() => { handleSubmit() }}
          titel='Sign Up'
          style={{ marginVertical: 16 }}
        />

        {/* <Buttons
          onPress={() => { as() }}
          titel='Test'
          style={{ marginVertical: 16 }}
        /> */}


        {/* <Buttons
          onPress={() => navigation.navigate(Test
          )}
          titel='Test'
          style={{ marginVertical: 16 }}
        /> */}


        {/*   */}
        <View style={[{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}>
          <Text style={{
            alignSelf: 'center', fontSize: moderateScale(16),
          }}>Already have an account ?</Text>
          <TouchableOpacity style={{}}>
            <Text style={[styles.experienceText, commonStyles.fontBold16, {
              fontFamily: FontConst.regular,
              color: 'blue',
              alignSelf: 'center',
              fontSize: moderateScale(16),
              fontWeight: 'bold'

            }]} onPress={() => navigation.navigate(Login)}> LogIn
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>

  )
}

export default Signup


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF'

  },
  experienceText: {
    alignSelf: 'center',
    alignSelf: "flex-start"

  },
  modalView: {
    justifyContent: 'center',
    borderRadius: 5,
  },


});

