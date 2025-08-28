import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme, useNavigation } from '@react-navigation/native';

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from '../../styles/responsiveSize';

const IconsCompo = (props) => {
    const { name, size, iconcolor, onPress } = props
    const navigation = useNavigation()
    const colors = useTheme().colors;
    return (
        <Icon
            name={name}
            size={scale(size)}
            color={colors.YellowBtn}
            onPress={onPress}
        />
    )
}

export default IconsCompo

const styles = StyleSheet.create({})