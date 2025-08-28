
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { textScale } from '../styles/responsiveSize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';



const NoDataFound = ({
    text = ' NO_DATA_FOUND ',
    containerStyle,
    textStyle,
    iconName,
    iconsColor,
    iconSize
}) => {
    const colors = useTheme().colors;




    return (
        <View style={{ ...styles.container, ...containerStyle }}>
            {
                iconName &&
                <MaterialCommunityIcons name={iconName} color={colors.greyBgColor} size={textScale(iconSize)} />
            }
            <Text style={{ ...styles.textStyle, ...textStyle }}>{text}</Text>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    textStyle: {
        fontSize: textScale(17),
        color: 'grey'
    }
});

export default NoDataFound;
