
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetWalletMethod } from '../redux/actions/UserAction';
import { moderateScale, scale } from './Matrics';

const Wallet = () => {
    const dispatch = useDispatch();
    const walletBalance = useSelector(state => state?.product?.walletBalance);

    useEffect(() => {
        fetchWalletBalance();
    }, []);

    const fetchWalletBalance = async () => {
        try {
            const response = await dispatch(GetWalletMethod());
        } catch (error) {
            console.error('Error fetching wallet balance:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { alignSelf: 'flex-start', color: '#000', fontWeight: '600' }]}>My Wallet</Text>
            <View style={styles.innerContainer}>
                <Text style={[styles.title, { fontSize: 18 }]}>Available Balance</Text>
                <Text style={styles.balance}>₹{walletBalance?.balance || 0}</Text>
                <Text style={[styles.title, { fontSize: 14, fontStyle: 'italic', }]}>Use your wallet balance for better prices</Text>
                {/* <Button title='Wallet' onPress={fetchWalletBalance} /> */}
            </View>
        </View>
    );
};

export default Wallet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 16,
        padding: moderateScale(16),
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer: {
        alignItems: 'center',
        gap: moderateScale(8),
    },
    title: {
        fontSize: moderateScale(16),
        color: "grey",
    },
    balance: {
        fontSize: moderateScale(30),
        color: "green",
        fontWeight: 'bold',
    },
});
