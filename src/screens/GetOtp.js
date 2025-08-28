// New Code of LogIn
import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, } from 'react-native';
import TextInputCompo from '../Components/TextInputCompo';
import Buttons from '../Components/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtpMethod } from '../redux/actions/AuthAction';
import { useTheme, useNavigation } from '@react-navigation/native';
import commonStyles from '../styles/commonStyles';
import { scale } from '../styles/responsiveSize';

import imgPath from '../constants/imgPath';

const GetOtp = () => {
    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({
        user_name: '',
    });
    const [disabledBtn, setDisabledBtn] = useState(false)
    const dispatch = useDispatch();
    const colors = useTheme().colors;
    const navigation = useNavigation()



    const handleSubmit = async () => {
        // Your form validation logic here
        let isValid = true;

        const user_name = /^[0-9]+$/; // Regular expression to match digits only
        if (!inputs.user_name) {
            handleError('Please input number', 'user_name');
            isValid = false;
        } else if (inputs.user_name.length !== 10) {
            handleError('Mobile number must be 10 digits long', 'user_name');
            isValid = false;
        } else if (!user_name.test(inputs.user_name)) {
            handleError('Mobile number should contain only digits', 'user_name');
            isValid = false;
        } else {
            isValid = true;
        }
        setDisabledBtn(!disabledBtn)

        if (isValid) {
            const resp = await dispatch(sendOtpMethod(inputs?.user_name));
            console.log('hello1')
            if (resp) {
                navigation.navigate('OtpVerification', { number: inputs.user_name, setDisabledBtn: setDisabledBtn })
                console.log('hello')
            } else {
                navigation.navigate('Login')
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
        <ScrollView contentContainerStyle={styles.scrollViewContainer}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
        >
            <View style={[styles.formContainer, {}]}>
                <Image
                    style={[{ height: 150, width: 150, alignSelf: 'center', marginBottom: 20 }]}
                    source={imgPath.applogo
                    }
                    resizeMode='center'
                />
                <Text style={[commonStyles.fontBold24, { color: colors.text, fontWeight: 'bold', marginBottom: scale(10), alignSelf: 'center', }]}>OTP</Text>
                <TextInputCompo
                    onChangeText={text => handleOnchange(text, 'user_name')}
                    onFocus={() => handleError(null, 'user_name')}
                    iconName="phone"
                    placeholder="Enter Phone Number"
                    error={errors.user_name}
                    maxLength={10}
                    keyboardType={'number-pad'}
                    autoFocus={true}
                />
                <Buttons onPress={() => handleSubmit()} titel="Get Otp" style={{}} disabled={disabledBtn} />

            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',

    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    formContainer: {
        justifyContent: 'center',
        gap: 20
    },
    signupTextContainer: {
        flexDirection: 'row',
    },
    signupText: {
        color: 'gray',

    },
});

export default GetOtp;
