import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {height, width} from '../styles/responsiveSize';
import InputAddress from './InputAddress';
import AntDesign from 'react-native-vector-icons/AntDesign';
const AddressModal = ({isVisible, toggleModal, updateBtn}) => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1,backgroundColor:'#FFF'}}>
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
          }}>
          <AntDesign
            name={'close'}
            size={25}
            style={{alignSelf: 'flex-end', right: 15, top: 10}}
            onPress={() => toggleModal()}
          />

          <InputAddress
            updateBtn={updateBtn}
            closeModal={() => toggleModal()}
          />

        </View>
      </Modal>
    </View>
  );
};

export default AddressModal;


