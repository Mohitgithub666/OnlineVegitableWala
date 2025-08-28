import * as ActionTypes from '../actionTypes';
import * as ApiClient from '../../apiFriend';
import { showToast } from '../../styles/utils/toast';
import { showMessage } from 'react-native-flash-message';
import { BASE_URL } from '../../apiEndpoints/Base_Url';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginAction = data => async dispatch => {
  try {
    const endUrl = `${BASE_URL}auth/user-login`;
    const headers = {};
    const body = data;
    const method = 'POST';
    let response = await ApiClient.ApiRequest(endUrl, method, headers, body);
    console.log('LoginAction response?.data', response);

    if (response.status !== true) {
      showMessage({
        message: 'Please Check Number and Password',
        type: 'danger',
      });
    } else if (response.status) {
      await dispatch({
        type: ActionTypes.LOGIN,
        payload: response?.data,
      });
      showMessage({
        message: 'Welcome',
        type: 'success',
      });
    }
    return response;
  } catch (error) {
    showMessage({
      message: { error },
      type: 'danger',
    });
  }
};

export const LoginGuest = data => async dispatch => {
  console.log('LoginGuest_Props', data?.storeId, data?.saasId);

  try {
    const endUrl = `${BASE_URL}auth/guestLogin/${data?.saasId}/${data?.storeId}`;
    const headers = {};
    const body = data;
    const method = 'GET';
    let response = await ApiClient.ApiRequest(endUrl, method, headers);
    console.log('LoginGuest response?.data', response?.data, endUrl);

    if (response.status) {
      await dispatch({
        type: ActionTypes.LOGIN,
        payload: response?.data,
      });
    }
    return response;
  } catch (error) {
    showMessage({
      message: { error },
      type: 'danger',
    });
  }
};

export const SignUpAction = data => async dispatch => {
  try {
    const endUrl = `${BASE_URL}user-master/customer-sign-up`;
    const headers = {};
    const body = data;
    const method = 'POST';
    let response = await ApiClient.ApiRequest(endUrl, method, headers, body);
    console.log('SignUpAction response', response);

    if (response?.status) {
      showMessage({
        message: `${response?.message}`,
        type: 'success',
      });
    } else {
      showMessage({
        message: `${response?.message}`,
        type: 'danger',
      });
    }
    return response.status;
  } catch (error) {
    showToast(error);
  }
};

export const sendOtpMethod = requestNumber => async dispatch => {
  const dbString = await AsyncStorage.getItem('STORE');
  if (dbString !== null) {
    var objectDB = JSON.parse(dbString);
  }

  try {
    const endUrl = `${BASE_URL}otp/resend-otp/${requestNumber}/${objectDB?.storeId}`;
    const headers = {};
    const method = 'GET';
    let response = await ApiClient.ApiRequest(endUrl, method, headers);
    console.log('sendOtpMethod response', response);

    if (response?.status === true) {
      showToast('OTP Send Successfully');
    } else {
      showToast(`${response?.message}`);
    }

    return response?.status;
  } catch (error) {
    showToast(error);
  }
};

export const OtpVerificationMethod = data => async dispatch => {
  try {
    const endUrl = `${BASE_URL}otp/validate-otp`;

    const headers = {};
    const body = JSON.stringify(data);
    const method = 'POST';
    let response = await ApiClient.ApiRequest(endUrl, method, headers, body);

    console.log('OtpVerificationMethod response', response);
    if (response.status === true) {
      showMessage({
        message: `${response.message}`,
        type: 'success',
      });
    } else {
      showToast('Please Input Correct OTP');
    }

    return response?.status;
  } catch (error) {
    showToast(error);
  }
};

export const resendOtpMethod = data => async dispatch => {
  try {
    const headers = {};
    const body = data;
    const method = 'GET';
    const endUrl = `${BASE_URL}otp/resend-otp-forgot-password/${body}`;
    let response = await ApiClient.ApiRequest(endUrl, method, headers);
    console.log('resendOtpMethod_resp', response);

    if (response.status == true) {
      showToast('Reset password OTP send succesfully');
    }

    return response?.status;
  } catch (error) {
    showToast(error);
  }
};
export const newPasswordMethod = data => async dispatch => {
  try {
    const headers = {};
    const body = data;
    const method = 'PUT';
    const endUrl = `${BASE_URL}user-master/forgot-password-user`;
    let response = await ApiClient.ApiRequest(endUrl, method, headers, body);

    // console.log("newPasswordMethod_resp", response)
    if (response.status == true) {
      showToast('Password changed succesfully done');
    }

    return response?.status;
  } catch (error) {
    showToast(error);
  }
};

export const cityAction = searchQuery => async dispatch => {
  try {
    const endUrl = `${BASE_URL}order/get-all-city/${searchQuery}`;
    const headers = {};
    const method = 'GET';
    let response = await ApiClient.ApiRequest(endUrl, method, headers);

    console.log('first');
    if (response?.status) {
      await dispatch({
        type: ActionTypes.DropDownCity,
        payload: response?.data,
      });
    } else {
      showMessage({
        message: `${response?.message}`,
        type: 'danger',
      });
    }
    return response;
  } catch (error) {
    showToast(error);
  }
};

export const saasId_StoreIdAction = searchQuery => async dispatch => {
  try {
    const endUrl = `${BASE_URL}auth/all-store-name/${searchQuery}`;
    const headers = {};
    const method = 'GET';
    let response = await ApiClient.ApiRequest(endUrl, method, headers);
    // console.log("saasId_StoreIdAction response", response);

    if (response?.status) {
      await dispatch({
        type: ActionTypes.DropDownCity,
        payload: response?.data,
      });
    } else {
      showMessage({
        message: `${response?.message}`,
        type: 'danger',
      });
    }
    return response;
  } catch (error) {
    showToast(error);
  }
};

////
export const getCity = searchQuery => async (dispatch, getState) => {
  // const { id, storeId, saasId, } = getState()?.auth?.data?.customer_data

  try {
    const endUrl = `${BASE_URL}order/get-all-city/${searchQuery}`;
    const headers = {};
    const method = 'GET';
    let response = await ApiClient.ApiRequest(endUrl, method, headers);
    // console.log("getCity_resp", response, endUrl)

    if (response?.status) {
      await dispatch({
        type: ActionTypes.CITY,
        payload: response?.data,
      });
    } else {
      showToast(response?.message);
    }
    return response?.data;
  } catch (error) {
    showToast('Network Error');
  }
};

export const getStoreIds = searchQuery => async (dispatch, getState) => {
  try {
    // const endUrl = `${BASE_URL}auth/all-store-name/${searchQuery}`;
    const endUrl = `http://103.139.59.233:8089/prod/api/v1/auth/all-store-name/10021`;
    const headers = {};
    const method = 'GET';
    let response = await ApiClient.ApiRequest(endUrl, method, headers);
    console.log('getStoreIds_resp', response, endUrl);

    if (response?.status) {
      await dispatch({
        type: ActionTypes.BOTHID,
        payload: response?.data,
      });
    } else {
      showToast(response?.message);
    }
    return response?.data;
  } catch (error) {
    showToast('Network Error');
  }
};

export const getStoreListMethod = pincode => async dispatch => {
  try {
    const endUrl = `${BASE_URL}auth/getstoreBypincodeType/${pincode}/VEGETABLE`;
    const headers = {};
    const method = 'GET';
    let response = await ApiClient.ApiRequest(endUrl, method, headers);
    console.log('getStoreListMethod response', response, endUrl);

    if (response?.status === true) {
      // showToast("OTP Send Successfully")
      return response;
    } else {
      // showToast(`${response?.message}`)
    }

    return response?.status;
  } catch (error) {
    showToast(error);
  }
};
