import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList } from 'react-native-gesture-handler';
import { Regular } from '../Assets/FontFamily/FontConst';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import {
  ApplyCoupanMethod,
  Cartget,
  DeleteAllItemCartMethod,
  GetAllCoupanMethod,
  GetDelivryChargesMethod,
  removecart,
  updatecartAction,
  getStoreOnlineStatus
} from '../redux/actions/UserAction';
import Headers from '../Components/Headers';
import Buttons from '../Components/Buttons';
import commonStyles from '../styles/commonStyles';
import { scale, textScale } from '../styles/responsiveSize';
import Address from './Address';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import NoDataFound from '../Components/NoDataFound';
import { BASE_URL } from '../apiEndpoints/Base_Url';
import { showMessage } from 'react-native-flash-message';
import MyImgCompo from '../Components/MyImgCompo';
import Paymentscreen from './Paymentscreen';
import ListModal from '../Components/ListModal';
import { showToast } from '../styles/utils/toast';
import store from '../redux/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = ({ navigation }) => {
  const colors = useTheme().colors;
  const data = useSelector(state => state?.product.cart);
  const selectedAddress = useSelector(state => state?.product?.selectedAddres);
  const dispatch = useDispatch();
  const product = useSelector(state => state?.auth?.data?.customer_data);
  const cartArray = useSelector(state => state?.product.cart?.data?.products);
  const cartCoupon = useSelector(state => state?.product.cart?.data);
  const { deliveryCharges } = useSelector(state => state?.product);
  const [couponLoder, setCoupanLoder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const allCoupan = useSelector(state => state?.product?.allCoupan);
  const accessToken = useSelector(state => state?.auth?.data?.jwt_response);

  const handleOpenModal = () => {
    if (allCoupan?.length > 0) {
      setModalVisible(true);
    } else {
      showToast('Coupon Not Available');
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSelectItem = async item => {
    await applyCoupon(item?.couponCode);
    handleCloseModal();
  };

  useFocusEffect(
    useCallback(() => {
      getCartData();
    }, []),
  );
  useFocusEffect(
    useCallback(() => {
      const totalDifference = calculateTotalDifference();
    }, []),
  );
  const calculateTotalDifference = () => {
    let totalDifference = 0;
    cartArray?.forEach(item => {
      const actualPrice = item?.actual_price;
      const price = item?.price;
    });
    return totalDifference;
  };
  const getCartData = async () => {
    await dispatch(Cartget(product?.saasId, product?.storeId, product?.id));
    await dispatch(GetAllCoupanMethod());
    const resp = await dispatch(GetDelivryChargesMethod());
    if (resp.status) {
      setDeliveryCharges(resp?.data?.deliver_charges);
    }
  };
  const deleteAllCartData = async () => {
    await dispatch(
      DeleteAllItemCartMethod(product?.saasId, product?.storeId, product?.id),
    );
  };

  const onDelete = async item => {
    const res = await dispatch(
      removecart(product?.saasId, product?.storeId, product?.id, item?.id),
    );

    if (res?.status) {
      await dispatch(Cartget(product?.saasId, product?.storeId, product?.id));
    } else {
      Alert.alert('Something went wrong');
    }
  };
  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const TextCompoForPrice = ({ totalInvoiceAmount }) => {
    return (
      <View
        style={{
          marginHorizontal: 18,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text
          style={[
            styles.price_Qntytitle,
            { fontSize: totalInvoiceAmount?.fontSize },
          ]}>
          {totalInvoiceAmount?.title}
        </Text>
        <Text
          style={[
            styles.price_Qntytitle,
            {
              color: totalInvoiceAmount?.color,
              fontWeight: totalInvoiceAmount?.fontWeight,
              fontSize: totalInvoiceAmount?.fontSize,
              textAlign: 'left',
            },
          ]}>
          ₹{totalInvoiceAmount?.total_invoice_amount}
        </Text>
      </View>
    );
  };

  const deliveryApply = deliveryCharges;
  const total = data?.total_gram_invoice_amount + deliveryApply;

  const dataArray = [
    {
      id: 1,
      total_invoice_amount: data?.total_gram_invoice_amount,
      title: 'Sub Total',
      color: '#000',
      fontWeight: '600',
      fontSize: 14,
    },
    {
      id: 2,
      total_invoice_amount: 0,
      title: 'Tax',
      color: '#000',
      fontWeight: '600',
      fontSize: 14,
    },
    {
      id: 3,
      total_invoice_amount: deliveryApply,
      title: 'Delivery Charges',
      color: '#000',
      fontWeight: '600',
      fontSize: 14,
    },
    {
      id: 4,
      total_invoice_amount: cartCoupon?.coupanPrice,
      title: 'Coupon',
      color: cartCoupon?.coupanPrice < 0 ? '#000' : 'green',
      fontWeight: '600',
      fontSize: 14,
    },
    {
      id: 5,
      total_invoice_amount: total - cartCoupon?.coupanPrice,
      // total,

      title: 'Total Payable',
      color: '#000',
      fontWeight: 'bold',
      fontSize: 18,
    },
  ];

  const sumOfDifferences = useMemo(() => {
    if (!data || !data.data || !data.data.products) {
      return 0;
    }

    return data.data.products.reduce((total, obj) => {
      if (obj.actual_price !== null) {
        const bill_qty = obj?.bill_qty == 0 ? 1 : obj.bill_qty;
        const difference = obj?.actual_price * bill_qty - obj.price;
        return total + difference;
      } else {
        return total;
      }
    }, 0);
  }, [data]); // data is the dependency

  const applyCoupon = async code => {
    setCoupanLoder(true);
    const resp = await dispatch(ApplyCoupanMethod(code));
    setCoupanLoder(false);
  };

  const onPressPlaceOrder = async () => {
    setIsLoading(true);
    const db = await AsyncStorage.getItem('STORE')
    const storeData = JSON.parse(db);
    console.log(storeData, 'storeData......')
    const resp = await dispatch(getStoreOnlineStatus(storeData?.storeId));
    console.log('res', resp.data)
    if (resp.data) {
      if (resp.data) {
        navigation.navigate(Paymentscreen);

      } else {
        // showToast(
        //   `${resp?.data[0]?.item_name} ${resp?.message} max quantity is ${resp?.data[0]?.opening_qty}`,
        // );
        showToast('Store is Close try again later after Store will Open')
        console.log(
          'true',
          `${resp?.data[0]?.item_name} ${resp?.message} current stock is ${resp?.data[0]?.opening_qty}`,
        );
      }
    }
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{}}>
        <Headers title="My Cart" quantity={cartArray?.length} />
      </View>

      {/* Address */}
      {accessToken == 'GUEST' ? null : (
        <View
          style={[
            {
              minHeight: scale(30),
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: colors.blackOpacity10,
            },
          ]}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text
              style={[
                commonStyles.fontBold24,
                {
                  fontSize: scale(14),
                  marginLeft: scale(8),
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  color: '#000',
                },
              ]}>
              Address-
            </Text>
            <Text
              style={[
                {
                  alignSelf: 'center',
                  maxWidth: scale(260),
                  flex: 1,
                  color: 'grey',
                },
              ]}
              numberOfLines={2}>
              {selectedAddress
                ? `${selectedAddress?.pincode}, ${selectedAddress?.address}`
                : 'No Address Selected'}
            </Text>
          </View>

          <View style={{ marginRight: scale(8) }}>
            {accessToken == 'GUEST' ? (
              <Buttons
                titel={'Login'}
                onPress={() => store.dispatch({ type: 'RESET' })}
                style={{ alignSelf: 'center', marginTop: scale(7) }}
                fontSize={16}
              />
            ) : (
              <Buttons
                titel={'Address'}
                onPress={() => navigation.navigate(Address)}
                style={{ alignSelf: 'center', marginTop: scale(7) }}
                fontSize={16}
              />
            )}
          </View>
        </View>
      )}

      {/* Cart Data */}
      {data?.data?.products?.length > 0 ? (
        <>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <FlatList
              data={data?.data?.products || []}
              extraData={data?.data?.products}
              renderItem={({ item }) => (
                <View style={{}}>
                  <View style={styles.flatlistContainer}>
                    <View style={styles.imageContainer}>
                      <MyImgCompo
                        imageUri={`${BASE_URL}item/get-image/${item.item_id}`}
                        resizeMode={'center'}
                        ImgCompoStyle={{ height: '100%', width: '100%' }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        flex: 1,
                        width: '100%',
                      }}>
                      <View style={{ flex: 1, width: '75%' }}>
                        <View
                          style={{
                            marginHorizontal: 8,
                          }}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 13,
                              fontWeight: '600',
                              color: 'black',
                            }}>
                            {capitalizeFirstLetter(item?.itemName)}
                          </Text>
                        </View>

                        <View
                          style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            marginHorizontal: 8,
                            paddingVertical: 4,
                          }}>
                          {item?.price == item?.actual_price ? (
                            <Text
                              numberOfLines={2}
                              style={{
                                fontSize: 14,
                                fontWeight: 400,
                                fontFamily: Regular,
                                textDecorationLine: 'line-through',
                                color: 'grey',
                              }}></Text>
                          ) : (
                            <Text
                              numberOfLines={2}
                              style={{
                                fontSize: 14,
                                fontWeight: 400,
                                fontFamily: Regular,
                                textDecorationLine: 'line-through',
                                color: 'grey',
                              }}>
                              {item?.actual_price > 0 ? ' Mrp ₹' : null}
                              {item?.actual_price > 0
                                ? item?.actual_price * item?.productQty
                                : ''}
                            </Text>
                          )}

                          <Text
                            numberOfLines={2}
                            style={{
                              fontSize: 16,
                              fontWeight: 600,
                              fontFamily: Regular,
                              color: '#000',
                            }}>
                            ₹{item?.new_price}
                          </Text>
                        </View>
                      </View>

                      <View style={{}}>
                        <View
                          style={{
                            borderColor: '#BFBFBF',
                            borderWidth: 1,
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            borderRadius: 10,
                            height: scale(58),
                          }}>
                          <View
                            style={{ marginLeft: scale(0), alignSelf: 'center' }}>
                            <TouchableOpacity
                              style={{
                                height: '100%',
                                width: '100%',
                                padding: scale(18),
                                marginLeft: scale(0),
                                alignSelf: 'center',
                              }}
                              onPress={() => {
                                if (item?.productQty <= 1) {
                                  onDelete(item);
                                } else {
                                  dispatch(
                                    updatecartAction(
                                      item?.productQty - 1,
                                      product?.saasId,
                                      product?.storeId,
                                      product?.id,
                                      item?.id,
                                    ),
                                  );
                                }
                              }}>
                              <AntDesign
                                name="minus"
                                color="#393939"
                                size={20}
                              />
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              borderLeftWidth: 1,
                              borderColor: '#BFBFBF',
                              borderRightWidth: 1,
                            }}>
                            <Text
                              style={{
                                color: '#1E1E1E',
                                padding: 20,
                                fontWeight: 'bold',
                                flex: 1,
                                fontSize: textScale(14),
                              }}>
                              {item?.productQty}
                            </Text>
                          </View>
                          <View
                            style={{ marginLeft: scale(0), alignSelf: 'center' }}>
                            <TouchableOpacity
                              style={{
                                marginLeft: scale(0),
                                alignSelf: 'center',
                                height: '100%',
                                width: '100%',
                                padding: scale(18),
                              }}
                              onPress={() =>
                                dispatch(
                                  updatecartAction(
                                    item?.productQty + 1,
                                    product?.saasId,
                                    product?.storeId,
                                    product?.id,
                                    item?.id,
                                  ),
                                )
                              }>
                              <AntDesign name="plus" color="black" size={20} />
                            </TouchableOpacity>
                          </View>
                        </View>

                        <TouchableOpacity onPress={() => onDelete(item)}>
                          <View style={styles.delete}>
                            <AntDesign
                              name="delete"
                              color="#1E1E1E"
                              size={16}
                            />
                            <View style={{ marginLeft: 10 }}>
                              <Text style={{ fontSize: 16 }}>Delete</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      borderColor: '#EEE',
                      marginTop: 20,
                      marginBottom: 20,
                      borderWidth: 1,
                    }}></View>
                </View>
              )}
            />
          </View>

          <View style={{ backgroundColor: '#fff', marginVertical: 10 }}>
            {cartArray?.length > 0 && sumOfDifferences !== 0 ? (
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  backgroundColor: '#edf4ff',
                  width: '90%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  margin: 'auto',
                  marginLeft: 20,
                  height: 45,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={26}
                    color={'green'}
                  />

                  <Text style={styles.savedButton}>
                    {/* ₹{Math.abs(sumOfDifferences)} Saved so far on this order */}
                    ₹{Math.abs(sumOfDifferences).toFixed(0)} Saved so far on
                    this order
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Coupon */}
          {accessToken !== 'GUEST' ? (
            // {/* {false == 'GUEST' ? ( */}
            <View style={{ backgroundColor: '#fff' }}>
              {cartArray?.length > 0 ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#edf4ff',
                    width: '90%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    margin: 'auto',
                    marginLeft: 20,
                    height: 45,
                  }}
                  onPress={() => {
                    handleOpenModal();
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {couponLoder ? (
                      <ActivityIndicator />
                    ) : (
                      <MaterialCommunityIcons
                        name="ticket-percent"
                        size={26}
                        color={'green'}
                      />
                    )}

                    <Text
                      style={[
                        styles.savedButton,
                        {
                          fontWeight:
                            data?.data?.coupanApllied == true
                              ? 'bold'
                              : 'normal',
                        },
                      ]}>
                      {couponLoder ? couponLoder : 'Redeem Coupon'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null}

          <View style={styles.calculation}>
            {dataArray.map(item => (
              <TextCompoForPrice key={item?.id} totalInvoiceAmount={item} />
            ))}
          </View>

          {accessToken == 'GUEST' ? (
            <Buttons
              titel="Log In For Order"
              fontSize={16}
              isloading={isLoading}
              onPress={() => {
                store.dispatch({ type: 'RESET' });
              }}
            />
          ) : (
            <Buttons
              titel="Place Order"
              fontSize={16}
              isloading={isLoading}
              onPress={() => {
                if (accessToken == 'GUEST') {
                  showToast('Login');
                } else {
                  if (
                    selectedAddress &&
                    typeof selectedAddress === 'object' &&
                    Object.keys(selectedAddress).length !== 0
                  ) {
                    onPressPlaceOrder();
                  } else {
                    showMessage({
                      message: 'Please Add Address',
                      type: 'danger',
                    });
                  }
                }
              }}
            />
          )}

          {isModalVisible && (
            <ListModal
              isVisible={isModalVisible}
              data={allCoupan}
              onClose={handleCloseModal}
              onSelect={handleSelectItem}
            />
          )}
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <NoDataFound
            text="No item in cart"
            iconName="cart-remove"
            iconSize={50}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistContainer: {
    marginHorizontal: scale(10),
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 10,
  },
  imageContainer: {
    width: scale(120),
    height: scale(120),
    backgroundColor: '#FFF',
  },

  price_Qntytitle: {
    color: '#1E1E1E',
    fontSize: 15,
    fontWeight: '400',
  },
  delete: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    width: '100%',
    backgroundColor: 'white',
    width: 100,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  calculation: {
    width: '100%',
    justifyContent: 'space-between',
    gap: 10,
    borderWidth: 0.5,
    borderColor: '#BFBFBF',
    padding: 10,
    marginVertical: 10,
  },
  savedButton: {
    color: '#1E1E1E',
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '400',
  },
});

export default Cart;
