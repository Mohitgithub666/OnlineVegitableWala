import * as ActionTypes from '../actionTypes';

const initialState = {
    dropdownCity: [],
    selectedCity: '',
    bothId: {}
};

export default (state = initialState, action) => {
    switch (action.type) {

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
        case ActionTypes.BOTHID:
            return {
                ...state,
                bothId: action.payload,
            };

        default:
            return state;
    }
};
