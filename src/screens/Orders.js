import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View, BackHandler } from 'react-native';
import Headers from '../Components/Headers';
import { useNavigation } from '@react-navigation/native';
import {
  ViewOrderDetailsMethod,
  ViewOrderMethod,
} from '../redux/actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NoDataFound from '../Components/NoDataFound';

const OrderStatusItem = memo(({ orderStatus, onPress }) => {
  return (
    <Pressable style={styles.pressable} onPress={onPress}>
      <View style={styles.statusContainer}>
        <View style={styles.orderDetails}>
          <Text style={{ fontWeight: 'bold', color: '#000' }}>
            Order #{orderStatus?.order_id}
          </Text>
          <Text style={styles.common}>Date {orderStatus?.order_date}</Text>
          <Text style={styles.common}>Time {orderStatus?.time}</Text>
          {orderStatus?.otp ? (
            <Text style={styles.common}>OTP {orderStatus?.otp}</Text>
          ) : null}
        </View>
        <View style={styles.status}>
          <MaterialCommunityIcons
            name={
              orderStatus?.status == 'PENDING'
                ? 'clock'
                : orderStatus?.status == 'cancel'
                  ? 'cancel'
                  : orderStatus?.status === 'delivered'
                    ? 'check-circle'
                    : orderStatus?.status === 'return'
                      ? 'reload'
                      : 'reorder-horizontal'
            }
            size={26}
            color={
              orderStatus?.status == 'delivered'
                ? 'green'
                : orderStatus?.status == 'cancel'
                  ? 'red'
                  : orderStatus?.status == 'PENDING'
                    ? '#FFA500'
                    : 'grey'
            }
          />
          <Text
            style={{
              fontWeight: 'bold',
              color:
                orderStatus?.status == 'delivered'
                  ? 'green'
                  : orderStatus?.status == 'cancel'
                    ? 'red'
                    : orderStatus?.status == 'PENDING'
                      ? '#FFA500'
                      : 'grey',
              alignSelf: 'center',
            }}>
            {orderStatus?.status.toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}> {orderStatus?.order_qty} items</Text>
        <Text style={styles.price}>₹ {orderStatus?.order_value}</Text>
      </View>
    </Pressable>
  );
});

const Orders = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const product = useSelector(state => state?.auth?.data?.customer_data);
  const viewOrderHistoryArrayData = useSelector(
    state => state?.product?.ViewOrderHistory,
  );
  const viewOrderDetailsListArrayData = useSelector(
    state => state?.product?.ViewOrderDetailsList,
  );
  const accessToken = useSelector(state => state?.auth?.data?.jwt_response);

  const handleBackPress = useCallback(() => {
    navigation.navigate('Home'); // Replace 'Home' with your home screen name
    return true; // Prevent default back behavior
  }, [navigation]);

  // **2. Effect to add BackHandler listener**
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove(); // Cleanup on unmount
  }, [handleBackPress]);

  useEffect(() => {
    getViewOrders();
  }, []);

  const getViewOrders = async () => {
    await dispatch(ViewOrderMethod(product?.storeId, product?.saasId));
    viewOrderHistoryArrayData.forEach(order => {
      dispatch(
        ViewOrderDetailsMethod(
          product?.storeId,
          product?.saasId,
          order.order_id,
        ),
      );
    });
  };

  const renderItem = useCallback(
    ({ item }) => {
      const handleNavigate = () => {
        navigation.push('OrderDetails', {
          orderId: item.order_id,
          orderValue: item.order_value,
          orderDate: item.order_date,
          orderQty: item.order_qty,
          orderStatus: item.status,
          time: item?.time,
        });
      };
      return (
        <OrderStatusItem
          orderStatus={item}
          item_id={viewOrderDetailsListArrayData[0]?.item_id}
          onPress={handleNavigate}
        />
      );
    },
    [navigation, viewOrderDetailsListArrayData],
  );

  const keyExtractor = useCallback((item, index) => index, []);
  const reversedOrderHistory = useMemo(
    () => [...viewOrderHistoryArrayData].reverse(),
    [viewOrderHistoryArrayData],
  );

  const aaa = async () => {
    await dispatch(ViewOrderMethod(product?.storeId, product?.saasId));
  };

  // console.log('reversedOrderHistory', reversedOrderHistory[0]);
  return (
    <View style={styles.container}>
      <Headers title="Orders" isOrderRelod={true} />
      {accessToken === 'GUEST' || reversedOrderHistory.length === 0 ? (
        <View style={styles.container}>
          <NoDataFound text="No Orders" />
        </View>
      ) : (
        <FlatList
          data={reversedOrderHistory}
          renderItem={renderItem}
          horizontal={false}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pressable: {
    backgroundColor: '#fff',
    borderWidth: 1,
    margin: 16,
    borderRadius: 10,
    borderColor: '#d2d9d3',
  },
  statusContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#d2d9d3',
  },
  orderDetails: {
    backgroundColor: '#fff',
    margin: 8,
  },
  status: {
    backgroundColor: '#fff',
    margin: 8,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 4,
  },
  priceContainer: {
    backgroundColor: '#fff',
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    alignSelf: 'flex-end',
    fontWeight: '800',
    fontSize: 16,
    color: 'grey',
  },
  common: {
    color: '#4a503f',
  },
});

export default Orders;
