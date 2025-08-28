import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ViewOrderDetailsMethod} from '../redux/actions/UserAction';
import Headers from '../Components/Headers';
import TrackingStatus from '../Components/TrackingStatus';
import MyImgCompo from '../Components/MyImgCompo';
import {BASE_URL} from '../apiEndpoints/Base_Url';
import Loader from '../Components/Loader';

const OrderStatusItem = memo(({item}) => {
  // console.log("item",item)
  return (
    <Pressable style={styles.itemsContainer}>
      <View style={styles.itemContent}>
        <View style={styles.imageContainer}>
          <MyImgCompo
            imageUri={`${BASE_URL}item/get-image/${
              item?.item_id
            }?${new Date().getTime()}`}
            resizeMode={'cover'}
            ImgCompoStyle={styles.image}
          />
        </View>
        <View style={styles.itemDetails}>
          <Text style={{fontWeight: '600', color: 'grey'}}>
            {item?.item_name.charAt(0).toUpperCase() + item?.item_name.slice(1)}
          </Text>
          <View style={styles.itemPrice}>
            {item?.gram ? (
              <View>
                <Text style={{fontWeight: '600', color: 'grey'}}>
                  Quanity: {item?.bill_qty} of {item?.gram} gram
                </Text>
                <Text style={{fontWeight: '600', color: 'grey'}}>
                  Total: {item?.bill_qty * item?.gram} gram
                </Text>
              </View>
            ) : (
              <Text style={{fontWeight: '600', color: 'grey'}}>
                Quanity: {item?.bill_qty}
              </Text>
            )}
            <Text style={{fontWeight: 'bold', color: '#000', fontSize: 18}}>
              ₹{item?.item_price * (item?.gram / 1000)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
});

const OrderDetails = ({route}) => {
  const dispatch = useDispatch();
  const product = useSelector(state => state?.auth?.data?.customer_data);
  const ViewOrderDetailsListArrayData = useSelector(
    state => state?.product?.ViewOrderDetailsList,
  );
  const {orderId, orderValue, orderDate, orderQty, orderStatus, time} =
    route?.params;
  const [isLoading, seIsLoading] = useState(true);
  // console.log('first', ViewOrderDetailsListArrayData, time);

  useEffect(() => {
    dispatch(
      ViewOrderDetailsMethod(product?.storeId, product?.saasId, orderId),
    );
  }, [dispatch, orderId, product?.saasId, product?.storeId]);

  const renderItem = useCallback(
    ({item}) => <OrderStatusItem item={item} />,
    [],
  );
  const keyExtractor = useCallback((item, index) => index, []);

  setTimeout(() => {
    seIsLoading(false);
  }, 500);

  return (
    <View style={styles.container}>
      <Headers title="Order Details" />
      <View style={styles.contentContainer}>
        <View style={styles.orderContainer}>
          <View style={styles.orderHeader}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: 'grey'}}>
              Order #{orderId}
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: '#000'}}>
              ₹{orderValue}
            </Text>
          </View>
          <View style={styles.orderDate}>
            <Text style={{color: 'grey'}}>Date {orderDate}</Text>
            <Text style={{color: 'grey'}}>Time {time}</Text>
          </View>

          <TrackingStatus
            orderDetails={ViewOrderDetailsListArrayData}
            orderStatus={orderStatus}
          />
        </View>
        <View style={styles.addressContainer}>
          <View style={styles.addressContent}>
            <Text style={{fontWeight: '600', fontSize: 16, color: 'grey'}}>
              Me, {product?.mobileNumber}
            </Text>
          </View>
        </View>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>Items {orderQty}</Text>
        {isLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Loader isLoading={isLoading} />
          </View>
        ) : (
          <FlatList
            data={ViewOrderDetailsListArrayData || []}
            renderItem={renderItem}
            horizontal={false}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{height: 20}} />}
            ListFooterComponent={() => <View style={{height: 10}} />}
          />
        )}
      </View>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    gap: 10,
    borderBlockColor: 'grey',
    flex: 1,
  },
  orderContainer: {
    gap: 10,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderDate: {},
  addressContainer: {
    gap: 16,
  },
  addressContent: {
    gap: 4,
  },
  itemsContainer: {
    gap: 10,
    borderWidth: 0.2,
    padding: 16,
    borderRadius: 8,
    flex: 1,
  },
  itemContent: {
    flexDirection: 'row',
    gap: 10,
  },
  imageContainer: {},
  image: {
    height: 100,
    width: 100,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-around',
  },
  itemPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
