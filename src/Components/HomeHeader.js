import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { moderateScale, scale, textScale } from '../styles/responsiveSize'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import Profile from '../screens/Profile';
import store from '../redux/Store';

const HomeHeader = () => {
    const storeName = useSelector(state => state?.auth?.data?.store_name);
    const userId = useSelector(state => state?.auth?.data?.customer_data?.id);
    const { customerType, name } = useSelector(state => state?.auth?.data?.customer_data || {}
    );
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state?.auth?.data?.jwt_response);

    const handleProfile = () => {
        if (accessToken == 'GUEST') {
            store.dispatch({ type: "RESET" })
        } else {

            navigation.navigate(Profile)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity onPress={() => handleProfile()} style={{}}>
                    <Icon
                        name={'account-circle-outline'}
                        style={{ color: '#ECE447', fontSize: 35 }}
                    />
                </TouchableOpacity>

                <ScrollView style={styles.textContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        accessToken == 'GUEST' ?
                            <Pressable onPress={() => handleProfile()}>
                                <Text numberOfLines={1} style={styles.text}>Login  <Text numberOfLines={1} style={[styles.text, { fontWeight: '500' }]}></Text></Text>
                            </Pressable>
                            :
                            <Text numberOfLines={1} style={styles.text}>Welcome  <Text numberOfLines={1} style={[styles.text, { fontWeight: '500' }]}>{name || 'doe'}  </Text></Text>
                    }
                </ScrollView>

                <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{}}>
                    <Icon name="magnify" style={{ color: 'grey', fontSize: 30, marginRight: 8 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    container: {
        height: scale(50),
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scale(15),
        elevation: 8,
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    textContainer: {
        marginLeft: scale(10),
    },
    text: {
        fontSize: textScale(15),
        color: '#000',
        fontWeight: 'bold',
    },
    bottom: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})
