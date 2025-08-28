import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, BackHandler, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { OtpVerificationMethod, sendOtpMethod } from '../redux/actions/AuthAction';

const OtpVerification = ({ route }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { number, reset, setDisabledBtn } = route?.params;


  const handleVerifyOtp = async () => {
    const otpValue = otp.join('');
    const body = {
      mobile_no: number,
      otp: otpValue
    };
    const resp = await dispatch(OtpVerificationMethod(body));

    if (resp === true) {
      // navigation.navigate(Signup);
      if (reset && reset != undefined) {
        navigation.navigate('NewPassword', { number: number })

      } else {

        navigation.navigate('Signup', { number: number })
        // navigation.navigate('StoreAddress', { number: number })

      }
    } else {
      setDisabledBtn(false)
    }
  };
  const handleResendOtp = async () => {
    const resp = await dispatch(sendOtpMethod(number));
    console.log(number)
    if (resp) {
      console.log('otp resend')
    }
  }


  const handleChangeText = (index, value) => {
    if (value.length === 4) {
      const newOtp = value.split('');
      setOtp(newOtp);
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value.length === 1 && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && index > 0 && otp[index].length === 0) {
      inputRefs.current[index - 1].focus();
    }
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
    <View style={styles.container}>
      <Text style={[styles.title, {}]}>Enter OTP:</Text>
      <Text style={[{ fontSize: 16, marginBottom: 120 }]}>Your OTP Send On {number}</Text>
      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChangeText(index, text)}
            onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(index, key)}
            autoFocus={index === 0} // Auto focus on the first box
            autoComplete='sms-otp'
            textContentType='oneTimeCode'
          />
        ))}
      </View>
      <View>
        {/* <Buttons
          titel={'Verify OTP'}
          onPress={handleVerifyOtp}
          style={styles.button}
        /> */}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleResendOtp}>
            <Text style={styles.buttonText}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 20,
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 18,
    width: 50,
    textAlign: 'center',
    marginHorizontal: 10,
    color: '#000'
  },
  button: {
    backgroundColor: '#ECE447',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 40

  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20
  }
});

export default OtpVerification;




