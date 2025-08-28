import React, { useCallback, memo, useMemo } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Addtocartaction, Cartget } from '../redux/actions/UserAction';
import { scale, textScale, width } from '../styles/responsiveSize';
import { BASE_URL } from '../apiEndpoints/Base_Url';
import Buttons from '../Components/Buttons';
import MyImgCompo from '../Components/MyImgCompo';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';

const CategoryItemCompo = memo((props) => {
  const dispatch = useDispatch();
  const product = useSelector(state => state?.auth?.data?.customer_data);
  const NOCATEGORYDATA = useSelector(state => state?.product?.nocategoryItems);
  const data = props.categoryItemData;
  const navigation = useNavigation()



  const storeData = useCallback(async (item) => {
    const body = JSON.stringify({
      item_id: item?.item_id,
      item_name: item?.item_name,
      category: item?.category,
      message: 'This is an example cart item.',
      itemCode: 'ITEM002',
      sku: 'SKU123',
      description: item?.item_name,
      price: item?.price,
      new_price: item?.price,
      discount: item?.discount,
      status: 'In Stock',
      department: '',
      saas_id: product?.saasId,
      store_id: product?.storeId,
      promoId: item?.promo_id,
      item_quantity: item?.product_qty,
      hsnCode: item?.hsn_code,
      taxRate: item?.tax_rate,
      taxCode: item?.tax_code,
      taxPercent: item?.tax_percen
    });

    const res = await dispatch(Addtocartaction(body, product?.saasId, product?.storeId, product?.id));
    if (res?.status) {
      await dispatch(Cartget(product?.saasId, product?.storeId, product?.id));
    }
  }, [dispatch, product]);


  const renderFooter = useCallback(() => {
    return !NOCATEGORYDATA ? (
      <View style={styles.loadMoreContainer}>
        <Buttons
          titel={"Load More"}
          onPress={props.handleLoadMore}
          textStyle={{ fontSize: textScale(14) }}
          style={{ width: width / 4 }}
        />
      </View>
    ) : null;
  }, [NOCATEGORYDATA, props.handleLoadMore]);


  const renderItem = useCallback(({ item }) => {

    if (item?.price !== undefined && item?.actual_price !== undefined) {
      const originalPrice = item.actual_price;
      const discountedPrice = item.price;
      const discountAmount = originalPrice - discountedPrice;
      const percentageOff = (discountAmount / originalPrice) * 100;

      var totalOff = percentageOff.toFixed(0) + "%";
      // console.log("first", totalOff)
    } else {
      console.log("Prices are not defined or null.");
    }


    return (
      <View style={styles.topContainer}>
        <View
          style={{
            borderWidth: 2,
            borderColor: '#F1F1F1',
            borderRadius: 20,
          }}>
          <View
            style={{
              height: 225,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: '#FFF',
            }}>

            {/* Fast Image */}
            {
              totalOff == '-Infinity%' ?
                <Text style={{ alignSelf: 'flex-end', backgroundColor: '#FFF', paddingHorizontal: 6, color: '#FFF', borderRadius: 4, fontSize: 12, marginTop: 4, marginRight: 4 }}>{totalOff}</Text>
                :
                <Text style={{ alignSelf: 'flex-end', backgroundColor: '#008000', paddingHorizontal: 6, color: '#FFF', borderRadius: 4, fontSize: 12, marginTop: 4, marginRight: 4 }}>{totalOff}</Text>
            }
            <Pressable
              onPress={() => navigation.push('ItemDetails', { item: item, totalOff: totalOff })}
            >
              <MyImgCompo
                imageUri={`${BASE_URL}item/get-image/${item.item_id}`}
                resizeMode={'cover'}
                ImgCompoStyle={{
                  height: '95%',
                  height: '100%',
                  width: '100%',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,

                }}
              />
            </Pressable>

          </View>
          <View style={{ paddingLeft: scale(10), backgroundColor: '#FFF' }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: textScale(12),
                fontWeight: 'bold',
                marginTop: 10,
                marginLeft: 8
              }}>{item.item_name.charAt(0).toUpperCase() + item?.item_name.slice(1)}</Text>



            <View style={{ marginRight: 15, flexDirection: 'row', }}>
              <Text
                numberOfLines={1}
                style={{
                  color: 'grey',
                  fontSize: 16,
                  fontWeight: 600,
                  marginBottom: 10,
                  marginTop: 10,
                  textDecorationLine: 'line-through',

                }}>
                {/* ₹{item.price} */}
                {item?.actual_price > 0 ? '₹' : null}{item?.actual_price > 0 ? item?.actual_price : ''}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  color: '#1e1e1e',
                  fontSize: 16,
                  fontWeight: 600,
                  marginBottom: 10,
                  marginTop: 10,
                }}>  ₹{item.price}</Text>
            </View>




          </View>
          <View style={{ backgroundColor: '#fff', borderRadius: 16, }}>
            <TouchableOpacity
              onPress={() => {
                storeData(item);
              }}
              style={{
                backgroundColor: '#fff',
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 30,
                paddingRight: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                // elevation: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 8,
                marginHorizontal: 15,
                marginBottom: 4

              }}>
              <Text
                numberOfLines={1}
                style={{ fontSize: 18, fontWeight: 600, color: '#1E1E1E' }}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }, [data]);

  const memoizedCategoryData = useMemo(() => {
    return data;
  }, [data]);

  return (
    <View style={styles.container}>
      <FlatList
        // <FlashList
        data={memoizedCategoryData || []}
        ItemSeparatorComponent={() => {
          return <View style={{ width: 20, height: '100%', }}></View>;
        }}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        ListFooterComponent={renderFooter}
        renderItem={renderItem}
        estimatedItemSize={50}
        // scrollEnabled={false}
        initialNumToRender={20}




      />
    </View>
  );
});

const styles = StyleSheet.create({
  topContainer: {
    width: scale(160),
  },
  container: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  loadMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    flex: 1,
  },
});

export default CategoryItemCompo;






/////////////

//optimization



/////////image


// import React, { useCallback, memo } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { Addtocartaction, Cartget } from '../redux/actions/UserAction';
// import { scale, textScale, width } from '../styles/responsiveSize';
// import { BASE_URL } from '../apiEndpoints/Base_Url';
// import Buttons from '../Components/Buttons';
// import MyImgCompo from '../Components/MyImgCompo';
// import { useNavigation } from '@react-navigation/native';

// const CategoryItemCompo = memo((props) => {
//   const dispatch = useDispatch();
//   const product = useSelector(state => state?.auth?.data?.customer_data);
//   const NOCATEGORYDATA = useSelector(state => state?.product?.nocategoryItems);
//   const data = props.categoryItemData;
//   const navigation = useNavigation()

//   const storeData = useCallback(async (item) => {
//     const body = JSON.stringify({
//       item_id: item?.item_id,
//       item_name: item?.item_name,
//       category: item?.category,
//       message: 'This is an example cart item.',
//       itemCode: 'ITEM002',
//       sku: 'SKU123',
//       description: item?.item_name,
//       price: item?.price,
//       new_price: item?.price,
//       discount: item?.discount,
//       status: 'In Stock',
//       department: '',
//       saas_id: product?.saasId,
//       store_id: product?.storeId,
//       promoId: item?.promo_id,
//       item_quantity: item?.product_qty,
//       hsnCode: item?.hsn_code,
//       taxRate: item?.tax_rate,
//       taxCode: item?.tax_code,
//       taxPercent: item?.tax_percen
//     });

//     const res = await dispatch(Addtocartaction(body, product?.saasId, product?.storeId, product?.id));
//     if (res?.status) {
//       await dispatch(Cartget(product?.saasId, product?.storeId, product?.id));
//     }
//   }, [dispatch, product]);

//   const renderItem = useCallback(({ item }) => {
//     // const totalOff = (item?.actual_price && item?.price) ? `${((item.actual_price - item.price) / item.actual_price * 100).toFixed(0)}%` : '-Infinity%';

//     if (item?.price !== undefined && item?.actual_price !== undefined) {
//       const originalPrice = item.actual_price;
//       const discountedPrice = item.price;
//       const discountAmount = originalPrice - discountedPrice;
//       const percentageOff = (discountAmount / originalPrice) * 100;

//       var totalOff = percentageOff.toFixed(0) + "%";
//       // console.log("first", totalOff)
//     } else {
//       console.log("Prices are not defined or null.");
//     }
//     return (
//       <View style={styles.topContainer}>
//         <View style={styles.itemContainer}>
//           {
//             totalOff == '-Infinity%' ?
//               <Text style={{ alignSelf: 'flex-end', backgroundColor: '#FFF', paddingHorizontal: 6, color: '#FFF', borderRadius: 4, fontSize: 12, marginTop: 4, marginRight: 4 }}>{totalOff}</Text>
//               :
//               <Text style={{ alignSelf: 'flex-end', backgroundColor: '#008000', paddingHorizontal: 6, color: '#FFF', borderRadius: 4, fontSize: 12, marginTop: 4, marginRight: 4 }}>{totalOff}</Text>
//           }
//           <Pressable
//             onPress={() => navigation.push('ItemDetails', { item: item, totalOff: totalOff })}
//           >
//             <MyImgCompo
//               imageUri={`${BASE_URL}item/get-image/${item.item_id}`}
//               resizeMode='cover'
//               ImgCompoStyle={styles.image}
//             />
//           </Pressable>

//           <Text numberOfLines={1} style={styles.itemName}>{item.item_name.charAt(0).toUpperCase() + item?.item_name.slice(1)}</Text>
//           <View style={styles.priceContainer}>
//             <Text style={styles.oldPrice}>{item?.actual_price > 0 ? '₹' : null}{item?.actual_price > 0 ? item?.actual_price : ''}</Text>
//             <Text style={styles.newPrice}>₹{item.price}</Text>
//           </View>

//           <TouchableOpacity
//             onPress={() => storeData(item)}
//             style={styles.addButton}
//           >
//             <Text style={styles.addButtonText}>Add</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }, [data]);

//   const renderFooter = useCallback(() => {
//     return !NOCATEGORYDATA ? (
//       <View style={styles.loadMoreContainer}>
//         <Buttons
//           title={"Load More"}
//           onPress={props.handleLoadMore}
//           textStyle={{ fontSize: textScale(14) }}
//           style={{ width: width / 4 }}
//         />
//       </View>
//     ) : null;
//   }, [NOCATEGORYDATA, props.handleLoadMore]);

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={data || []}
//         ItemSeparatorComponent={() => <View style={styles.separator} />}
//         keyExtractor={(item, index) => index}
//         showsHorizontalScrollIndicator={false}
//         horizontal={true}
//         ListFooterComponent={renderFooter}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// });

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: 15,
//     height:'100%',
//   },
//   topContainer: {
//     width: scale(160),
//     // backgroundColor:'red',
//     // height:'100%'
//   },
//   itemContainer: {
//     borderWidth: 2,
//     borderColor: '#F1F1F1',
//     borderRadius: 20,
//   },
//   image: {
//     height: '95%',
//     width: '100%',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   itemName: {
//     fontSize: textScale(12),
//     fontWeight: 'bold',
//     marginTop: 10,
//     marginLeft: 8,
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     marginRight: 15,
//   },
//   oldPrice: {
//     color: 'grey',
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 10,
//     marginTop: 10,
//     textDecorationLine: 'line-through',
//   },
//   newPrice: {
//     color: '#1e1e1e',
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 10,
//     marginTop: 10,
//   },
//   addButton: {
//     backgroundColor: '#fff',
//     paddingTop: 10,
//     paddingBottom: 10,
//     paddingLeft: 30,
//     paddingRight: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderBottomLeftRadius: 10,
//     borderBottomRightRadius: 10,
//     borderWidth: 1,
//     borderColor: '#000',
//     borderRadius: 8,
//     marginHorizontal: 15,
//     marginBottom: 4,
//   },
//   addButtonText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1E1E1E',
//   },
//   loadMoreContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//     flex: 1,
//   },
//   separator: {
//     width: 20,
//     height: '100%',
//   },
// });

// export default CategoryItemCompo;
