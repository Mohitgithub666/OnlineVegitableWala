import {act} from 'react-test-renderer';
import * as ActionTypes from '../actionTypes';

const initialState = {
  data: [],
  productPage: 1,
  quantity: {},
  category: [],
  addtocart: [],
  cart: [],
  addresses: [],
  selectedAddres: {},
  ViewOrderHistory: [],
  ViewOrderDetailsList: [],
  categoryItems: [],
  categoryItemsPage: 1,
  nocategoryItems: false,
  selectedcategoryItems: null,
  search: [],
  paymentrefrence_Data: false,
  KYC_Data: false,
  deliveryCharges: 0,
  GetMinOrderValue: 0,
  isLoading: false,
  walletBalance: {},
  allCoupan: [],
  applyCoupan: {},
  masterCategory: [],
  subCategoryData: [],
  subCategoryItemsData: [],
  selectedMasterCategory: '',
  selectedSubCategory: '',
  subCategoryItemsPage: 1,
  subCategoryItemsTotalPage: null,
  recommendedTotalPage: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PRODUCT:
      return {
        ...state,
        data: action.payload,
      };
    case ActionTypes.PRODUCTPAGE:
      return {
        ...state,
        productPage: action.payload,
      };
    case ActionTypes.CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    case ActionTypes.ADDTOCART:
      return {
        ...state,
        addtocart: action.payload,
      };

    case ActionTypes.CART:
      return {
        ...state,
        cart: action.payload,
      };

    case ActionTypes.REMOVEFROMCART:
      return {
        ...state,
        removecart: action.payload,
      };
    case ActionTypes.ISLOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case ActionTypes.PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };
    case ActionTypes.SELECTEDADDRRES:
      return {
        ...state,
        selectedAddres: action.payload,
      };
    case ActionTypes.ADDRRESS:
      return {
        ...state,
        addresses: action.payload,
      };
    // case ActionTypes.VIEWORDERHISTORY:
    //   return {
    //     ...state,
    //     ViewOrderHistory: action.payload,
    //   };

    case ActionTypes.VIEWORDERHISTORY:
      const deliveryCharges = 20;
      // const deliveryCharges = deliveryCharges;
      const updatedViewOrderHistory = action.payload?.map(item => ({
        ...item,
        deliveryCharges: deliveryCharges,
      }));

      return {
        ...state,
        ViewOrderHistory: updatedViewOrderHistory,
      };

    case ActionTypes.VIEWORDERDETAILSLIST:
      return {
        ...state,
        ViewOrderDetailsList: action.payload,
      };
    case ActionTypes.CATEGORYITEMS:
      return {
        ...state,
        categoryItems: action.payload,
      };
    case ActionTypes.PAYMENTREFRENCE:
      return {
        ...state,
        paymentrefrence_Data: action.payload,
      };
    case ActionTypes.KYC_DATA:
      return {
        ...state,
        KYC_Data: action.payload,
      };
    case ActionTypes.SELECTEDCATEGORYITEMS:
      return {
        ...state,
        selectedcategoryItems: action.payload,
      };

    case ActionTypes.ITEMSEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case ActionTypes.CATEGORYITEMPAGE:
      return {
        ...state,
        categoryItemsPage: action.payload,
      };
    case ActionTypes.NOCATEGORYDATA:
      return {
        ...state,
        nocategoryItems: action.payload,
      };
    case ActionTypes.MINIMUMORDERVALUE:
      return {
        ...state,
        GetMinOrderValue: action.payload,
      };
    case ActionTypes.DELIVERYCHARGES:
      return {
        ...state,
        deliveryCharges: action.payload,
      };
    case ActionTypes.WALLETBALANCE:
      return {
        ...state,
        walletBalance: action.payload,
      };
    case ActionTypes.ALLCOUPAN:
      return {
        ...state,
        allCoupan: action.payload,
      };
    case ActionTypes.APPLYCOUPAN:
      return {
        ...state,
        applyCoupan: action.payload,
      };
    case ActionTypes.MASTERCATEGORY:
      return {
        ...state,
        masterCategory: action.payload,
      };
    case ActionTypes.SUBCATEGORY:
      return {
        ...state,
        subCategoryData: action.payload,
      };
    case ActionTypes.SUBCATEGORYITEMS:
      return {
        ...state,
        subCategoryItemsData: action.payload,
      };
    case ActionTypes.SELECTEDMASTERCATEGORY:
      return {
        ...state,
        selectedMasterCategory: action.payload,
      };
    case ActionTypes.SELECTEDSUBCATEGORY:
      return {
        ...state,
        selectedSubCategory: action.payload,
      };
    case ActionTypes.SUBCATEGORYITEMPAGE:
      return {
        ...state,
        subCategoryItemsPage: action.payload,
      };
    case ActionTypes.SUBCATEGORYITEMTOTALPAGE:
      return {
        ...state,
        subCategoryItemsTotalPage: action.payload,
      };
    case ActionTypes.ADD_SUBCATEGORYITEMS:
      return {
        ...state,
        subCategoryItemsData: [
          ...state.subCategoryItemsData,
          ...action.payload,
        ],
      };
    case ActionTypes.RECOMMENDED_TOTAL_PAGE:
      return {
        ...state,
        recommendedTotalPage: action.payload,
      };

    default:
      return state;
  }
};
