import React, { useState, useCallback, memo, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Headers from '../Components/Headers';
import { moderateScale } from '../styles/responsiveSize';
import { useDispatch, useSelector } from 'react-redux';
import { ViewOrderMethod, canclePendingOrderMethod, returnOrderMethod } from '../redux/actions/UserAction';
import NoDataFound from '../Components/NoDataFound';


// Dummy data for orders
const dummyOrders = [
  { id: 1, orderNumber: '12345', orderDate: '2023-01-01' },
  { id: 2, orderNumber: '67890', orderDate: '2023-02-01' },
];

const OrderItem = memo(({ order, routeStatus }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const handleOrderPress = useCallback(() => {
    navigation.navigate('RenderViewOrder', { orderId: order?.order_id, });
  }, [navigation]);


  const handleCancle = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to cancel the order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            dispatch(canclePendingOrderMethod(order?.order_id));
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleReturn = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to return the order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // User confirmed, dispatch the cancel order action
            dispatch(returnOrderMethod(order?.order_id));
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableOpacity style={styles.orderItem} activeOpacity={2}>

      {['Delivered', 'Cancel', 'Return'].includes(routeStatus) ? (
        null
      ) :

        (
          <TouchableOpacity style={[styles.iconContainer, { backgroundColor: '#ECE447', padding: 4, borderRadius: 4, }]}
            onPress={() => handleCancle()}
          >
            <Text style={[styles.orderDate, { fontWeight: 'bold', fontSize: 16, color: '#000' }]}>Cancel</Text>

          </TouchableOpacity>
        )

      }

      {['Pending', 'Cancel', 'Return'].includes(routeStatus) ? (
        null
      ) :

        (
          <TouchableOpacity style={[styles.iconContainer, { backgroundColor: '#ECE447', padding: 4, borderRadius: 4, }]}
            onPress={() => handleReturn()}
          >
            <Text style={[styles.orderDate, { fontWeight: 'bold', fontSize: 16, color: '#000' }]}>Return</Text>
          </TouchableOpacity>
        )

      }


      <View style={styles.orderDetails}>
        <Text style={styles.orderNumber}>Order Number: {order?.order_id}</Text>
        <Text style={styles.orderDate}>Order Date: {order?.order_date}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleOrderPress}>
          <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

const OrderNumber = ({ route }) => {
  const { routeStatus } = route?.params
  const [filterdData, setFilterdData] = useState()
  const dispatch = useDispatch()
  const product = useSelector(state => state?.auth?.data?.customer_data);
  const ViewOrderHistoryArrayData = useSelector(state => state?.product?.ViewOrderHistory);
  const userId = product?.id


  const getViewOrders = async () => {
    dispatch(ViewOrderMethod(product?.storeId, product?.saasId, userId));
  }


  useEffect(() => {
    getViewOrders()
  }, [])

  useEffect(() => {
    const filteredData = ViewOrderHistoryArrayData?.filter((item) => {
      const itemStatus = item.status?.toUpperCase();
      const routeStatusUpperCase = routeStatus?.toUpperCase();
      return itemStatus === routeStatusUpperCase;
    });

    setFilterdData(filteredData)
  }, [routeStatus, ViewOrderHistoryArrayData])





  return (
    <>
      <Headers
        title={routeStatus}
      />
      <View style={styles.container}>
        {filterdData?.length === 0 ?
          <NoDataFound
            text={`No ${routeStatus} Item`}
            iconName='cart-remove'
            iconSize={50}
          />
          :
          <FlatList
            data={filterdData}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => <OrderItem order={item} routeStatus={routeStatus} />}
          />
        }


      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    marginVertical: 8,
    elevation: 4, // Add elevation
    flex: 1,
    margin: moderateScale(8),

  },
  iconContainer: {
    marginRight: 12,
  },
  orderDetails: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey'
  },
  orderDate: {
    fontSize: 14,
    color: '#777',
  },
  selectedOrderContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#e0e0e0',
  },
});



export default OrderNumber

