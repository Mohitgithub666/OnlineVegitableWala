// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   Pressable,
// } from 'react-native';
// import React, {useCallback, useEffect, useMemo, useState} from 'react';
// import {scale, textScale, width} from '../styles/responsiveSize';
// import {useDispatch, useSelector} from 'react-redux';
// import {
//   Addtocartaction,
//   Cartget,
//   ProductAction,
// } from '../redux/actions/UserAction';
// import MyImgCompo from './MyImgCompo';
// import {BASE_URL} from '../apiEndpoints/Base_Url';
// import {useNavigation} from '@react-navigation/native';
// import * as ActionTypes from '../redux/actionTypes';
// import {moderateScale} from './Matrics';
// import Units from './Units';
// import CategoryCompo from './CategoryCompo';
// import HomeSliderCompo from '../Components/HomeSliderCompo';
// import RollingBarCompo from './RollingBarCompo';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const RecommendedCompo = props => {
//   const dispatch = useDispatch();
//   const product = useSelector(state => state?.auth?.data?.customer_data);
//   const data = props?.productData;
//   const navigation = useNavigation();
//   const productPage = useSelector(state => state?.product?.productPage);
//   const recommendedTotalPage = useSelector(
//     state => state?.product?.recommendedTotalPage,
//   );
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedUnits, setSelectedUnits] = useState({}); // Store selected units for each item
//   const [weights, setWeights] = useState({}); // Store selected weights for each item
//   const masterCategoryData = useSelector(
//     state => state?.product?.masterCategory,
//   );

//   useEffect(() => {
//     // Set default unit and weight for each item
//     const defaultUnits = {};
//     const defaultWeights = {};
//     data?.forEach(item => {
//       defaultUnits[item.item_id] = 'KG';
//       defaultWeights[item.item_id] = 1000; // Default to 1000g (1kg)
//     });
//     setSelectedUnits(defaultUnits);
//     setWeights(defaultWeights);
//   }, [data]);

//   const storeData = async ({item, finalPrice, currentWeight}) => {
//     const weight = currentWeight / 1000;

//     let body = JSON.stringify({
//       item_id: item?.item_id,
//       item_name: item?.item_name,
//       category: item?.category,
//       message: 'This is an example cart item.',
//       itemCode: null,
//       sku: 'SKU123',
//       description: item?.item_name,
//       price: item?.price,
//       mrp: item?.actual_price,
//       new_price: finalPrice,
//       discount: item?.discount,
//       status: item?.status,
//       department: 'no departments',
//       saas_id: product?.saasId,
//       store_id: product?.storeId,
//       promoId: item?.promo_id,
//       item_quantity: item?.product_qty,
//       gram: currentWeight,
//       hsnCode: item?.hsn_code,
//       taxRate: item?.tax_rate,
//       taxCode: item?.tax_code,
//       taxPercent: item?.tax_percent,
//       actual_price: item?.actual_price,
//     });

//     const res = await dispatch(
//       Addtocartaction(body, product?.saasId, product?.storeId, product?.id),
//     );

//     if (res?.status) {
//       await dispatch(Cartget(product?.saasId, product?.storeId, product?.id));
//     }

//     console.log('storeaa', body);
//   };

//   const RenderItem = useCallback(
//     ({item}) => {
//       const originalPrice = item?.actual_price ?? 0;
//       const discountedPrice = item?.price ?? 0;
//       const discountAmount = originalPrice - discountedPrice;
//       const totalOff = originalPrice
//         ? `${((discountAmount / originalPrice) * 100).toFixed(0)}%`
//         : '';

//       const handleWeightChange = weight => {
//         setWeights(prev => ({...prev, [item.item_id]: weight}));
//       };

//       const selectedWeight = weight => {
//         if (weight) {
//           const priceByWeight = (weight / 1000) * item?.price; // converting grams to kg and calculating price
//           return Math.round(priceByWeight);
//         } else {
//           return item?.price;
//         }
//       };

//       const currentWeight = weights[item?.item_id] || 1000; // Default to 1000g if not set
//       const finalPrice = selectedWeight(currentWeight) || item?.price;
//       return (
//         <View style={styles.itemContainer}>
//           <Pressable
//             onPress={() => navigation.push('ItemDetails', {item, totalOff})}>
//             <MyImgCompo
//               imageUri={`${BASE_URL}item/get-image/${item.item_id}`}
//               resizeMode={'contain'}
//               ImgCompoStyle={styles.image}
//             />
//           </Pressable>

//           <View
//             style={{
//               justifyContent: 'space-between',
//               flex: 1,
//               gap: moderateScale(5),
//             }}>
//             <Text numberOfLines={2} style={styles.itemName}>
//               {item?.item_name.charAt(0).toUpperCase() +
//                 item?.item_name.slice(1)}
//             </Text>

//             <View style={styles.priceContainer}>
//               {item?.actual_price > item.price && (
//                 <Text style={styles.strikethroughPrice}>
//                   ₹{item?.actual_price}
//                 </Text>
//               )}
//               <Text style={styles.discountedPrice}>
//                 ₹{selectedWeight(currentWeight)}
//               </Text>
//             </View>

//             {/* Stock */}
//             <View style={styles.stockContainer}>
//               {item?.stock === 0 ? (
//                 <Text style={styles.oosText}>OOS</Text>
//               ) : (
//                 <Text />
//               )}
//               {totalOff && item?.actual_price > item?.price && (
//                 <Text style={styles.discountText}>{totalOff}</Text>
//               )}
//             </View>

//             <View
//               style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//               <View style={styles.quantityContainer}></View>
//               <Units title="weight" onSelect={handleWeightChange} />
//             </View>

//             <TouchableOpacity
//               onPress={() => storeData({item, finalPrice, currentWeight})}
//               style={styles.addButton}>
//               <Text style={styles.addButtonText}>Add</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       );
//     },
//     [selectedUnits, weights],
//   );

//   const renderFooter = () => {
//     var LoadMore = async () => {
//       setIsLoading(true);
//       const totalPage = await AsyncStorage.getItem('TOTALPAGE');
//       await dispatch(
//         ProductAction(product?.storeId, product?.saasId, productPage),
//       );
//       if (recommendedTotalPage < Number(totalPage) + 1) {
//         await dispatch({
//           type: ActionTypes.PRODUCTPAGE,
//           payload: productPage + 1,
//         });
//       }
//       setIsLoading(false);
//     };

//     return (
//       <View style={styles.loadMoreContainer}>
//         {isLoading ? (
//           <ActivityIndicator size="large" color="#0000ff" />
//         ) : (
//           <Pressable onPress={() => LoadMore()} style={styles.loadMoreButton}>
//             <Text style={styles.loadMoreText}>Next</Text>
//           </Pressable>
//         )}
//       </View>
//     );
//   };
//   const renderHeader = () => {
//     return (
//       <>
//         <View style={styles.homeSlider}>
//           <HomeSliderCompo />
//         </View>
//         <RollingBarCompo />

//         {masterCategoryData?.length == 0 ? null : (
//           <>
//             <Text
//               style={[
//                 styles.title,
//                 {
//                   marginLeft: scale(16),
//                   color: '#000',
//                 },
//               ]}>
//               Category
//             </Text>
//             <View style={styles.categoryDataStyle}>
//               <CategoryCompo categoryData={masterCategoryData} />
//             </View>
//           </>
//         )}
//         <Text
//           style={[
//             styles.title,
//             {
//               marginLeft: scale(16),
//               color: '#000',
//             },
//           ]}>
//           Recommended
//         </Text>
//       </>
//     );
//   };

//   const memoizedRecommendedData = useMemo(() => {
//     return data;
//   }, [data]);

//   var LoadMore = async () => {
//     setIsLoading(true);
//     await dispatch(
//       ProductAction(product?.storeId, product?.saasId, productPage),
//     );
//     await dispatch({
//       type: ActionTypes.PRODUCTPAGE,
//       payload: productPage + 1,
//     });
//     setIsLoading(false);
//     console.log('LoadMore');
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={memoizedRecommendedData || []}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({item}) => <RenderItem item={item} />}
//         showsVerticalScrollIndicator={false}
//         numColumns={2}
//         ListFooterComponent={renderFooter}
//         ListHeaderComponent={renderHeader}
//         initialNumToRender={30}
//         removeClippedSubviews={true}
//       />
//     </View>
//   );
// };

// export default RecommendedCompo;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 10,
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     marginHorizontal: 8,
//   },
//   itemContainer: {
//     backgroundColor: '#ffff',
//     borderRadius: 5,
//     elevation: 4,
//     marginHorizontal: 4,
//     width: width / 2.2,
//     paddingVertical: 8,
//     marginBottom: 8,
//     paddingHorizontal: 8,
//   },
//   title: {
//     alignSelf: 'flex-start',
//     marginLeft: scale(10),
//     fontSize: scale(16),
//     fontWeight: 'bold',
//     color: 'balck',
//   },
//   image: {
//     height: 120,
//     width: '100%',
//     borderRadius: 10,
//   },
//   itemName: {
//     marginTop: 10,
//     fontSize: textScale(12),
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     marginRight: 15,
//   },
//   strikethroughPrice: {
//     color: 'grey',
//     fontSize: 16,
//     fontWeight: '500',
//     textDecorationLine: 'line-through',
//   },
//   discountedPrice: {
//     color: '#1e1e1e',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 8,
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     gap: 10,
//     marginVertical: moderateScale(8),
//   },
//   buttonText: {
//     color: '#333',
//     fontSize: 12,
//   },
//   button: {
//     borderWidth: 1,
//     borderColor: '#333',
//     paddingVertical: moderateScale(2),
//     paddingHorizontal: moderateScale(2),
//     borderRadius: 5,
//   },
//   selectedButton: {
//     backgroundColor: 'grey',
//     borderColor: '#4CAF50',
//   },

//   selectedButtonText: {
//     color: '#FFF',
//   },
//   stockContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: 12,
//   },
//   oosText: {
//     color: 'grey',
//     fontSize: 12,
//     backgroundColor: '#edf1f7',
//     paddingHorizontal: 6,
//     borderRadius: 4,
//   },
//   discountText: {
//     backgroundColor: '#008000',
//     color: '#FFF',
//     paddingHorizontal: 6,
//     borderRadius: 4,
//     fontSize: 12,
//   },
//   addButton: {
//     backgroundColor: '#fff',
//     paddingVertical: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//     width: '100%',
//     elevation: 2,
//     borderColor: '#000',
//     borderWidth: 1,
//   },
//   addButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#1E1E1E',
//   },
//   loadMoreContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   homeSlider: {
//     height: scale(200),
//     marginTop: 2,
//   },
//   categoryDataStyle: {
//     marginHorizontal: scale(8),
//     marginVertical: 5,
//     backgroundColor: '#FFF',
//   },
//   categoryItemDataStyle: {
//     flex: 1,
//     marginTop: scale(5),
//     backgroundColor: '#FFF',
//   },
//   loadMoreText: {
//     fontWeight: '700',
//     color: 'green',
//     borderWidth: 1,
//     padding: 4,
//     borderRadius: 4,
//     paddingHorizontal: 8,
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { scale, textScale, width } from '../styles/responsiveSize';
import { useDispatch, useSelector } from 'react-redux';
import {
  Addtocartaction,
  Cartget,
  ProductAction,
  updatecartAction,
  removecart
} from '../redux/actions/UserAction';
import MyImgCompo from './MyImgCompo';
import { BASE_URL } from '../apiEndpoints/Base_Url';
import { useNavigation } from '@react-navigation/native';
import * as ActionTypes from '../redux/actionTypes';
import { moderateScale } from './Matrics';
import Units from './Units';
import CategoryCompo from './CategoryCompo';
import HomeSliderCompo from '../Components/HomeSliderCompo';
import RollingBarCompo from './RollingBarCompo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryCompoY from './CategoryCompoY';
import AntDesign from 'react-native-vector-icons/AntDesign';

const RecommendedCompo = props => {
  const dispatch = useDispatch();
  const product = useSelector(state => state?.auth?.data?.customer_data);
  const data = props?.productData;
  const navigation = useNavigation();
  const Cartdata = useSelector(state => state?.product.cart);
  const productPage = useSelector(state => state?.product?.productPage);
  const recommendedTotalPage = useSelector(
    state => state?.product?.recommendedTotalPage,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUnits, setSelectedUnits] = useState({}); // Store selected units for each item
  const [weights, setWeights] = useState({}); // Store selected weights for each item
  const masterCategoryData = useSelector(
    state => state?.product?.masterCategory,
  );
  const currentStore = useSelector(state => state?.auth?.data?.store_data);

  useEffect(() => {
    const defaultUnits = {};
    const defaultWeights = {};
    data?.forEach(item => {
      defaultUnits[item.item_id] = 'KG';
      defaultWeights[item.item_id] = 1000; // Default to 1000g (1kg)
    });
    setSelectedUnits(defaultUnits);
    setWeights(defaultWeights);
  }, [data]);

  const storeData = async ({ item, finalPrice, currentWeight }) => {
    let body = JSON.stringify({
      item_id: item?.item_id,
      item_name: item?.item_name,
      category: item?.category,
      message: 'This is an example cart item.',
      itemCode: null,
      sku: 'SKU123',
      description: item?.item_name,
      price: item?.price,
      mrp: item?.actual_price,
      new_price: finalPrice,
      discount: item?.discount,
      status: item?.status,
      department: 'no departments',
      saas_id: product?.saasId,
      store_id: product?.storeId,
      promoId: item?.promo_id,
      item_quantity: item?.product_qty,
      gram: currentWeight,
      hsnCode: item?.hsn_code,
      taxRate: item?.tax_rate,
      taxCode: item?.tax_code,
      taxPercent: item?.tax_percent,
      actual_price: item?.actual_price,
    });

    const res = await dispatch(
      Addtocartaction(body, product?.saasId, product?.storeId, product?.id),
    );

    if (res?.status) {
      await dispatch(Cartget(product?.saasId, product?.storeId, product?.id));
    }

    console.log('storeaa', body);
  };

  const RenderItem = useCallback(
    ({ item }) => {
      const originalPrice = item?.actual_price ?? 0;
      const discountedPrice = item?.price ?? 0;
      const discountAmount = originalPrice - discountedPrice;
      const totalOff = originalPrice
        ? `${((discountAmount / originalPrice) * 100).toFixed(0)}%`
        : '';

      const handleWeightChange = weight => {
        setWeights(prev => ({ ...prev, [item.item_id]: weight }));
      };

      const selectedWeight = weight => {
        if (weight) {
          const priceByWeight = (weight / 1000) * item?.price; // converting grams to kg and calculating price
          return Math.round(priceByWeight);
        } else {
          return item?.price;
        }
      };

      const cartItem = Cartdata?.data?.products?.find(
        cartProduct => cartProduct.item_id === item.item_id
      );

      const itemQuantity = cartItem?.productQty || 0;

      const increaseQuantity = async () => {
        await dispatch(
          updatecartAction(
            itemQuantity + 1,
            product?.saasId,
            product?.storeId,
            product?.id,
            cartItem?.id,
          )
        );
        await dispatch(Cartget(product?.saasId, product?.storeId, product?.id));
      };

      // Function to handle quantity decrease
      const decreaseQuantity = async () => {
        if (itemQuantity <= 1) {
          await dispatch(removecart(product?.saasId, product?.storeId, product?.id, cartItem?.id));
        } else {
          await dispatch(
            updatecartAction(
              itemQuantity - 1,
              product?.saasId,
              product?.storeId,
              product?.id,
              cartItem?.id,
            )
          );
        }
        await dispatch(Cartget(product?.saasId, product?.storeId, product?.id));
      };

      const onDelete = async () => {
        const res = await dispatch(
          removecart(product?.saasId, product?.storeId, product?.id, cartItem?.id),
        );
        console.log(res, "res")
        if (res?.status) {
          await dispatch(Cartget(product?.saasId, product?.storeId, product?.id));
        } else {
          Alert.alert('Something went wrong');
        }
      };

      // console.log(item?.item_id, item?.item_name)
      // console.log(itemQuantity, "datas")

      const currentWeight = weights[item?.item_id] || 1000; // Default to 1000g if not set
      const finalPrice = selectedWeight(currentWeight) || item?.price;

      return (
        <>
          {currentStore?.showonlycategory === 'N' ? (
            <View style={styles.itemContainer}>
              <Pressable
                onPress={() =>
                  navigation.push('ItemDetails', { item, totalOff })
                }>
                <MyImgCompo
                  imageUri={`${BASE_URL}item/get-image/${item.item_id}`}
                  resizeMode={'contain'}
                  ImgCompoStyle={styles.image}
                />
              </Pressable>

              <View
                style={{
                  justifyContent: 'space-between',
                  flex: 1,
                  gap: moderateScale(5),
                }}>
                <Text numberOfLines={2} style={styles.itemName}>
                  {item?.item_name.charAt(0).toUpperCase() +
                    item?.item_name.slice(1)}
                </Text>

                <View style={styles.priceContainer}>
                  {item?.actual_price > item.price && (
                    <Text style={styles.strikethroughPrice}>
                      ₹{item?.actual_price}
                    </Text>
                  )}
                  <Text style={styles.discountedPrice}>
                    ₹{selectedWeight(currentWeight)}
                  </Text>
                </View>

                <View style={styles.stockContainer}>
                  {item?.stock === 0 ? (
                    <Text style={styles.oosText}>OOS</Text>
                  ) : (
                    <Text />
                  )}
                  {totalOff && item?.actual_price > item?.price && (
                    <Text style={styles.discountText}>{totalOff}</Text>
                  )}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={styles.quantityContainer}></View>
                  { item.UOM === "W" ? <Units title="weight" onSelect={handleWeightChange} /> : ""}
                </View>
                {/* <TouchableOpacity
                            onPress={() => storeData({ item, finalPrice, currentWeight })}
                            style={styles.addButton}>
                            <Text style={styles.addButtonText}>Add</Text>
                        </TouchableOpacity> */}
                {itemQuantity > 0 ? (
                  <>
                    <View style={styles.quantityControlContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={decreaseQuantity}
                        disabled={itemQuantity <= 1}
                      >
                        <AntDesign
                          name="minus"
                          color="#393939"
                          size={20}
                        />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{itemQuantity}</Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={increaseQuantity}
                      >
                        <AntDesign
                          name="plus"
                          color="black"
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => onDelete()} style={styles.deleteButton}>
                      <View
                        style={styles.delete}>
                        <AntDesign
                          name="delete"
                          color="#1E1E1E"
                          size={16}
                        />
                        <View style={{ marginLeft: 10 }}>
                          <Text style={{ fontSize: 16, color: "#000" }}>Delete</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    onPress={() => storeData({ item, finalPrice, currentWeight })}
                    style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : null}
        </>
      );
    },
    [selectedUnits, weights, Cartdata, product],
  );

  const renderFooter = () => {
    var LoadMore = async () => {
      setIsLoading(true);
      const totalPage = await AsyncStorage.getItem('TOTALPAGE');
      await dispatch(
        ProductAction(product?.storeId, product?.saasId, productPage),
      );
      if (recommendedTotalPage < Number(totalPage) + 1) {
        await dispatch({
          type: ActionTypes.PRODUCTPAGE,
          payload: productPage + 1,
        });
      }
      setIsLoading(false);
    };

    return (
      <View style={styles.loadMoreContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Pressable onPress={() => LoadMore()} style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>Next</Text>
          </Pressable>
        )}
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <View style={styles.homeSlider}>
          <HomeSliderCompo />
        </View>
        <RollingBarCompo />

        {masterCategoryData?.length == 0 ? null : (
          <>
            <Text
              style={[
                styles.title,
                {
                  marginLeft: scale(16),
                  color: '#000',
                },
              ]}>
              Category
            </Text>
            <View style={styles.categoryDataStyle}>
              {currentStore?.showonlycategory === 'N' ? (
                <CategoryCompo categoryData={masterCategoryData} />
              ) : (
                <CategoryCompoY categoryData={masterCategoryData} />
              )}
            </View>
          </>
        )}
        {currentStore?.showonlycategory === 'N' ? (
          <Text
            style={[
              styles.title,
              {
                marginLeft: scale(16),
                color: '#000',
              },
            ]}>
            Recommended
          </Text>
        ) : null}
      </>
    );
  };

  const memoizedRecommendedData = useMemo(() => {
    return data;
  }, [data]);

  return (
    <View style={styles.container}>
      <FlatList
        data={memoizedRecommendedData || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <RenderItem item={item} />}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        // ListFooterComponent={
        //   currentStore?.showonlycategory === 'N' ? renderFooter : null
        // }
        initialNumToRender={30}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default RecommendedCompo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 8,
  },
  itemContainer: {
    backgroundColor: '#ffff',
    borderRadius: 5,
    elevation: 4,
    marginHorizontal: 4,
    width: width / 2.2,
    paddingVertical: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  title: {
    alignSelf: 'flex-start',
    marginLeft: scale(10),
    fontSize: scale(16),
    fontWeight: 'bold',
    color: 'balck',
  },
  image: {
    height: 120,
    width: '100%',
    borderRadius: 10,
  },
  itemName: {
    marginTop: 10,
    fontSize: textScale(12),
    fontWeight: 'bold',
    color: '#000',
  },
  priceContainer: {
    flexDirection: 'row',
    marginRight: 15,
  },
  strikethroughPrice: {
    color: 'grey',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    color: '#1e1e1e',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: moderateScale(8),
  },
  buttonText: {
    color: '#333',
    fontSize: 12,
  },
  button: {
    borderWidth: 1,
    borderColor: '#333',
    paddingVertical: moderateScale(2),
    paddingHorizontal: moderateScale(2),
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'grey',
    borderColor: '#4CAF50',
  },

  selectedButtonText: {
    color: '#FFF',
  },
  stockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
  },
  oosText: {
    color: 'grey',
    fontSize: 12,
    backgroundColor: '#edf1f7',
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  discountText: {
    backgroundColor: '#008000',
    color: '#FFF',
    paddingHorizontal: 6,
    borderRadius: 4,
    fontSize: 12,
  },
  addButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    elevation: 2,
    borderColor: '#000',
    borderWidth: 1,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  loadMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  homeSlider: {
    height: scale(250),
    marginTop: 2,
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
  loadMoreText: {
    fontWeight: '700',
    color: 'green',
    borderWidth: 1,
    padding: 4,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  quantityControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    elevation: 2,
    borderColor: '#000',
    borderWidth: 1,
    width: '60%',
    left: 30,
  },
  deleteButton: {
    alignItems: 'flex-start',
    width: '100%',
    justifyContent: 'flex-start',
    left: 30,
  },
  quantityText: {
    color: '#fff',
    backgroundColor: 'green',
    width: 30,
    alignItems: 'center',
    textAlign: 'center',
  },
  delete: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 5,
    width: '100%',
    backgroundColor: 'white',
    alignSelf: "flex-start"
  },
});
