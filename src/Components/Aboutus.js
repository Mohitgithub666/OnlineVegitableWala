import { StyleSheet, Text, View } from 'react-native'
import React, { } from 'react'
import { scale } from '../styles/responsiveSize'
import Headers from './Headers'
import { useSelector } from 'react-redux'
import { moderateScale } from './Matrics'

const Aboutus = () => {
    const storeName = useSelector(state => state?.auth?.data?.store_name);
    const { futterLine6: help, futterLine7: appLink, futterLine8: aboutUs, futterLine9: PrivacyPolicy, futterLine10: returnData, } = useSelector(state => state?.auth?.data?.store_data) || {}




    return (
        <>
            <Headers
                title='About Us'
            />
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>

                <View style={styles.container}>
                    <View style={[styles.infoContainer, { marginTop: scale(8), borderWidth: 0.2, padding: 10, borderRadius: 2, backgroundColor: '#f7f7f7', }]} >
                        <Text style={[styles.infoText, { fontWeight: 'bold' }]}>
                            {storeName}

                        </Text>
                        <Text style={styles.infoText} >
                            {
                                aboutUs || 'No About Us Data'
                            }
                        </Text>
                    </View>
                </View>
            </View>
        </>
    )
}

export default Aboutus

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginVertical: 8
    },
    infoContainer: {
        marginTop: scale(15),
        width: '100%'
    },
    infoText: {
        textAlign: 'center',
        color: '#000',
        fontSize: 15,
        marginTop: moderateScale(16)

    }
})