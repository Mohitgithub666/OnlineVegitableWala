import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale, textScale } from '../styles/responsiveSize'
import Headers from './Headers'
import { useSelector } from 'react-redux'

const Help = () => {
    const storeName = useSelector(state => state?.auth?.data?.store_name);
    const store_number = useSelector(state => state?.auth?.data?.store_number);
    const { futterLine6: help, futterLine7: appLink, futterLine8: aboutUs, futterLine9: PrivacyPolicy, futterLine10: returnData, } = useSelector(state => state?.auth?.data?.store_data) || {}
    return (
        <>
            <Headers
                title='Help'
            />
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>

                <View style={styles.container}>

                    <View style={[styles.infoContainer, {}]}>
                        <Text style={styles.infoLabel}>Name     </Text>
                        <Text style={styles.infoText}>{storeName}</Text>
                    </View>

                    <View style={[styles.infoContainer, {}]}>
                        <Text style={styles.infoLabel}>Number </Text>
                        <Text style={styles.infoText}>{store_number || '1234567890'}</Text>
                    </View>
                    <View style={[styles.infoContainer, { marginTop: scale(8), marginTop: scale(8), borderWidth: 0.2, padding: 10, borderRadius: 2, backgroundColor: '#f7f7f7', minHeight: 150 }]} >
                        <Text style={styles.infoText} numberOfLines={6}>
                            {/* NanoOmni Store is the only e-commerce platform made in India and made for India where all the household essentials are available at very affordable prices! From household groceries to fashion items, kitchen items to electronics items, everything is available at one place on NanoOmni!! */}
                            {
                                help || 'No Help Data'
                            }
                        </Text>
                    </View>
                </View>
            </View>
        </>

    )
}

export default Help

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: "#fff"
    },
    infoContainer: {
        flexDirection: 'row',
        marginTop: scale(15),
        width: '100%',
        backgroundColor: "#fff"

    },
    infoLabel: {
        fontSize: textScale(18),
        fontWeight: 'bold',
        marginRight: scale(15),
        color: 'black',
    },
    infoText: {
        fontSize: textScale(16),
        color: 'grey'
    },
    infoText: {
        textAlign: 'center',
        // letterSpacing:1
        color: '#000',
        fontSize: 15,
        // alignSelf:'center'

    }
})