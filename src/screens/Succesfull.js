import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Buttons from '../Components/Buttons'
import { scale, textScale } from '../styles/responsiveSize'
import imgPath from '../constants/imgPath'
import { useTheme } from '@react-navigation/native';


const Succesfull = () => {
    const colors = useTheme().colors;



    return (
        <View style={styles.container}>
            <View style={{
                gap: 70
            }}>
                <Image source={imgPath.verification} />

                <Text style={[styles.textStyle, { fontSize: textScale(30), color: colors.commonGreen, fontWeight: 'bold' },]}>Great!</Text>
                <Text style={[styles.textStyle, { fontSize: textScale(16), bottom: scale(30) }]}>You have successfully{'\n'}          registered</Text>

            </View>
            <Buttons
                titel='Continue'
                style={{
                    marginTop: scale(20)
                }}
            />
        </View>
    )
}

export default Succesfull

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: "center"
    },
    textStyle: {
        alignSelf: "center",
    }

})