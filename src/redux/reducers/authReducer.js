import * as ActionTypes from '../actionTypes';

const initialState = {
  data: {},
  dropdownCity: [],
  selectedCity: '',
  bothId: [],
  city: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        data: action.payload,
      };
    case ActionTypes.SIGNUP:
      return {
        ...state,
        data: action.payload,
      };
    case ActionTypes.DropDownCity:
      return {
        ...state,
        dropdownCity: action.payload,
      };
    case ActionTypes.SELECTEDCITY:
      return {
        ...state,
        selectedCity: action.payload,
      };

      // 
    case ActionTypes.CITY:
      return {
        ...state,
        city: action.payload,
      };
    case ActionTypes.BOTHID:
      return {
        ...state,
        bothId: action.payload,
      };

    default:
      return state;
  }
};
