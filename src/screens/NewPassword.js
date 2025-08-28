import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import TextInputCompo from '../Components/TextInputCompo';
import { scale } from '../styles/responsiveSize';
import Buttons from '../Components/Buttons';
import imgPath from '../constants/imgPath';
import commonStyles from '../styles/commonStyles';
import { newPasswordMethod } from '../redux/actions/AuthAction';
import Login from './Login';

const NewPassword = ({ route }) => {
    const { number } = route?.params;

    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({
        user_name: number,
        password: '',
    });

    const dispatch = useDispatch();
    const colors = useTheme().colors;
    const navigation = useNavigation()


    const handleSubmit = async () => {
        // Your form validation logic here
        let isValid = true


        if (!inputs.password) {
            handleError('Please input password', 'password');
            isValid = false;
        } else if (inputs.password.length < 3) {
            handleError('Min password length of 3', 'password');
            isValid = false;
        }

        if (isValid) {
            const data = JSON.stringify({
                mobile_number: inputs.user_name,
                password: inputs.password,
                confirm_password: inputs.password,
            })
            const resp = await dispatch(newPasswordMethod(data));
            if (resp) {
                navigation.navigate(Login)

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
                <Text style={[commonStyles.fontBold24, { color: colors.text, fontWeight: 'bold', marginBottom: scale(10), alignSelf: 'center', }]}>Create New Password</Text>

                <TextInputCompo
                    onChangeText={text => handleOnchange(text, 'password')}
                    onFocus={() => handleError(null, 'password')}
                    iconName="lock-outline"
                    label="Password"
                    placeholder="Enter your password"
                    error={errors.password}
                    password
                // reset
                />


                <Buttons onPress={() => handleSubmit()} titel="Submit" style={{}} />



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
    },
    signupTextContainer: {
        flexDirection: 'row',
    },
    signupText: {
        color: 'gray',

    },
});

export default NewPassword;
