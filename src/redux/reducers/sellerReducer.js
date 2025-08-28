import * as ActionTypes from '../actionTypes';

const initialState = {
    home_data: [],
    vieworders: [],
    GetOrderMasterDetailsReducer: [],
    GetCustmoreAddress: [],
    GetCustmoreOrderItemDetails: [],
    products: [],
    marketing: [],
    supplierList:[]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ORDERVIEWORDER:
            return {
                ...state,
                vieworders: action.payload,
            };
        case ActionTypes.GETORDERMASTERDETAILSTYPE:
            return {
                ...state,
                GetOrderMasterDetailsReducer: action.payload,
            };
        case ActionTypes.CUSTMOREADDRESSID:
            return {
                ...state,
                GetCustmoreAddress: action.payload,
            };
        case ActionTypes.ORDERVIEWORDERONE:
            return {
                ...state,
                GetCustmoreOrderItemDetails: action.payload,
            };
        case ActionTypes.SUPPLIERLIST:
            return {
                ...state,
                supplierList: action.payload,
            };

        default:
            return state;
    }
};
