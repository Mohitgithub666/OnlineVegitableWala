import { View, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Cartget,
  CategoryAction,
  CategoryItems,
  getAddresData,
  GetDelivryChargesMethod,
  GetMasterCategory,
  GetMinOrderValueMethod,
  getUom,
  ProductAction,
  ViewOrderMethod,
} from '../redux/actions/UserAction';
import HomeHeader from '../Components/HomeHeader';
import { scale } from '../styles/responsiveSize';
import RecommendedCompo from '../Components/RecommendedCompo';
import * as ActionTypes from '../redux/actionTypes';

const Home = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const product = useSelector(state => state?.auth?.data?.customer_data);
  const userId = product?.id;
  const productData = useSelector(state => state?.product?.data);
  const productPage = useSelector(state => state?.product?.productPage);
  const selectedcategoryItems = useSelector(
    state => state?.product?.selectedcategoryItems,
  );
  const categoryItemsPagee = useSelector(
    state => state?.product?.categoryItemsPage,
  );
  const addressesReddux = useSelector(state => state?.product?.addresses);
  const customerDataId = product?.id;
  const selectedAddressRedux = useSelector(
    state => state?.product?.selectedAddres,
  );

  useEffect(() => {
    getCategory();
    getaddressDataFunct();
  }, []);

  useEffect(() => {
    if (selectedcategoryItems !== null) {
      getCategoryItem();
    }
  }, [selectedcategoryItems, categoryItemsPagee]);

  useEffect(() => {
    getCartData();
  }, []);

  useEffect(() => {
    getViewOrders();
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    getMasterCategory();
  }, []);

  const getMasterCategory = async () => {
    const respLength = await dispatch(GetMasterCategory());
    if (respLength && respLength?.length > 0) {
    }
    dispatch(GetDelivryChargesMethod());
    dispatch(GetMinOrderValueMethod());
  };

  const getCategory = async () => {
    const respLength = await dispatch(
      CategoryAction(product?.storeId, product?.saasId),
    );
    if (respLength && respLength?.length > 0) {
      dispatch({
        type: ActionTypes.SELECTEDCATEGORYITEMS,
        payload: respLength[0]?.category_name,
      });
    }
    dispatch(GetDelivryChargesMethod());
    dispatch(GetMinOrderValueMethod());
    dispatch(getUom());
  };

  const getCategoryItem = () => {
    dispatch(
      CategoryItems(
        product?.storeId,
        product?.saasId,
        selectedcategoryItems,
        categoryItemsPagee,
      ),
    );
  };

  const handleLoadMore = async () => {
    dispatch(ProductAction(product?.storeId, product?.saasId, productPage));
    await dispatch({
      type: ActionTypes.PRODUCTPAGE,
      payload: productPage + 1,
    });
  };

  const getProduct = async () => {
    dispatch(ProductAction(product?.storeId, product?.saasId, 1));
    await dispatch({
      type: ActionTypes.PRODUCTPAGE,
      payload: productPage + 1,
    });
  };

  const getViewOrders = () => {
    dispatch(ViewOrderMethod(product?.storeId, product?.saasId, userId));
  };

  const getCartData = () => {
    dispatch(Cartget(product?.saasId, product?.storeId, product?.id));
  };

  const getaddressDataFunct = () => {
    dispatch(
      getAddresData(
        product?.saasId,
        product?.storeId,
        customerDataId,
        selectedAddressRedux,
        addressesReddux,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <HomeHeader />
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={30} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.RecommendedCompoStyle}>
            <RecommendedCompo
              productData={productData}
              handleLoadMore={handleLoadMore}
            />
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  title: {
    alignSelf: 'flex-start',
    marginLeft: scale(10),
    fontSize: scale(16),
    fontWeight: 'bold',
    color: 'balck',
  },
  homeSlider: {
    height: scale(200),
    width: '100%',
    marginTop: 2,
    backgroundColor: '#FFF',
  },
  categoryDataStyle: {
    marginHorizontal: scale(8),
    marginVertical: 5,
    backgroundColor: '#FFF',
  },
  categoryItemDataStyle: {
    flex: 1,
    marginTop: scale(5),
    backgroundColor: '#FFF',
  },
  RecommendedCompoStyle: {
    flex: 1,
    marginTop: 5,
  },
});

export default Home;
