import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { height, scale, width } from '../styles/responsiveSize';
import KycInputsForm from './KycInputsForm';


const KycModal = ({ isVisible, toggleModal, updateBtn }) => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <Modal
                isVisible={isVisible}
                deviceWidth={width}
                deviceHeight={height}
                onBackButtonPress={() => {
                    navigation.goBack(), toggleModal();
                }}>
                <View
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 5,
                        // height: height / 1.5,
                        height: height /2,
                    }}>
                    <AntDesign
                        name={'close'}
                        size={25}
                        style={{ alignSelf: 'flex-end', right: 15, top: scale(10) }}
                        onPress={() => toggleModal()}
                    />
                    <View style={{  flex: 1, marginTop: scale(10) }}>
                        <KycInputsForm />
                    </View>

                </View>
            </Modal>
        </View>
    );
};


export default KycModal