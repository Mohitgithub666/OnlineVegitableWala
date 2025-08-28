import {
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Headers from '../Components/Headers';
import MyImgCompo from '../Components/MyImgCompo';
import { BASE_URL } from '../apiEndpoints/Base_Url';
import { height, moderateScale, scale, width } from '../styles/responsiveSize';
import { useDispatch, useSelector } from 'react-redux';
import {
  Addtocartaction,
  Cartget,
  removecart,
  updatecartAction,
} from '../redux/actions/UserAction';
import * as ActionTypes from '../redux/actionTypes';

import imgPath from '../constants/imgPath';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { showToast } from '../styles/utils/toast';
import Units from '../Components/Units';
import RollingBarCompo from '../Components/RollingBarCompo';
import WeightDisplay from '../Components/WeightDisplay';

const NoData = () => {
  return (
    <View
      style={{
        backgroundColor: '#FFF',
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          marginRight: 120,
          fontSize: 18,
          fontWeight: '700',
          color: '#000',
        }}>
        No Items
      </Text>
    </View>
  );
};

const SubCategoryItemListRender = ({ item }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { storeId, saasId, id } = useSelector(
    state => state?.auth?.data?.customer_data,
  );
  const storeData = async item => {
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
      new_price: item?.price,
      discount: item?.discount,
      status: item?.status,
      department: 'no departments',
      saas_id: saasId,
      store_id: storeId,
      promoId: item?.promo_id,
      item_quantity: item?.product_qty,
      hsnCode: item?.hsn_code,
      taxRate: item?.tax_rate,
      taxCode: item?.tax_code,
      taxPercent: item?.tax_percent,
      actual_price: item?.actual_price,
    });

    const res = await dispatch(Addtocartaction(body, saasId, storeId, id));
    if (res?.status) {
      await dispatch(Cartget(saasId, storeId, id));
    }
  };
  if (item?.price !== undefined && item?.actual_price !== undefined) {
    const originalPrice = item.actual_price;
    const discountedPrice = item.price;

    const discountAmount = originalPrice - discountedPrice;
    const percentageOff = (discountAmount / originalPrice) * 100;

    var totalOff = percentageOff.toFixed(0) + '%';
  } else {
    showToast('Prices are not defined or null.');
  }

  return (
    <Pressable
      style={styles.itemContainer}
      onPress={() =>
        navigation.push('ItemDetails', { item: item, totalOff: totalOff })
      }>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 6 }}>
        {item?.stock == 0 ? (
          <Text
            style={{
              alignSelf: 'flex-start',
              paddingHorizontal: 6,
              color: 'grey',
              borderRadius: 4,
              fontSize: 12,
              backgroundColor: '#edf1f7',
            }}>
            out of stock
          </Text>
        ) : (
          <Text
            style={{
              alignSelf: 'flex-start',
              paddingHorizontal: 6,
              color: 'grey',
              borderRadius: 4,
              fontSize: 12,
            }}></Text>
        )}

        {totalOff == '-Infinity%' ? (
          <Text
            style={{
              alignSelf: 'flex-end',
              paddingHorizontal: 6,
              color: '#FFF',
              borderRadius: 4,
              fontSize: 12,
            }}></Text>
        ) : (
          <Text
            style={{
              alignSelf: 'flex-end',
              backgroundColor:
                item?.actual_price > item?.price ? '#008000' : '#FFF',
              paddingHorizontal: 6,
              color: '#FFF',
              borderRadius: 4,
              fontSize: 12,
            }}>
            {item?.actual_price > item?.price ? totalOff : null}
          </Text>
        )}
      </View>

      <Image
        source={{ uri: `${BASE_URL}item/get-image/${item.item_id}` }}
        style={styles.img}
        resizeMode="contain"
      />

      <View style={{ width: '100%', gap: 6, height: 65 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={[
              styles.price,
              {
                textDecorationLine: 'line-through',
                fontSize: scale(14),
                color: '#ccc',
              },
            ]}>
            {item?.actual_price > item.price ? ' ₹' : null}
            {item?.actual_price > item.price ? item?.actual_price : ''}
          </Text>
          <Text style={styles.price}>₹{item?.price}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
          {item?.item_name}
        </Text>
      </View>
      <Pressable style={styles.button} onPress={() => storeData(item)}>
        <Text style={styles.buttonTitle}>Add</Text>
      </Pressable>
    </Pressable>
  );
};

const ItemDetails = ({ route }) => {
  const { item, totalOff } = route?.params;
  const dispatch = useDispatch();
  const product = useSelector(state => state?.auth?.data?.customer_data);
  const subCategoryItemsData = useSelector(
    state => state?.product?.subCategoryItemsData,
  );
  const [loding, setLoading] = useState(false);
  const [selectedUnits, setSelectedUnits] = useState({}); // Store selected units for each item
  const [weights, setWeights] = useState({}); // Store selected weights for each item
  const cartArray = useSelector(state => state?.product.cart?.data?.products);

  const memoizedsubCategoryItemsData = useMemo(() => {
    return subCategoryItemsData;
  }, [subCategoryItemsData]);

  const translateY = useRef(new Animated.Value(100)).current; // Initial value for translateY: 100

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [translateY]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch({
        type: ActionTypes.SUBCATEGORYITEMPAGE,
        payload: 1,
      });
      setLoading(true);
      setLoading(false);
    };
    fetchData();
  }, []);

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

  const currentWeight = weights[item?.item_id] || 1000; // Default to 1000g if not set
  const finalPrice = selectedWeight(currentWeight) || item?.price;

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
    console.log('storesss', body, currentWeight);
  };
  const isIteminCart = cartArray.find(
    cartItem => cartItem.item_id === item?.item_id,
  );
  const updateCartItem = productQty => {
    dispatch(
      updatecartAction(
        productQty,
        product?.saasId,
        product?.storeId,
        product?.id,
        isIteminCart?.id,
      ),
    );
  };
  const onDelete = async item => {
    const res = await dispatch(
      removecart(
        product?.saasId,
        product?.storeId,
        product?.id,
        isIteminCart?.id,
      ),
    );
    if (res?.status) {
      await dispatch(Cartget(product?.saasId, product?.storeId, product?.id));
    } else {
      Alert.alert('Something went wrong');
    }
  };

  console.log('isIteminCart', isIteminCart);
  return (
    <Animated.ScrollView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
        gap: 4,
        transform: [{ translateY }],
      }}>
      <Headers title="Details" showCart={true} />
      <MyImgCompo
        imageUri={`${BASE_URL}item/get-image/${item.item_id}`}
        resizeMode={'contain'}
        ImgCompoStyle={{
          height: height / 3,
          width: width,
          backgroundColor: '#fff',
        }}
      />
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: scale(4),
          }}>
          <View style={{ width: '60%' }}>
            <Text style={styles.itemName} numberOfLines={2}>
              {item?.item_name.charAt(0).toUpperCase() +
                item?.item_name.slice(1)}
            </Text>
            <Text style={styles.stockStatus}>
              {item?.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              overflow: 'hidden',
              justifyContent: 'center',
              gap: 8,
              alignItems: 'center',
            }}>
            <Text style={styles.mrpStyle}>
              {item?.actual_price > item.price ? '₹' : null}
              {item?.actual_price > item.price ? item?.actual_price : ''}
            </Text>
            <Text numberOfLines={1} style={styles.price}>
              ₹{finalPrice}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.DescriptionContainer}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            margin: scale(8),
          }}>
          {totalOff !== '-Infinity%' && (
            <Text
              style={[
                styles.offer,
                {
                  backgroundColor:
                    item?.actual_price > item.price ? 'green' : '#fff',
                },
              ]}>
              {item?.actual_price > item.price ? `${totalOff} off` : null}
            </Text>
          )}
          {/*  */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#f1f1f1',
            }}>
            <View style={styles.quantityContainer}></View>
            {item.UOM === "W" ? <Units title="weight" onSelect={handleWeightChange} /> : ""}
          </View>
        </View>
      </View>
      {/*  */}

      <RollingBarCompo />
      {isIteminCart ? (
        <View style={styles.updatequantityContainer}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#ccc',
              }}
              onPress={() => {
                if (isIteminCart.productQty > 1) {
                  updateCartItem(isIteminCart.productQty - 1);
                } else {
                  onDelete(item);
                }
              }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>-</Text>
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 20, fontSize: 18, color: '#000' }}>
              {isIteminCart.productQty}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#ccc',
              }}
              onPress={() => {
                updateCartItem(isIteminCart.productQty + 1);
              }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() =>
            storeData({ item, finalPrice, currentWeight, productQty: 1 })
          }
          style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      )}
      {isIteminCart?.gram !== 1000 ? (
        <WeightDisplay
          weights={[50, 100, 250, 500, 750]}
          onSelect={handleWeightChange}
        />
      ) : null}

      {/*  */}
      <View style={styles.DescriptionContainer}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            margin: scale(8),
          }}>
          {item?.category && (
            <>
              <Text
                numberOfLines={1}
                style={[styles.Category, { color: 'grey' }]}>
                Category Name
              </Text>
              <Text numberOfLines={1} style={styles.Category}>
                {item?.category}
              </Text>
            </>
          )}
        </View>
        <View
          style={{
            borderWidth: 0.8,
            borderRadius: 16,
            overflow: 'hidden',
            borderColor: 'grey',
            paddingVertical: scale(8),
            backgroundColor: '#f7f7f7',
          }}>
          <Text
            numberOfLines={1}
            style={[
              {
                color: 'grey',
                fontWeight: 'bold',
                fontSize: scale(18),
                alignSelf: 'center',
              },
            ]}>
            Description
          </Text>
          <Text style={styles.Description}>{item?.special_description}</Text>
        </View>
      </View>

      {/* Items */}
      <View style={styles.selectedCategoryItems}>
        {memoizedsubCategoryItemsData?.length == 0 ? (
          <>{NoData()}</>
        ) : (
          <FlatList
            data={memoizedsubCategoryItemsData || []}
            keyExtractor={(item, index) => item?.id || index}
            renderItem={({ item }) => <SubCategoryItemListRender item={item} />}
            contentContainerStyle={styles.contentContainer}
            ListEmptyComponent={() => NoData()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
      <View
        style={{ backgroundColor: 'grey', marginHorizontal: moderateScale(16) }}>
        <Image
          source={imgPath.promise}
          style={styles.promise}
          resizeMode="contain"
        />
      </View>
    </Animated.ScrollView>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: scale(8),
    overflow: 'hidden',
  },
  DescriptionContainer: {
    marginHorizontal: scale(8),
    overflow: 'hidden',
    flex: 1,
    backgroundColor: '#FFF',
    gap: 8,
  },
  mrpStyle: {
    color: 'grey',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textDecorationLine: 'line-through',
    alignSelf: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'green',
  },
  itemName: {
    color: '#1e1e1e',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textDecorationLine: 'none',
    // alignSelf: 'center',
    width: '70%',
  },
  Category: {
    color: '#1e1e1e',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    textDecorationLine: 'none',
    alignSelf: 'center',
  },
  Description: {
    color: '#1e1e1e',
    fontSize: 14,
    fontWeight: '400',
    marginTop: scale(10),
    textDecorationLine: 'none',
    alignSelf: 'center',
    textAlign: 'center',
    // height: 200,
    margin: 8,
  },
  title: {
    alignSelf: 'flex-start',
    marginLeft: scale(10),
    fontSize: scale(20),
    fontWeight: 'bold',
    color: 'black',
  },
  offer: {
    alignSelf: 'flex-end',
    backgroundColor: '#008000',
    paddingHorizontal: 6,
    color: '#FFF',
    borderRadius: 4,
    fontSize: scale(16),
    marginTop: 4,
    marginRight: 4,
  },
  promise: {
    height: moderateScale(120),
  },
  selectedCategoryItems: {
    // backgroundColor: "pink",
    // height: 100
  },
  itemContainer: {
    padding: 10,
    borderBottomColor: '#ccc',
    height: 260,
    width: width / 2.9,
    elevation: 6,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    marginVertical: 6,
    alignItems: 'center',
    gap: 10,
    borderRadius: 8,
  },
  img: {
    height: 100,
    width: 110,
    borderWidth: 1,
    borderRadius: 8,
  },
  title: {
    fontSize: scale(12),
    fontWeight: '700',
    textAlign: 'left',
    color: '#000',
  },
  price: {
    fontSize: scale(16),
    fontWeight: '700',
    textAlign: 'left',
    color: 'green',
  },
  button: {
    backgroundColor: '#fff',
    padding: 4,
    paddingHorizontal: 8,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    elevation: 4,
  },
  buttonTitle: {
    fontSize: scale(14),
    fontWeight: '700',
    color: '#000',
  },
  addButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '50%',
    elevation: 2,
    borderColor: '#000',
    borderWidth: 1,
    marginHorizontal: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  stockStatus: {
    color: 'grey', // marginTop: 10,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
    textDecorationLine: 'none',
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 15,
    padding: 6,
    alignSelf: 'center',
    alignSelf: 'flex-start',
  },
  note: {
    fontSize: scale(10),
    color: 'red',
    marginTop: 4,
    textAlign: 'center',
  },
  updatequantityContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    width: '50%',
    marginHorizontal: 10,
    alignSelf: 'center',
  },
});
