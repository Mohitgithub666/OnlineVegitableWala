import {createSlice} from '@reduxjs/toolkit';

const initialComponentPropsManagementState = {
  load: false,
  switchTab: 'insights',
  login_data: null,
  city_select: [],
  user_data: {},
  products_data: [],
  country_dropdown: [],
};

export const ComponentPropsManagement = createSlice({
  name: 'ComponentPropsManagement',

  initialState: initialComponentPropsManagementState,
  reducers: {
    handleLoginRequest: (state, payload) => {
      // console.log('PAYLOAD REQUEST', payload);
      state.load = true;
    },
    handleLoginResponse: (state, payload) => {
      // console.log('PAYLOAD RESPONSE', payload);
      state.login_data = payload;
      state.load = false;
    },
    handleUserDataResponse: (state, payload) => {
      // console.log('PAYLOAD RESPONSE', payload);
      state.user_data = payload;
      state.load = false;
    },
    handleLogoutUser: (state, payload) => {
      // console.log('PAYLOAD RESPONSE LOGOUT', payload);
      state.user_data = {};
      state.login_data = payload;
      state.load = false;
    },
    handleRecommendedDataRequest: (payload, state) => {
      // console.log('ITEMS REQUEST', payload);
    },
    handleRecommendedDataResponse: (payload, state) => {
      // console.log('ITEMS RESPONSE', payload);
      // state.products_data = payload.data;
    },
  },
});

// Action creators are generated for each case reducer function

export const {
  handleLoginRequest,
  handleLoginResponse,
  handleLogoutUser,
  handleRecommendedDataRequest,
} = ComponentPropsManagement.actions;

export default ComponentPropsManagement.reducer;
