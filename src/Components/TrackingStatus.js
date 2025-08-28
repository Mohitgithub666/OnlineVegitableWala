// import React, {useEffect, useState} from 'react';
// import {
//   Alert,
//   LayoutAnimation,
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   UIManager,
//   View,
// } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {useDispatch} from 'react-redux';
// import {
//   canclePendingOrderMethod,
//   returnOrderMethod,
// } from '../redux/actions/UserAction';
// import {useNavigation} from '@react-navigation/native';

// if (Platform.OS === 'android') {
//   if (UIManager.setLayoutAnimationEnabledExperimental) {
//     UIManager.setLayoutAnimationEnabledExperimental(true);
//   }
// }

// // const status = ['Ordered', 'In Process', 'Delivered',]
// const status = ['Ordered', 'Out for Delivery', 'Delivered'];

// const activeColor = 'green';

// export default function TrackingStatus({orderDetails, orderStatus}) {
//   const [activeIndex, setActive] = useState(0);
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const setActiveIndex = val => {
//     LayoutAnimation.easeInEaseOut();
//     setActive(val);
//   };
//   const marginLeft = (100 / (status.length - 1)) * activeIndex - 100 + '%';

//   useEffect(() => {
//     if (orderStatus == 'PENDING') {
//       setActiveIndex(activeIndex + 1);
//     } else if (orderStatus == 'delivered') {
//       setActiveIndex(activeIndex + 2);
//     } else if (orderStatus == 'return') {
//       setActiveIndex(activeIndex + 2);
//     }
//   }, [orderStatus]);

//   const handleCancle = () => {
//     Alert.alert(
//       'Confirm',
//       'Are you sure you want to cancel the order?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Yes',
//           onPress: () => {
//             dispatch(canclePendingOrderMethod(orderDetails[0]?.order_id));
//             navigation.goBack();
//           },
//         },
//       ],
//       {cancelable: false},
//     );
//   };

//   const handleReurn = () => {
//     Alert.alert(
//       'Confirm',
//       'Are you sure you want to return the order?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Yes',
//           onPress: () => {
//             dispatch(returnOrderMethod(orderDetails[0]?.order_id));
//             navigation.goBack();
//           },
//         },
//       ],
//       {cancelable: false},
//     );
//   };


//   console.log("orderStatus",orderStatus)
//   return (
//     <View style={styles.constainer}>
//       <Text style={styles.prop}></Text>
//       <View style={styles.statusContainer}>
//         <View style={styles.line}>
//           <View style={[styles.activeLine, {marginLeft}]} />
//         </View>
//         {status.map((status, index) => (
//           <View style={[styles.dot]} key={status}>
//             <View
//               style={[
//                 index <= activeIndex
//                   ? {height: '100%', width: '100%'}
//                   : {height: '40%', width: '40%'},
//                 {backgroundColor: activeColor, borderRadius: 20},
//               ]}
//             />
//           </View>
//         ))}
//         <View style={styles.labelContainer}>
//           {status.map((status, index) => (
//             <Text
//               key={status}
//               numberOfLines={1}
//               style={[index % 2 == 0 ? {top: 20} : {top: -20}, styles.label]}>
//               {status}
//             </Text>
//           ))}
//         </View>
//       </View>

//       <TouchableOpacity
//         style={styles.btns}
//         onPress={() => {
//           orderDetails[0]?.status == 'PENDING'
//             ? handleCancle()
//             : orderDetails[0]?.status == 'cancel'
//             ? false
//             : orderDetails[0]?.status == 'return'
//             ? false
//             : orderDetails[0]?.status == 'delivered'
//             ? handleReurn()
//             : orderDetails[0]?.status == 'delivered'
//             ? null
//             : null;
//         }}
//         activeOpacity={
//           orderDetails[0]?.status == 'cancel'
//             ? 1
//             : orderDetails[0]?.status == 'return'
//             ? 1
//             : orderDetails[0]?.status == 'delivered'
//             ? 0
//             : orderDetails[0]?.status == 'DELIVERYBOY'
//             ? 1
//             : 0
//         }>
//         <Text
//           style={{
//             fontWeight: 'bold',
//             alignSelf: 'center',
//             color:
//               orderDetails[0]?.status == 'PENDING'
//                 ? 'red'
//                 : orderDetails[0]?.status == 'cancel'
//                 ? 'grey'
//                 : orderDetails[0]?.status == 'Return'
//                 ? 'grey'
//                 : orderDetails[0]?.status == 'delivered'
//                 ? 'grey'
//                 : orderDetails[0]?.status == 'DELIVERYBOY'
//                 ? 'green'
//                 : 'grey',
//           }}>
//           {orderDetails[0]?.status == 'PENDING'
//             ? 'Cancel Order'
//             : orderDetails[0]?.status == 'cancel'
//             ? 'Cancelled'
//             : orderDetails[0]?.status == 'return'
//             ? 'Request Return'
//             : orderDetails[0]?.status == 'delivered'
//             ? 'Return Order'
//             : orderDetails[0]?.status == 'DELIVERYBOY'
//             ? 'Assign To Delivery Boy '
//             : 'Already Return Requested'}
//         </Text>

//         {orderDetails[0]?.status == 'DELIVERYBOY' ? null : (
//           <MaterialCommunityIcons
//             name={'close'}
//             size={26}
//             color={
//               orderDetails[0]?.status == 'PENDING'
//                 ? 'red'
//                 : orderDetails[0]?.status == 'cancel'
//                 ? 'grey'
//                 : orderDetails[0]?.status == 'return'
//                 ? 'grey'
//                 : orderDetails[0]?.status == 'delivered'
//                 ? 'grey'
//                 : orderDetails[0]?.status == 'DELIVERYBOY'
//                 ? 'grey'
//                 : 'grey'
//             }
//           />
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   constainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 30,
//     backgroundColor: '#fff',
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     height: 70,
//     justifyContent: 'space-between',
//   },
//   dot: {
//     height: 15,
//     width: 15,
//     borderRadius: 10,
//     backgroundColor: '#ccc',
//     overflow: 'hidden',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   line: {
//     height: 5,
//     width: '100%',
//     backgroundColor: '#ccc',
//     position: 'absolute',
//     borderRadius: 5,
//     overflow: 'hidden',
//   },
//   activeLine: {
//     height: '100%',
//     width: '100%',
//     backgroundColor: activeColor,
//     borderRadius: 5,
//   },
//   btns: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//     gap: 10,
//   },
//   labelContainer: {
//     width: '100%',
//     position: 'absolute',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   label: {
//     fontSize: 12,
//   },
//   prop: {
//     marginBottom: 20,
//     width: 100,
//     textAlign: 'center',
//   },
// });















import React, {useEffect, useState} from 'react';
import {
  Alert,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {
  canclePendingOrderMethod,
  returnOrderMethod,
} from '../redux/actions/UserAction';
import {useNavigation} from '@react-navigation/native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const status = ['Ordered', 'Packaging', 'Out for Delivery', 'Delivered'];

const activeColor = 'green';

export default function TrackingStatus({orderDetails, orderStatus}) {
  const [activeIndex, setActive] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const setActiveIndex = val => {
    LayoutAnimation.easeInEaseOut();
    setActive(val);
  };
  
  const marginLeft = (100 / (status.length - 1)) * activeIndex - 100 + '%';

  useEffect(() => {
    switch(orderStatus) {
      case 'PENDING':
        setActiveIndex(0); // Ordered
        break;
      case 'PACKAGING':
        setActiveIndex(1); // Packaging
        break;
      case 'DELIVERYBOY':
        setActiveIndex(2); // Out for Delivery
        break;
      case 'delivered':
      case 'return':
        setActiveIndex(3); // Delivered
        break;
      default:
        setActiveIndex(0);
    }
  }, [orderStatus]);

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
            dispatch(canclePendingOrderMethod(orderDetails[0]?.order_id));
            navigation.goBack();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleReurn = () => {
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
            dispatch(returnOrderMethod(orderDetails[0]?.order_id));
            navigation.goBack();
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.constainer}>
      <Text style={styles.prop}></Text>
      <View style={styles.statusContainer}>
        <View style={styles.line}>
          <View style={[styles.activeLine, {marginLeft}]} />
        </View>
        {status.map((status, index) => (
          <View style={[styles.dot]} key={status}>
            <View
              style={[
                index <= activeIndex
                  ? {height: '100%', width: '100%'}
                  : {height: '40%', width: '40%'},
                {backgroundColor: activeColor, borderRadius: 20},
              ]}
            />
          </View>
        ))}
        <View style={styles.labelContainer}>
          {status.map((status, index) => (
            <Text
              key={status}
              numberOfLines={1}
              style={[
                index % 2 == 0 ? {top: 20} : {top: -20},
                styles.label,
                {fontSize: 11},
              ]}>
              {status}
            </Text>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.btns}
        onPress={() => {
          orderDetails[0]?.status == 'PENDING'
            ? handleCancle()
            : orderDetails[0]?.status == 'cancel'
            ? false
            : orderDetails[0]?.status == 'return'
            ? false
            : orderDetails[0]?.status == 'delivered'
            ? handleReurn()
            : orderDetails[0]?.status == 'delivered'
            ? null
            : null;
        }}
        activeOpacity={
          orderDetails[0]?.status == 'cancel'
            ? 1
            : orderDetails[0]?.status == 'return'
            ? 1
            : orderDetails[0]?.status == 'delivered'
            ? 0
            : orderDetails[0]?.status == 'DELIVERYBOY'
            ? 1
            : 0
        }>
        <Text
          style={{
            fontWeight: 'bold',
            alignSelf: 'center',
            color:
              orderDetails[0]?.status == 'PENDING'
                ? 'red'
                : orderDetails[0]?.status == 'cancel'
                ? 'grey'
                : orderDetails[0]?.status == 'Return'
                ? 'grey'
                : orderDetails[0]?.status == 'delivered'
                ? 'grey'
                : orderDetails[0]?.status == 'DELIVERYBOY'
                ? 'green'
                : 'grey',
          }}>
          {orderDetails[0]?.status == 'PENDING'
            ? 'Cancel Order'
            : orderDetails[0]?.status == 'cancel'
            ? 'Cancelled'
            : orderDetails[0]?.status == 'return'
            ? 'Request Return'
            : orderDetails[0]?.status == 'delivered'
            ? 'Return Order'
            : orderDetails[0]?.status == 'DELIVERYBOY'
            ? 'Assign To Delivery Boy '
            : 'Already Return Requested'}
        </Text>

        {orderDetails[0]?.status == 'DELIVERYBOY' ? null : (
          <MaterialCommunityIcons
            name={'close'}
            size={26}
            color={
              orderDetails[0]?.status == 'PENDING'
                ? 'red'
                : orderDetails[0]?.status == 'cancel'
                ? 'grey'
                : orderDetails[0]?.status == 'return'
                ? 'grey'
                : orderDetails[0]?.status == 'delivered'
                ? 'grey'
                : orderDetails[0]?.status == 'DELIVERYBOY'
                ? 'grey'
                : 'grey'
            }
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 70,
    justifyContent: 'space-between',
  },
  dot: {
    height: 15,
    width: 15,
    borderRadius: 10,
    backgroundColor: '#ccc',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 5,
    width: '100%',
    backgroundColor: '#ccc',
    position: 'absolute',
    borderRadius: 5,
    overflow: 'hidden',
  },
  activeLine: {
    height: '100%',
    width: '100%',
    backgroundColor: activeColor,
    borderRadius: 5,
  },
  btns: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
  },
  labelContainer: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
  },
  prop: {
    marginBottom: 20,
    width: 100,
    textAlign: 'center',
  },
});