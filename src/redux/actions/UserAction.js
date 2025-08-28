import * as ActionTypes from '../actionTypes';
import * as ApiClient from '../../apiFriend';
import { showToast, showToastWithGravity } from '../../styles/utils/toast';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { BASE_URL } from '../../apiEndpoints/Base_Url';
import { saveDataInDB } from '../../styles/utils/commonFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProductAction =
  (storeId, saasId, page) => async (dispatch, getState) => {
    const internalState = getState().product.data;
    const recommendedTotalPage = getState().product?.recommendedTotalPage;

    try {
      const endUrl = `${BASE_URL}search/recommended-item/${storeId}/${saasId}/${page}`;
      const headers = {};
      const method = 'GET';
      let response = await ApiClient.ApiRequest(endUrl, method, headers);
      console.log('ProductAction_Resp', endUrl, response?.data?.length);

      if (response?.status) {
        if (page == 1) {
          await dispatch({
            type: ActionTypes.PRODUCT,
            payload: response?.data,
          });
          const totalPage = Math.round(response?.count / 12);
          console.log('totalPage', totalPage);
          if (typeof response?.count === 'number') {
            await AsyncStorage.setItem('TOTALPAGE', JSON.stringify(totalPage));
            await dispatch({
              type: ActionTypes.RECOMMENDED_TOTAL_PAGE,
              payload: totalPage,
            });
          }
        } else {
          const totalPage = await AsyncStorage.getItem('TOTALPAGE');
          if (recommendedTotalPage < Number(totalPage) + 1) {
            await dispatch({
              type: ActionTypes.PRODUCT,
              payload: [...internalState, ...(response?.data || [])],
            });
          } else {
            showToast('no more data');
          }
        }
      }
      return response;
    } catch (error) {
      showMessage({
        message: 'Network Error '`${error}`,
        type: 'danger',
      });
    }
  };

export const CategoryAction = (storeId, saasId) => async dispatch => {
  try {
    endUrl = `${BASE_URL}category/get-list/${saasId}/${storeId}`;
    const headers = {};
    const method = 'GET';
    let response = await ApiClient.ApiRequest(endUrl, method, headers);
    // console.log("CategoryAction_resp", response)
    if (response?.status) {
      await dispatch({
        type: ActionTypes.CATEGORY,
        payload: response?.data,
      });
    }
    return response?.data;
  } catch (error) {
    showToast('Network Error');
  }
};

export const GetMasterCategory = () => async (dispatch, getState) => {
  const { id, storeId, saasId } = getState()?.auth?.data?.customer_data;

  try {
    endUrl = `${BASE_URL}Master-category/get-list-master/${saasId}/${storeId}`;
    const headers = {};
    const method = 'GET';
    let response = await ApiClient.ApiRequest(endUrl, method, headers);
    // console.log('GetMasterCategory_resp', endUrl, response);

    if (response?.status) {
      await dispatch({
        type: ActionTypes.MASTERCATEGORY,
        payload: response?.data,
      });
    }
    return response?.data;
  } catch (error) {
    showToast('Network Error');
  }
};

export const GetSubCategory =
  masterCategoryId => async (dispatch, getState) => {
    const { id, storeId, saasId } = getState()?.auth?.data?.customer_data;

    try {
      endUrl = `${BASE_URL}Master-category/get-list/${saasId}/${storeId}/${masterCategoryId}`;
      const headers = {};
      const method = 'GET';
      let response = await ApiClient.ApiRequest(endUrl, method, headers);

      if (response?.status) {
        await dispatch({
          type: ActionTypes.SUBCATEGORY,
          payload: response?.data,
        });
      }
      return response;
    } catch (error) {
      showToast('Network Error');
    }
  };

//CustomerSide

//calculate number of pages
function calculateNumberOfPages(totalItems, itemsPerPage) {
  return Math.ceil(totalItems / itemsPerPage);
}

export const SubCategoryItems =
  (categoryName, categoryItemPage = '1') =>
    async (dispatch, getState) => {
      const { id, storeId, saasId } = getState()?.auth?.data?.customer_data;
      const { subCategoryItemsPage, subCategoryItemsData } = getState().product;

      try {
        endUrl = `${BASE_URL}item/get-category-list/${saasId}/${storeId}/${categoryName}/${subCategoryItemsPage}`;
        const headers = {};
        const method = 'GET';
        let response = await ApiClient.ApiRequest(endUrl, method, headers);

        if (response?.status) {
          if (subCategoryItemsPage == 1) {
            await dispatch({
              type: ActionTypes.SUBCATEGORYITEMS,
              payload: response?.data,
            });

            const numberOfPages = calculateNumberOfPages(response?.count, 12);

            await dispatch({
              type: ActionTypes.SUBCATEGORYITEMTOTALPAGE,
              payload: numberOfPages,
            });
          } else {
            if (response?.data?.length > 0) {
              await dispatch({
                type: ActionTypes.ADD_SUBCATEGORYITEMS,
                payload: response?.data,
              });
            } else {
              await dispatch({
                type: ActionTypes.ADD_SUBCATEGORYITEMS,
                payload: subCategoryItemsData,
              });
              showToast('No More Data');
            }
          }
        } else {
          await dispatch({
            type: ActionTypes.SUBCATEGORYITEMS,
            payload: [],
          });
        }
        return response;
      } catch (error) {
        showToastWithGravity('Network Error');
      }
    };

export const CategoryItems =
  (storeId, saasId, categoryName, categoryItemPage) =>
    async (dispatch, getState) => {
      const CategoryItemsState = getState().product.categoryItems;

      try {
        endUrl = `${BASE_URL}item/get-category-list/${saasId}/${storeId}/${categoryName}/${categoryItemPage}`;
        const headers = {};
        const method = 'GET';
        let response = await ApiClient.ApiRequest(endUrl, method, headers);

        if (response?.status) {
          if (categoryItemPage === 1) {
            await dispatch({
              type: ActionTypes.CATEGORYITEMS,
              payload: response?.data,
            });
            if (response?.next == null) {
              await dispatch({
                type: ActionTypes.NOCATEGORYDATA,
                payload: true,
              });
            }
          } else {
            if (response?.next == null) {
              await dispatch({
                type: ActionTypes.NOCATEGORYDATA,
                payload: true,
              });
            } else {
              await dispatch({
                type: ActionTypes.CATEGORYITEMS,
                payload: [...CategoryItemsState, ...(response?.data || [])],
              });
            }
          }
        } else if (response?.data?.length == undefined) {
          showToast('No  data in this category');
        }
        return response;
      } catch (error) {
        showToast('Network Error');
      }
    };

export const Addtocartaction =
  (data, saasId, storeId, id) => async dispatch => {
    // console.log('Addtocartaction_arguments', data, saasId, storeId, id);

    try {
      const endUrl = `${BASE_URL}price-check/addvegetableproduct/${saasId}/${storeId}/${id}`;
      const headers = {};
      const body = data;
      const method = 'POST';
      let response = await ApiClient.ApiRequest(endUrl, method, headers, body);
      console.log(
        'Add to cart_Response',
        endUrl,
        'body>>>>',
        body,
        'response>>>>',
        response,
      );

      if (response?.status) {
        await dispatch({
          type: ActionTypes.ADDTOCART,
          payload: response?.data,
        });
        showMessage({
          message: 'Item added in cart',
          type: 'success',
        });
      }
      return response;
    } catch (error) {
      showToast('Network Error');
    }
  };

export const carItemQuantityCheckMethod =
  cardId => async (dispatch, getState) => {
    const { id, storeId, saasId } = getState()?.auth?.data?.customer_data;

    try {
      const endUrl = `${BASE_URL}item/cart_item_quant_check/${storeId}/${cardId}`;

      const headers = {};
      const method = 'get';
      let response = await ApiClient.ApiRequest(endUrl, method, headers);
      // console.log('carItemQuantityCheckMethod resposnee', response, endUrl);

      if (response) {
      }
      return response;
    } catch (error) {
      showToast('Network Error');
    }
  };

export const Cartget = (saasId, storeId, id) => async dispatch => {
  try {
    const endUrl = `${BASE_URL}price-check/getcart/${saasId}/${storeId}/${id}`;
    const headers = {};
    const method = 'GET';
    let response = await ApiClient.ApiRequest(endUrl, method, headers);
    // console.log('getcart_resp', endUrl, 'response>>>>>>', response);

    if (response?.status) {
      await dispatch({
        type: ActionTypes.CART,
        payload: response,
      });
    }
    return response;
  } catch (error) {
    showToast('Network Error');
  }
};

export const DeleteAllItemCartMethod =
  (saasId, storeId, id, check) => async dispatch => {
    try {
      const endUrl = `${BASE_URL}price-check/delete-all-products/${saasId}/${storeId}/${id}`;
      const headers = {};
      const method = 'delete';
      let response = await ApiClient.ApiRequest(endUrl, method, headers);

      if (response?.status) {
        await dispatch({
          type: ActionTypes.CART,
          payload: response,
        });
        await dispatch({
          type: ActionTypes.APPLYCOUPAN,
          payload: {},
        });
      }
      return response;
    } catch (error) {
      showToast('Network Error');
    }
  };

export const removecart = (saasId, storeId, id, itemId) => async dispatch => {
  try {
    const endUrl = `${BASE_URL}price-check/deleteproduct/${saasId}/${storeId}/${id}/${itemId}`;
    const headers = {};
    const body = {};
    const method = 'DELETE';
    let response = await ApiClient.ApiRequest(endUrl, method, headers, body);
    if (response?.status) {
      await dispatch({
        type: ActionTypes.REMOVEFROMCART,
        payload: response?.data,
      });
      showMessage({
        message: 'Cart item Deleted',
        type: 'success',
      });
    }
    return response;
  } catch (error) {
    showToast('Network Error');
  }
};

export const updatecartAction =
  (qty, saasId, storeId, id, itemId) => async (dispatch, getState) => {
    // const {id, storeId, saasId} = getState()?.auth?.data?.customer_data;
    console.log('qty, itemId', qty, saasId, storeId, id, itemId);

    try {
      const endUrl = `${BASE_URL}price-check/updatevegetableproduct/${qty}/${saasId}/${storeId}/${id}/${itemId}`;
      const headers = {};
      const body = {};
      const method = 'PUT';
      let response = await ApiClient.ApiRequest(endUrl, method, headers, body);
      console.log('updatecartAction Resp', endUrl, response?.data?.products);

      if (response?.status) {
        await dispatch(Cartget(saasId, storeId, id));
      }
      return response?.status;
    } catch (error) {
      showToast('Network Error');
    }
  };

export const GenrateOrderIdAction = data => async dispatch => {
  try {
    const endUrl = `${BASE_URL}rezar/pay/${data}`;
    const headers = {};
    const body = data;
    const method = 'POST';
    let response = await ApiClient.ApiRequest(endUrl, method);
    if (response?.status) {
    }
    return response;
  } catch (error) {
    showToast('Network Error');
  }
};

export const VeriFyPaymentAction = data => async dispatch => {
  try {
    const endUrl = `${BASE_URL}rezar/verification`;
    const headers = {
      'Content-Type': 'application/json', // Specify JSON content type
    };

    const body = JSON.stringify(data); // Stringify the data object
    const method = 'POST';
    let response = await ApiClient.ApiRequest(endUrl, method, headers, body); // Pass headers to the API request

    return response;
  } catch (error) {
    showToast('Network Error');
  }
};

export const PaymentAction =
  (data, paymentMode, isEnabled, walleteValue) =>
    async (dispatch, getState) => {
      const { id, storeId, saasId } = getState()?.auth?.data?.customer_data;
      const { discount } = getState()?.product.applyCoupan;

      try {
        const endUrl = `${BASE_URL}order/create/order/master`;
        const headers = {};
        const body = data;
        const method = 'POST';
        let response = await ApiClient.ApiRequest(endUrl, method, headers, body);

        if (response?.status) {
          await dispatch({
            type: ActionTypes.PAYMENT,
            payload: response?.data,
          });
          await dispatch({
            type: ActionTypes.CART,
            payload: null,
          });
          showMessage({
            message: 'Order Succesfully Done',
            type: 'success',
          });

          if (paymentMode !== 'COD') {
            if (isEnabled) {
              dispatch(WalletUpdateMethod(walleteValue));
            }

            if (discount > 0) {
              dispatch(UpdateCoupanMethod());
            }
            // if (isEnabled && discount > 0) {
            await dispatch(
              DeleteAllItemCartMethod(
                saasId,
                storeId,
                id,
                (check = 'allCondition delete'),
              ),
            );

            // }
          } else {
            await dispatch(
              DeleteAllItemCartMethod(saasId, storeId, id, (check = 'else')),
            );
          }
        }
        return response;
      } catch (error) {
        showToast('Network Error');
      }
    };

export const ViewOrderMethod = userId => async (dispatch, getState) => {
  const { id, storeId, saasId } = getState()?.auth?.data?.customer_data;
  try {
    const endUrl = `${BASE_URL}order/view-order-detail-app/${storeId}/${saasId}/${id}`;
    const headers = {};
    const method = 'get';
    let response = await ApiClient.ApiRequest(endUrl, method, headers);
    console.log('response', response?.data);

    if (response?.status) {
      await dispatch({
        type: ActionTypes.VIEWORDERHISTORY,
        payload: response?.data,
      });
    }
    return response?.data;
  } catch (error) {
    showMessage({
      message: 'Network Error'`${error}`,
      type: 'danger',
    });
  }
};

export const GetWalletMethod = userId => async (dispatch, getState) => {
  const { id, storeId, saasId } = getState()?.auth?.data?.customer_data;

  try {
    const endUrl = `${BASE_URL}wallet/get-wallet-bywalletid/${id}`;

    const headers = {};
    const method = 'get';
    let response = await ApiClient.ApiRequest(endUrl, method, headers);
    if (response?.status) {
      await dispatch({
        type: ActionTypes.WALLETBALANCE,
        payload: response?.data,
      });
    }
    return response?.data;
  } catch (error) {
    showToast('Network Error');
  }
};

export const WalletUpdateMethod = data => async (dispatch, getState) => {
  const { id, storeId, saasId } = getState()?.auth?.data?.customer_data;
  const { wallet_id, balance } = getState()?.product?.walletBalance;

  try {
    const endUrl = `${BASE_URL}wallet/update-wallet-balance/${wallet_id}/${data}`;

    const headers = {};
    const method = 'PUT';
    let response = await ApiClient.ApiRequest(endUrl, method, headers);

    if (response?.status) {
      await dispatch({
        type: ActionTypes.WALLETBALANCE,
        payload: response?.data,
      });
      await dispatch(
        DeleteAllItemCartMethod(saasId, storeId, id, (check = 'updateWallet')),
      );
    }
    return response?.data;
  } catch (error) {
    showToast('Network Error');
  }
};

export const ViewOrderDetailsMethod =
  (storeId, saasId, orderId) => async (dispatch, getState) => {
    const { id } = getState()?.auth?.data?.customer_data;

    try {
      const endUrl = `${BASE_URL}order/get-order-details-list/${saasId}/${storeId}/${orderId}`;
      const headers = {};
      const method = 'get';
      let response = await ApiClient.ApiRequest(endUrl, method, headers);
      // console.log('ViewOrderDetailsMethod_resp', endUrl);

      if (response?.status) {
        await dispatch({
          type: ActionTypes.VIEWORDERDETAILSLIST,
          payload: response?.data?.order_sub_details,
        });
      }
      return response;
    } catch (error) {
      showToast('Network Error');
    }
  };

export const canclePendingOrderMethod =
  orderId => async (dispatch, getState) => {
    const { id, storeId, saasId } = getState()?.auth?.data?.customer_data;
    try {
      const endUrl = `${BASE_URL}order/update-status/${storeId}/${saasId}/${orderId}/cancel`;

      const headers = {};
      const method = 'PUT';
      let response = await ApiClient.ApiRequest(endUrl, method, headers);

      if (response?.status) {
        await dispatch(ViewOrderMethod());
      }
      return response;
    } catch (error) {
      showToast('Network Error');
    }
  };

export const returnOrderMethod = orderId => async (dispatch, getState) => {
  const { id, storeId, saasId } = getState()?.auth?.data?.customer_data;

  try {
    const endUrl = `${BASE_URL}order/update-status/${storeId}/${saasId}/${orderId}/return`;
    const headers = {};
    const method = 'PUT';
    let response = await ApiClient.ApiRequest(endUrl, method, headers);

    if (response?.status) {
      await dispatch(ViewOrderMethod());
      showMessage({
        message: `Your return request done`,
        type: 'success',
      });
    }
    return response;
  } catch (error) {
    showToast('Network Error');
  }
};

export const searchItemMethod = (storeId, saasId, search) => async dispatch => {
  try {
    const endUrl = `${BASE_URL}search/get-result/${storeId}/${saasId}/${search}`;
    const headers = {};
    const method = 'get';
    let response = await ApiClient.ApiRequest(endUrl, method, headers);

    if (response?.status) {
      await dispatch({
        type: ActionTypes.ITEMSEARCH,
        payload: response?.data,
      });
    }

    return response;
  } catch (error) {
    showToast('Network Error');
  }
};

export const getAddresData =
  (saasId, storeId, selectedAddressRedux, addressesReddux) =>
    async (dispatch, getState) => {
      const { id } = getState()?.auth?.data?.customer_data;

      const endUrl = `${BASE_URL}customer/get-all-customer-address-app/${id}/${saasId}/${storeId}`;

      try {
        const response = await axios.get(endUrl);
        const addressArray = response?.data?.data;

        if (response.status == 200) {
          dispatch({
            type: ActionTypes.ADDRRESS,
            payload: addressArray,
          });
        }

        if (addressArray.length == 0) {
          dispatch({
            type: ActionTypes.SELECTEDADDRRES,
            payload: null,
          });
        } else if (addressArray.length == 1) {
          dispatch({
            type: ActionTypes.SELECTEDADDRRES,
            payload: addressArray[0],
          });
        } else if (addressArray.length > 1) {
          dispatch({
            type: ActionTypes.SELECTEDADDRRES,
            payload: addressArray[0],
          });
        }
      } catch (error) {
        showToast('Network Error');
      }
    };

export const setFcmTokenAction = (userId, data) => async dispatch => {
  try {
    const headers = {};
    const body = data;
    const method = 'POST';
    const endUrl = `${BASE_URL}customer/save-Fmc-Token/${userId}/${body}`;

    let response = await ApiClient.ApiRequest(endUrl, method, headers, body);

    return response;
  } catch (error) {
    showMessage({
      message: error,
      type: 'danger',
    });
  }
};

/////

export const getAbout = () => async (dispatch, getState) => {
  const { id, storeId, saasId } = getState()?.auth?.data?.customer_data;

  try {
    const endUrl = `${BASE_URL}store-master/get-store_aboutUs/${saasId}/${storeId}`;
    const headers = {};
    const method = 'get';
    let response = await ApiClient.ApiRequest(endUrl, method, headers);

    return response;
  } catch (error) {
    showToast('Network Error');
  }
};

export const GetDelivryChargesMethod = () => async (dispatch, getState) => {
  const { id, storeId, saasId } = getState()?.auth?.data?.customer_data;
  const store_per_id = getState()?.auth?.data?.store_per_id;
  // console.log("GetDelivryChargesMethod_data",id,storeId,saasId,store_per_id)

  try {
    const method = 'GET';
    const headers = {};
    const endUrl = `${BASE_URL}store-master/get-delivery-charges/${store_per_id}/${saasId}/${storeId}`;
    try {
      const response = await ApiClient.ApiRequest(endUrl, method, headers);

      if (response?.status === true) {
        await dispatch({
          type: ActionTypes.DELIVERYCHARGES,
          payload: response?.data?.deliver_charges,
        });
        return response?.status;
      } else {
        showToast('Error fetching delivery charges data');
      }

      return response;
    } catch (error) {
      showToast('Error fetching delivery charges data');
    } finally {
    }
  } catch (error) {
    showToast('Error fetching delivery charges data');
  }
};

export const GetMinOrderValueMethod = () => async (dispatch, getState) => {
  const { id, storeId, saasId } = getState()?.auth?.data?.customer_data;
  const store_per_id = getState()?.auth?.data?.store_per_id;

  try {
    const method = 'GET';
    const headers = {};
    const endUrl = `${BASE_URL}store-master/get-minimum-order-value/${store_per_id}/${saasId}/${storeId}`;

    try {
      const response = await ApiClient.ApiRequest(endUrl, method, headers);
      if (response?.status === true) {
        await dispatch({
          type: ActionTypes.MINIMUMORDERVALUE,
          payload: response?.data?.minimum_order_response,
        });

        return response?.data?.minimum_order_response;
      } else {
        showToast('Error fetching minimum charges data');
      }
    } catch (error) {
      showToast('Error fetching minimum charges data');
    } finally {
    }
  } catch (error) {
    showToast('Error fetching minimum charges data');
  }
};

export const GetAllCoupanMethod = () => async (dispatch, getState) => {
  const { id, storeId, saasId } = getState()?.auth?.data?.customer_data;
  const { cart_id } = getState()?.product?.cart?.data;

  const store_per_id = getState()?.auth?.data?.store_per_id;
  // console.log("GetAllCoupanMethod_data",cart_id)

  try {
    const method = 'GET';
    const headers = {};
    const endUrl = `${BASE_URL}coupon/get-all-coupon/${storeId}/${cart_id}`;

    try {
      const response = await ApiClient.ApiRequest(endUrl, method, headers);
      if (response?.status == true) {
        await dispatch({
          type: ActionTypes.ALLCOUPAN,
          payload: response?.data,
        });

        return response;
      } else {
        showToast(response?.message);
      }
    } catch (error) {
      showToast('Error fetching GetAllCoupanMethod');
    } finally {
    }
  } catch (error) {
    showToast('Error fetching GetAllCoupanMethod');
  }
};

export const ApplyCoupanMethod = data => async (dispatch, getState) => {
  const { id, storeId, saasId } = getState()?.auth?.data?.customer_data;
  const { cart_id } = getState()?.product?.cart?.data;

  try {
    const method = 'GET';
    const headers = {};
    const endUrl = `${BASE_URL}coupon/applyCoupon/${cart_id}/${storeId}/${id}/${data}`;

    try {
      const response = await ApiClient.ApiRequest(endUrl, method, headers);
      console.log('ApplyCoupanMethod_resp', endUrl, response);
      if (response?.status == true) {
        await dispatch({
          type: ActionTypes.APPLYCOUPAN,
          payload: response?.data,
        });

        await dispatch(Cartget(saasId, storeId, id));
        showToast(response?.message);

        return response;
      } else {
        showToast(response?.message);
      }
    } catch (error) {
      showToast('Error fetching ApplyCoupanMethod');
    } finally {
    }
  } catch (error) {
    showToast('Error fetching mApplyCoupanMethod');
  }
};

export const UpdateCoupanMethod = () => async (dispatch, getState) => {
  const { id, storeId, saasId } = getState()?.auth?.data?.customer_data;
  const { discount, new_amount, total_amount } = getState()?.product.applyCoupan;
  const { couponCode, category } = getState()?.product.applyCoupan?.Coupon;

  console.log(
    'UpdateCoupanMethod_data',
    discount,
    new_amount,
    total_amount,
    couponCode,
    category,
  );

  try {
    const method = 'PUT';
    const headers = {};
    const endUrl = `${BASE_URL}coupon/updateCouponStatus/${id}/${couponCode}`;

    try {
      const response = await ApiClient.ApiRequest(endUrl, method, headers);

      if (response?.status == true) {
        await dispatch(
          DeleteAllItemCartMethod(
            saasId,
            storeId,
            id,
            (check = 'update Coupan'),
          ),
        );

        return response;
      } else {
        showToast(response?.message);
      }
    } catch (error) {
      showToast('Error fetching UpdateCoupanMethod');
    } finally {
    }
  } catch (error) {
    showToast('Error fetching UpdateCoupanMethod');
  }
};

export const getUom = () => async (dispatch, getState) => {
  const { id, storeId, saasId } = getState()?.auth?.data?.customer_data;

  try {
    endUrl = `${BASE_URL}omni/get-uom/${saasId}/${storeId}`;
    const headers = {};
    const method = 'GET';
    let response = await ApiClient.ApiRequest(endUrl, method, headers);
    // console.log("getUom_response", response?.data, endUrl)
    const uomArray = response?.data?.map(item => item.uomname);

    if (response?.status) {
      await saveDataInDB('UOM', uomArray);
    }
    return response?.data;
  } catch (error) {
    showToast('Network Error');
  }
};

///////////////
export const increaseQuantity = itemId => ({
  type: ActionTypes.INCREASE_QUANTITY,
  itemId,
});

export const decreaseQuantity = itemId => ({
  type: ActionTypes.DECREASE_QUANTITY,
  itemId,
});

export const addToCart = itemId => ({
  type: ActionTypes.ADD_TO_CART,
  itemId,
});


export const getStoreOnlineStatus = (storeId) => async (dispatch, getState) => {
  try {
    const endUrl = `${BASE_URL}store-master/get-online-status/${storeId}`;
    const headers = {};
    const method = 'GET';
    let response = await ApiClient.ApiRequest(endUrl, method, headers);

    if (response?.status) {
      await dispatch({
        type: ActionTypes.STORE_ONLINE_STATUS,
        payload: response?.data, 
      });
    }
    return response;
  } catch (error) {
    showToast('Network Error');
  }
};