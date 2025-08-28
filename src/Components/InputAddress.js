import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Switch,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import commonStyles from '../styles/commonStyles';
import { scale } from '../styles/responsiveSize';
import AddressTextInput from './AddressTextInput';
import Buttons from './Buttons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { showToast } from '../styles/utils/toast';
import { showMessage } from 'react-native-flash-message';
import * as ActionTypes from '../redux/actionTypes';
import { BASE_URL } from '../apiEndpoints/Base_Url';


const InputAddress = ({ updateBtn, closeModal = () => { } }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const selected = useSelector(state => state?.product?.selectedAddres);
  const userData = useSelector(state => state?.auth?.data?.customer_data);
  const saasid = userData?.saasId;
  const storeId = userData?.storeId;
  const customerDataId = userData.id;

  const [formData, setFormData] = useState({
    address: '',
    street: '',
    address_type: '',
    pincode: '',
    city: '',
    state: '',
    store_id: storeId,
    saas_id: saasid,
  });









  const handleSubmit = async () => {
    if (
      formData.address &&
      formData.street &&
      formData.address_type &&
      formData.pincode &&
      formData.city &&
      formData.state
    ) {
      try {
        const endUrl = `${BASE_URL}customer/create-address/${customerDataId}`;
        const response = await axios.post(endUrl, formData);
        if (response.status) {

          dispatch({
            type: ActionTypes.ADDRRESS,
            payload: response?.data
          })
        } else {

        }

        closeModal();
        showMessage({
          message: "Address Saved succesfully",
          type: "success",
        });

      } catch (error) {
        showMessage({
          message: "Network Error",
          type: "danger",
        })
      }
    } else {
      if (Platform.OS == 'android') {
        showToast('Please input  fields');
      } else {
        Alert.alert('Please input  fields');
      }
    }
  };

  const handleUpdate = async () => {
    if (
      formData.address &&
      formData.street &&
      formData.address_type &&
      formData.pincode &&
      formData.city &&
      formData.state
    ) {
      try {
        const endUrl = `${BASE_URL}customer/update-address/${customerDataId}/${updateBtn}`;
        const response = await axios.put(endUrl, formData);
        if (response.status == 200) {


          showMessage({
            message: "Succesfully updated",
            type: "success",
          })

        }
        closeModal();
      } catch (error) {
        console.error('Error:', error);
        showMessage({
          message: "Network Error",
          type: "danger",
        })
      }
    } else {
      showMessage({
        message: "Network Error",
        type: "danger",
      })
    }
  };

  useEffect(() => {


    if (
      selected.address &&
      selected.street &&
      selected.addressType &&
      selected.pincode &&
      selected.city &&
      selected.state
    ) {
      setFormData({
        address: selected.address,
        street: selected.street,
        address_type: selected.addressType,
        pincode: selected.pincode,
        city: selected.city,
        state: selected.state,
        store_id: storeId,
        saas_id: saasid,
      });
    } else {
      setFormData({
        address: '',
        street: '',
        address_type: '',
        pincode: '',
        city: '',
        state: '',
        store_id: storeId,
        saas_id: saasid,
      });
    }
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.constainer}>
        <Text style={[commonStyles.fontBold24, { fontWeight: 'bold', color: 'grey' }]}>
          {updateBtn ? 'Update Address' : 'Add Address'}
        </Text>

        <View style={{ marginTop: scale(8) }}>
          <View style={styles.textInputCommonStyle}>
            <AddressTextInput
              placeholder="Address"
              value={formData.address}
              autoFocus={true}
              onChangeText={text => setFormData({ ...formData, address: text })}
            />
            <AddressTextInput
              placeholder="Street"
              value={formData.street}
              onChangeText={text => setFormData({ ...formData, street: text })}
            />
          </View>
          <View
            style={[
              styles.textInputCommonStyle,
              { justifyContent: 'space-around', flexDirection: 'row' },
            ]}>
            {/* Option Address  */}
            {renderAddressOption(1, 'Office')}
            <View
              style={{
                borderColor: '#e6e4e1',
              }}></View>

            {renderAddressOption(2, 'Home')}
            <View
              style={{
                borderColor: '#e6e4e1',
              }}></View>
          </View>
          <View style={styles.textInputCommonStyle}>
            <AddressTextInput
              placeholder="pincode"
              value={formData.pincode}
              keyboardType={'number-pad'}
              onChangeText={text => setFormData({ ...formData, pincode: text })}
            />
            <AddressTextInput
              placeholder="City"
              value={formData.city}
              onChangeText={text => setFormData({ ...formData, city: text })}
            />
            <AddressTextInput
              placeholder="State"
              value={formData.state}
              onChangeText={text => setFormData({ ...formData, state: text })}
            />
          </View>
        </View>
        <View style={{ gap: scale(8), marginTop: scale(4) }}>
          {updateBtn ? (
            <Buttons titel={'Update'} onPress={() => handleUpdate()} />
          ) : (
            <Buttons titel={'Save'} onPress={() => handleSubmit()} />
          )}
        </View>
      </View>
    </ScrollView>
  );

  // Function to select Address option
  function renderAddressOption(option, text) {
    return (
      <TouchableOpacity
        onPress={() => setFormData({ ...formData, address_type: text })}
        key={option}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.round}>
            {formData.address_type === text ? (
              <View style={styles.round1}></View>
            ) : null}
          </View>
          <Text style={styles.txt}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
};

export default InputAddress;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: scale(16),
    marginTop: 8,
  },
  textInputCommonStyle: {
    marginVertical: scale(8),
    gap: scale(8),
  },
  txt: {
    color: 'black',
    padding: scale(8),
    margin: scale(4),
  },
  round: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ECE447',
  },
  round1: {
    backgroundColor: '#ECE447',
    height: 20,
    width: 20,
    borderRadius: 20,
    margin: 4,
  },
});





