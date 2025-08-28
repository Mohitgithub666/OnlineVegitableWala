
// import { StyleSheet, Text, View, TextInput, FlatList, Image, Pressable } from 'react-native'
// import React, { useCallback, useState } from 'react'
// import { scale, textScale } from '../styles/responsiveSize'
// import NoDataFound from '../Components/NoDataFound'
// import { useDispatch, useSelector } from 'react-redux'
// import { Addtocartaction, Cartget, searchItemMethod } from '../redux/actions/UserAction'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { BASE_URL } from '../apiEndpoints/Base_Url'
// import { useNavigation, useTheme } from '@react-navigation/native'
// import { showToast } from '../styles/utils/toast'
// import Units from '../Components/Units'


// const Search = () => {

//     const dispatch = useDispatch()
//     const product = useSelector(state => state?.auth?.data?.customer_data);
//     const searchResponse = useSelector(state => state?.product?.search);
//     const colors = useTheme().colors;
//     const navigation = useNavigation()
//     const [weights, setWeights] = useState({}); // Store selected weights for each item


//     const searchItem = (search) => {
//         dispatch(searchItemMethod(product?.storeId, product?.saasId, search))
//     }




//     const renderItem = useCallback(({ item }) => {
//         if (item?.price !== undefined && item?.actual_price !== undefined) {
//             const originalPrice = item.actual_price;
//             const discountedPrice = item.price;
//             const discountAmount = originalPrice - discountedPrice;
//             const percentageOff = (discountAmount / originalPrice) * 100;
//             var totalOff = percentageOff.toFixed(0) + "%";
//         } else {
//             showToast("Prices are not defined or null.");
//         }


//     const handleWeightChange = (weight) => {
//         setWeights(prev => ({ ...prev, [item.item_id]: weight }));
//     };

//     const selectedWeight = (weight) => {
//         if (weight) {
//             const priceByWeight = (weight / 1000) * item?.price; // converting grams to kg and calculating price
//             return Math.round(priceByWeight);
//         } else {
//             return item?.price;
//         }
//     };

//     const currentWeight = weights[item?.item_id] || 1000;// Default to 1000g if not set
//     const finalPrice = selectedWeight(currentWeight) || item?.price
//     console.log("finalPrice", finalPrice);


//     const storeData = async ({ item, finalPrice, currentWeight }) => {
//         const weight = (currentWeight / 1000)

//         let body = JSON.stringify({
//             item_id: item?.item_id,
//             item_name: item?.item_name,
//             category: item?.category,
//             message: 'This is an example cart item.',
//             itemCode: null,
//             sku: 'SKU123',
//             description: item?.item_name,
//             price: item?.price,
//             mrp: item?.actual_price,
//             new_price: finalPrice,
//             discount: item?.discount,
//             status: item?.status,
//             department: 'no departments',
//             saas_id: product?.saasId,
//             store_id: product?.storeId,
//             promoId: item?.promo_id,
//             item_quantity: item?.product_qty,
//             gram: currentWeight,
//             hsnCode: item?.hsn_code,
//             taxRate: item?.tax_rate,
//             taxCode: item?.tax_code,
//             taxPercent: item?.tax_percent,
//             actual_price: item?.actual_price,
//         });

//         // const res = await dispatch(
//         //     Addtocartaction(body, product?.saasId, product?.storeId, product?.id),
//         // );

//         // if (res?.status) {
//         //     await dispatch(Cartget(product?.saasId, product?.storeId, product?.id));
//         // }

//         console.log("store", body, currentWeight)
//     };


//         return (
//             <Pressable
//                 onPress={() => navigation.push('ItemDetails', { item: item, totalOff: totalOff })}
//             >
//                 <View style={styles.itemContainer} >
//                     <Image
//                         source={{ uri: `${BASE_URL}item/get-image/${item.item_id}?key=${new Date()}` }}
//                         style={styles.itemImage}
//                     />

//                     <View style={styles.itemDetails}>
//                         <Text numberOfLines={1} style={styles.itemName}>{item?.item_name.charAt(0).toUpperCase() + item?.item_name.slice(1)}</Text>
//                         <Text numberOfLines={1} style={[styles.itemPrice, { textDecorationLine: 'line-through' }]}>
//                             {item?.actual_price > 0 ? ' ₹' : null}{item?.actual_price > 0 ? item?.actual_price : ''}

//                         </Text>
//                         <Text numberOfLines={1} style={styles.itemPrice}>Price: ₹{finalPrice}</Text>
//                     </View>
//                     <Pressable onPress={() => storeData({ item, finalPrice, currentWeight })}
//                         style={{ backgroundColor: colors.YellowBtn, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, alignSelf: 'center' }}
//                     >
//                         <Text numberOfLines={1} style={[styles.itemPrice, { fontWeight: '500' }]}>Add Cart</Text>
//                     </Pressable>
//                     {/*  */}
//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f1f1f1', }}>
//                         <View style={styles.quantityContainer}>
//                         </View>
//                         <Units title="weight" onSelect={handleWeightChange} />
//                     </View>

//                 </View>

//             </Pressable>
//         );
//     }, [searchResponse]);





//     return (
//         <View style={{ flex: 1, backgroundColor: '#fff' }}>
//             <View style={{
//                 flexDirection: 'row',
//                 borderWidth: 1.5,
//                 borderColor: '#C1C1E2',
//                 alignContent: 'center',
//                 alignItems: 'center',
//                 marginHorizontal: scale(8),
//                 borderRadius: scale(10),
//                 borderBottomWidth: 3,
//                 backgroundColor: '#fff'

//             }}>
//                 <Icon
//                     name={'magnify'}
//                     style={{ fontSize: 25, left: 5, }}
//                     color={'#000'}
//                 />
//                 <TextInput
//                     placeholder='Search'
//                     placeholderTextColor={"grey"}
//                     onChangeText={(text) => searchItem(text)}
//                     style={{
//                         fontSize: textScale(18),
//                         paddingLeft: scale(8),
//                         flex: 1,
//                         color: '#000',
//                         backgroundColor: '#fff'
//                     }}
//                     autoFocus


//                 />
//             </View>

//             <View style={styles.container}>

//                 {searchResponse && searchResponse?.length > 0 ?
//                     <>
//                         <View>
//                             <FlatList
//                                 data={searchResponse}
//                                 renderItem={renderItem}
//                                 keyExtractor={(item, index) => index.toString()}
//                                 showsVerticalScrollIndicator={false}
//                             />
//                         </View>
//                     </>
//                     :

//                     <NoDataFound
//                         text='No Search'
//                         iconName={'text-search'}
//                         iconSize={30}
//                     />
//                 }



//             </View>
//         </View >
//     )
// }

// export default Search

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginTop: scale(8),
//         marginHorizontal: scale(8),
//         backgroundColor: '#fff'
//     },
//     itemContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderBottomWidth: 1,
//         borderBottomColor: '#C1C1E2',
//         paddingVertical: scale(12),
//         backgroundColor: '#fff'

//     },
//     itemImage: {
//         width: scale(60),
//         height: scale(60),
//         marginRight: scale(16),


//     },
//     itemDetails: {
//         flex: 1,

//     },
//     itemName: {
//         fontSize: textScale(14),
//         fontWeight: 'bold',
//         color: '#000'
//     },
//     itemCategory: {
//         fontSize: textScale(14),
//         color: '#666',
//     },
//     itemPrice: {
//         fontSize: textScale(14),
//         color: '#333',
//         marginTop: scale(4),
//     },
// });















import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Image, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { scale, textScale } from '../styles/responsiveSize';
import NoDataFound from '../Components/NoDataFound';
import Units from '../Components/Units';
import { Addtocartaction, Cartget, searchItemMethod } from '../redux/actions/UserAction';
import { BASE_URL } from '../apiEndpoints/Base_Url';

const Search = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const colors = useTheme().colors;
    const { storeId, saasId, id } = useSelector(state => state?.auth?.data?.customer_data);


    const product = useSelector(state => state?.auth?.data?.customer_data);
    const searchResponse = useSelector(state => state?.product?.search);

    const [weights, setWeights] = useState({}); // Store selected weights for each item
    const [refreshFlatList, setRefreshFlatList] = useState(false); // To trigger FlatList re-render

    const searchItem = (search) => {
        dispatch(searchItemMethod(product?.storeId, product?.saasId, search));
    };

    const handleWeightChange = (weight, itemId) => {
        setWeights(prev => {
            const updatedWeights = { ...prev, [itemId]: weight };
            setRefreshFlatList(!refreshFlatList); // Toggle refreshFlatList
            return updatedWeights;
        });
    };

    const renderItem = useCallback(({ item }) => {
        const originalPrice = item?.actual_price || 0;
        const discountedPrice = item?.price || 0;

        const discountAmount = originalPrice - discountedPrice;
        const percentageOff = originalPrice > 0 ? ((discountAmount / originalPrice) * 100).toFixed(0) + "%" : "0%";

        const currentWeight = weights[item?.item_id] || 1000; // Default to 1000g
        const finalPrice = Math.round((currentWeight / 1000) * (item?.price || 0)) || item?.price;

        const storeData = async () => {
            const weight = currentWeight / 1000;

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
                saas_id: saasId,
                store_id: storeId,
                promoId: item?.promo_id,
                item_quantity: item?.product_qty,
                gram: currentWeight,
                hsnCode: item?.hsn_code,
                taxRate: item?.tax_rate,
                taxCode: item?.tax_code,
                taxPercent: item?.tax_percent,
                actual_price: item?.actual_price
            });
            console.log('Store Data:', body);

            const res = await dispatch(
                Addtocartaction(body, product?.saasId, product?.storeId, product?.id),
            );

            if (res?.status) {
                await dispatch(Cartget(product?.saasId, product?.storeId, product?.id));
            }
        };

        return (
            <Pressable onPress={() => navigation.push('ItemDetails', { item, totalOff: percentageOff })}>
                <View style={styles.itemContainer}>
                    <Image
                        source={{ uri: `${BASE_URL}item/get-image/${item.item_id}?key=${new Date()}` }}
                        style={styles.itemImage}
                    />
                    <View style={styles.itemDetails}>
                        <Text numberOfLines={1} style={styles.itemName}>
                            {item?.item_name?.charAt(0).toUpperCase() + item?.item_name?.slice(1)}
                        </Text>
                        <Text numberOfLines={1} style={[styles.itemPrice, { textDecorationLine: 'line-through' }]}>
                            {item?.actual_price > 0 ? `₹${item?.actual_price}` : ''}
                        </Text>
                        <Text numberOfLines={1} style={styles.itemPrice}>
                            Price: ₹{finalPrice}
                        </Text>
                    </View>
                    <View style={{ gap: 10 }}>

                        <Pressable
                            onPress={storeData}
                            style={{
                                backgroundColor: colors.YellowBtn,
                                paddingHorizontal: 8,
                                paddingVertical: 2,
                                borderRadius: 8,
                                alignSelf: 'center',
                            }}
                        >
                            <Text numberOfLines={1} style={[styles.itemPrice, { fontWeight: '500' }]}>
                                Add to Cart
                            </Text>
                        </Pressable>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>
                            <Units title="Weight" onSelect={(weight) => handleWeightChange(weight, item?.item_id)} />
                        </View>
                    </View>

                </View>
            </Pressable>
        );
    }, [weights]); // Add weights as a dependency

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.searchContainer}>
                <Icon name="magnify" style={styles.searchIcon} color="#000" />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="grey"
                    onChangeText={(text) => searchItem(text)}
                    style={styles.searchInput}
                    autoFocus
                />
            </View>
            <View style={styles.container}>
                {searchResponse && searchResponse.length > 0 ? (
                    <FlatList
                        data={searchResponse}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        extraData={refreshFlatList} // Ensure FlatList re-renders
                    />
                ) : (
                    <NoDataFound text="No Search Results" iconName="text-search" iconSize={30} />
                )}
            </View>
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: scale(8),
        marginHorizontal: scale(8),
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        borderWidth: 1.5,
        borderColor: '#C1C1E2',
        alignItems: 'center',
        marginHorizontal: scale(8),
        borderRadius: scale(10),
        borderBottomWidth: 3,
        backgroundColor: '#fff',
    },
    searchIcon: {
        fontSize: 25,
        left: 5,
    },
    searchInput: {
        fontSize: textScale(18),
        paddingLeft: scale(8),
        flex: 1,
        color: '#000',
        backgroundColor: '#fff',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#C1C1E2',
        paddingVertical: scale(12),
        backgroundColor: '#fff',
    },
    itemImage: {
        width: scale(60),
        height: scale(60),
        marginRight: scale(16),
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: textScale(14),
        fontWeight: 'bold',
        color: '#000',
    },
    itemPrice: {
        fontSize: textScale(14),
        color: '#333',
        marginTop: scale(4),
    },
});
