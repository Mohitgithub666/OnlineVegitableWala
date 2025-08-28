import * as ActionTypes from '../actionTypes';
import * as ApiClient from '../../apiFriend';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { BASE_URL_Seller } from '../../apiEndpoints/Base_Url';

export const OrderViewOrder = (storeId, saasId, page) => async (dispatch, getState) => {
    // console.log("ProductAction_props", storeId, saasId,)

    try {
        // const endUrl = `${BASE_URL}search/recommended-item/${storeId}/${saasId}/${page}`;
        const endUrl = `${BASE_URL_Seller}order/view-order/${saasId}/${storeId}`;
        // console.log(endUrl)

        const headers = {};
        const method = 'GET';
        let response = await ApiClient.ApiRequest(endUrl, method, headers);

        // console.log('OrderViewOrder_resp', response?.data);
        if (response?.status && response?.data?.length > 0) {
            // console.log("more then one")
            await dispatch({
                type: ActionTypes.ORDERVIEWORDER,
                payload: response?.data,
            });

        }

        return response;
    } catch (error) {
        showMessage({
            message: "Network Error " `${error}`,
            type: "danger",
        })
    }

};
export const OrderViewOrderOne = (storeId, saasId, order_id) => async (dispatch, getState) => {
    // console.log("OrderViewOrderOne", storeId, saasId,order_id)

    try {
        // const endUrl = `http://3.7.230.172:8088/test/api/v1/order/view-order-detail-web/80001/8/47217`
        const endUrl = `${BASE_URL_Seller}order/view-order-detail-web/${storeId}/${saasId}/${order_id}`;
        // console.log(endUrl)

        const headers = {};
        const method = 'GET';
        let response = await ApiClient.ApiRequest(endUrl, method, headers);

        // console.log('OrderViewOrderOne_res/p', response?.data);
        if (response?.status) {
            // console.log("more then one")
            await dispatch({
                type: ActionTypes.ORDERVIEWORDERONE,
                payload: response?.data,
            });

        }

        return response;
    } catch (error) {
        showMessage({
            message: "Network Error " `${error}`,
            type: "danger",
        })
    }

};

export const GetOrderMasterDetails = (storeId, saasId, order_id) => async (dispatch, getState) => {
    // console.log("GetOrderMasterDetails", storeId, saasId, order_id)



    try {
        // const endUrl = `http://3.7.230.172:8088/test/api/v1/order/get-ordermaster-details/8/80001/44896`;
        const endUrl = `${BASE_URL_Seller}order/get-ordermaster-details/${saasId}/${storeId}/${order_id}`;
        // const endUrl = `${BASE_URL_Seller}order/get-ordermaster-details/${saasId}/${storeId}/44896`;
        // console.log(endUrl)

        const headers = {};
        const method = 'GET';
        let response = await ApiClient.ApiRequest(endUrl, method, headers);

        // console.log('GetOrderMasterDetails_Resp', response?.data);
        if (response?.status) {
            // console.log("more then one")
            await dispatch({
                type: ActionTypes.GETORDERMASTERDETAILSTYPE,
                payload: response?.data,
            });

        }

        return response;
    } catch (error) {
        showMessage({
            message: "Network Error " `${error}`,
            type: "danger",
        })
    }

};


export const GetCustomerAddress = (storeId, saasId, address_id) => async (dispatch, getState) => {
    // console.log("GetCustomerAddress", storeId, saasId, customer_id)

    try {
        // const endUrl = `http://3.7.230.172:8088/test/api/v1/customer/get-address/8/80001/44480`;
        const endUrl = `${BASE_URL_Seller}customer/get-address/${saasId}/${storeId}/${address_id}`;
        // console.log(endUrl)

        const headers = {};
        const method = 'GET';
        let response = await ApiClient.ApiRequest(endUrl, method, headers);

        // console.log('GetCustomerAddress_rep', response);
        if (response?.status) {
            // console.log("more then one"),
            await dispatch({
                type: ActionTypes.CUSTMOREADDRESSID,
                payload: response?.data,
            });

        }

        return response;
    } catch (error) {
        showMessage({
            message: "Network Error " `${error}`,
            type: "danger",
        })
    }

};


export const SaveTransaction = (data,) => async (dispatch, getState) => {
    // console.log("SaveTransaction", data)



    try {
        const endUrl = `http://3.7.230.172:8088/test/api/v1/transaction/save-transaction`;
        // console.log(endUrl)

        const headers = {};
        const body = data;
        const method = 'Post';
        let response = await ApiClient.ApiRequest(endUrl, method, headers, body);

        // console.log('SaveTransaction_resp', response);
        if (response?.status) {
          
        }

        return response?.data?.pdf_file_name;
    } catch (error) {
        showMessage({
            message: "Network Error " `${error}`,
            type: "danger",
        })
    }

};






export const GenratePDf = (data) => async (dispatch, getState) => {
    try {
        const endUrl = `http://3.7.230.172:8088/test/api/v1/transaction/pdf/Hy7eUopWF80nigta`;

        const headers = {};
        const method = 'GET';

        const response = await axios({
            method,
            url: endUrl,
            headers,
            responseType: 'arraybuffer',
        });

        if (response.status === 200) {
            // Convert the response data to a Buffer
            const pdfBuffer = Buffer.from(response.data, 'binary');

            // Create a Blob from the Buffer
            const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });

            // Handle the Blob as needed
            // console.log(pdfBlob);

            // Now you can dispatch an action or perform other tasks with the PDF data
            // For example:
            // dispatch({
            //   type: 'PDF_RECEIVED',
            //   payload: pdfBlob,
            // });

            return pdfBlob;
        } else {
            showMessage({
                message: `Error: ${response.status}`,
                type: 'danger',
            });
        }
    } catch (error) {
        showMessage({
            message: `Network Error: ${error}`,
            type: 'danger',
        });
    }
};



export const AddSupplierMethod = (data) => async (dispatch) => {

    try {
        const endUrl = 'http://3.7.230.172:8088/test/api/v1/supplier/create';
        const headers = {};
        const method = 'post';

        const response = await axios.post(endUrl, data, { headers });

        // console.log('AddSupplierMethod_resp', response?.data);

        // Uncomment the code below if you want to dispatch an action based on the response
        if (response?.status) {
            // await dispatch({
            //     type: ActionTypes.CUSTMOREADDRESSID,
            //     payload: response?.data,
            // });
            showMessage({
                message: `${response?.data?.message}`,
                type: 'success',
            });
        }

        return response.data;
    } catch (error) {
        // console.error('Network Error:', error);
        showMessage({
            message: `Network Error ${error}`,
            type: 'danger',
        });
        return null; // or handle the error as needed
    }
};


export const GetSupplierListMethod = (storeId, saasId, supplierPage) => async (dispatch, getState) => {
    // console.log("GetSupplierListMethod", storeId, saasId, supplierPage)
    const { supplierList } = getState()?.seller
    // console.log('GetSupplierListMethod_state',supplierList)

    try {
        // const endUrl = `http://3.7.230.172:8088/test/api/v1/supplier/get-supplier-details/7/70001/1`;
        const endUrl = `${BASE_URL_Seller}supplier/get-supplier-details/${saasId}/${storeId}/${supplierPage}`;
        // console.log(endUrl)

        const headers = {};
        const method = 'GET';
        let response = await ApiClient.ApiRequest(endUrl, method, headers);
        // console.log('GetSupplierListMethod_rep', response?.data.length);

        if (response?.status) {

            if (response?.data.length === 0) {
                // console.log("Zero")

                showMessage({
                    message: "No Data Available",
                    type: "danger",
                })
            } else if (supplierPage === 1) {
                // console.log("one item in array")
                await dispatch({
                    type: ActionTypes.SUPPLIERLIST,
                    payload: response?.data,
                });

            } else {

                // console.log("more then two")

                await dispatch({
                    type: ActionTypes.SUPPLIERLIST,
                    payload: [...supplierList, ...(response?.data || [])],
                });

            }


        } else {
            if (response?.status == false) {
                showMessage({
                    message: "No More Pages",
                    type: "danger",
                })

            }
        }

        return response;
    } catch (error) {
        showMessage({
            message: "Network Error " `${error}`,
            type: "danger",
        })
    }

};
