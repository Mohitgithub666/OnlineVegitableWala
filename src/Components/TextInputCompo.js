import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import { useNavigation, useTheme } from '@react-navigation/native';
import { moderateScaleVertical, scale, textScale } from '../styles/responsiveSize';
import { moderateScale } from './Matrics';
import ResetPassword from '../screens/ResetPassword';


const TextInputCompo = ({
    value,
    label,
    placeholder,
    iconName,
    error,
    password,
    onChange,
    onChangeText,
    keyboardType,
    maxLength,
    textInputColor,
    editable,
    autoFocus,
    reset,
    onFocus = () => { },
    ...props
}) => {
    const [hidePassword, setHidePassword] = React.useState(password);
    const [isFocused, setIsFocused] = React.useState(false);
    const colors = useTheme().colors;
    const navigation = useNavigation()

    return (
        <View style={{ marginBottom: 20, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
            {/* <Text style={style.label}>{label}</Text> */}
            <View
                style={[
                    style.inputContainer,
                    {
                        borderColor: error
                            ? colors.red
                            : isFocused
                                ? colors.darkBlue
                                : colors.light,
                        alignItems: 'center',
                        height: scale(48),
                        // backgroundColor:'red'

                    },
                ]}>
                <Icon
                    name={iconName}
                    style={{ color: '#000', fontSize: 22, left: 5 }}
                />
                <TextInput
                    value={value}
                    onChange={onChange}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={'grey'}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    editable={editable}


                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={hidePassword}
                    style={{ color: '#000', flex: 1, left: 10, fontSize: textScale(16), backgroundColor: textInputColor, borderBottomRightRadius: 8, borderTopRightRadius: 8 }}

                    autoFocus={autoFocus}
                    {...props}
                />
                {password && (
                    <Icon
                        onPress={() => setHidePassword(!hidePassword)}
                        name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                        style={{ color: colors.darkBlue, fontSize: 22 }}
                    />
                )}
            </View>
            {error && (
                <View style={{
                    justifyContent: "flex-start", alignItems: 'flex-start', alignSelf: 'flex-start',
                    paddingHorizontal: moderateScale(20),
                }}>
                    <Text style={{ color: colors.red, fontSize: 12 }}>
                        {error}
                    </Text>
                </View>


            )}
            {reset &&
                <Pressable style={{ alignSelf: 'flex-end', paddingHorizontal: 22 }}
                    onPress={() => navigation.navigate(ResetPassword)}
                >
                    <Text>reset password</Text>
                </Pressable>
            }

        </View>
    );
};

const style = StyleSheet.create({
    label: {
        marginVertical: 5,
        fontSize: 14,
        color: colors.grey,
    },
    inputContainer: {
        backgroundColor: colors.whiteOpacity70,
        flexDirection: 'row',
        borderWidth: 1,
        width: '90%',
        borderRadius: 8,
        paddingRight: 10
    },
});

export default TextInputCompo;

