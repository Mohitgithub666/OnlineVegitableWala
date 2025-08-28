// import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
// import React, { useMemo, useState } from 'react'
// import { scale, width } from '../styles/responsiveSize';
// import FastImage from 'react-native-fast-image';
// import Buttons from './Buttons';
// import { useDispatch, useSelector } from 'react-redux';
// import { BASE_URL } from '../apiEndpoints/Base_Url';
// import { Addtocartaction, Cartget, SubCategoryItems } from '../redux/actions/UserAction';
// import * as ActionTypes from '../redux/actionTypes';
// import { showToast,  } from '../styles/utils/toast';
// import { useNavigation } from '@react-navigation/native';



// const NoData = () => {
//     return (
//         <View style={{ backgroundColor: '#FFF', flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
//             <Text style={{ marginRight: 120, fontSize: 18, fontWeight: '700', color: '#000' }}>No Items</Text>
//         </View>

//     )
// }

// const SubCategoryItemListRender = ({ item }) => {
//     const dispatch = useDispatch();
//     const navigation = useNavigation()
//     const { storeId, saasId, id } = useSelector(state => state?.auth?.data?.customer_data);
//     const storeData = async item => {

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
//             new_price: item?.price,
//             discount: item?.discount,
//             status: item?.status,
//             department: 'no departments',
//             saas_id: saasId,
//             store_id: storeId,
//             promoId: item?.promo_id,
//             item_quantity: item?.product_qty,
//             hsnCode: item?.hsn_code,
//             taxRate: item?.tax_rate,
//             taxCode: item?.tax_code,
//             taxPercent: item?.tax_percent,
//             actual_price: item?.actual_price
//         });

//         const res = await dispatch(
//             Addtocartaction(body, saasId, storeId, id)
//         );
//         if (res?.status) {
//             await dispatch(Cartget(saasId, storeId, id));
//         }

//     }
//     if (item?.price !== undefined && item?.actual_price !== undefined) {
//         const originalPrice = item.actual_price;
//         const discountedPrice = item.price;

//         const discountAmount = originalPrice - discountedPrice;
//         const percentageOff = (discountAmount / originalPrice) * 100;

//         var totalOff = percentageOff.toFixed(0) + "%";
//     } else {
//         showToast("Prices are not defined or null.");
//     }



//     return (
//         <Pressable style={styles.itemContainer}
//             onPress={() => navigation.push('ItemDetails', { item: item, totalOff: totalOff })}
//         >


//             <FastImage
//                 source={{ uri: `${BASE_URL}item/get-image/${item.item_id}` }}
//                 style={styles.img}
//                 resizeMode='contain'
//             />



//             <View style={{ width: '100%', gap: 6, height: 65 }}>

//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                     <Text style={[styles.price, { textDecorationLine: 'line-through', fontSize: scale(14), color: '#ccc' }]}>{item?.actual_price > item.price ? ' ₹' : null}{item?.actual_price > item.price ? item?.actual_price : ''}</Text>
//                     <Text style={styles.price}>₹{item?.price}</Text>
//                 </View>
//                 <Text style={styles.title} numberOfLines={2}>{item.title}{item?.item_name}</Text>
//             </View>

//             {/* STock */}
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 6 }}>
//                 {
//                     item?.stock == 0 ?
//                         <Text style={{ alignSelf: 'flex-start', paddingHorizontal: 6, color: 'grey', borderRadius: 4, fontSize: 12, backgroundColor: '#edf1f7' }}>OOS</Text>
//                         :
//                         <Text style={{ alignSelf: 'flex-start', paddingHorizontal: 6, color: 'grey', borderRadius: 4, fontSize: 12, }}></Text>
//                 }

//                 {
//                     totalOff == '-Infinity%' ?
//                         <Text style={{ alignSelf: 'flex-end', paddingHorizontal: 6, color: '#FFF', borderRadius: 4, fontSize: 12 }}></Text>
//                         :
//                         <Text style={{ alignSelf: 'flex-end', backgroundColor: item?.actual_price > item?.price ? '#008000' : '#FFF', paddingHorizontal: 6, color: '#FFF', borderRadius: 4, fontSize: 12 }}>{item?.actual_price > item?.price ? totalOff : null}</Text>
//                 }

//             </View>
//             <Pressable style={styles.button} onPress={() => storeData(item)}>
//                 <Text style={styles.buttonTitle}>Add</Text>
//             </Pressable>
//         </Pressable>
//     );
// };

// const SubCategoryItemList = () => {
//     const { subCategoryItemsPage, subCategoryItemsTotalPage, selectedSubCategory } = useSelector(state => state?.product);
//     const subCategoryItemsData = useSelector(state => state?.product?.subCategoryItemsData);
//     const [loder, setLoder] = useState(false)
//     const dispatch = useDispatch()


//     const memoizedsubCategoryItemsData = useMemo(() => {
//         return subCategoryItemsData;
//     }, [subCategoryItemsData]);

//     const loadMoreData = async () => {

//         if (subCategoryItemsTotalPage > subCategoryItemsPage) {
//             setLoder(true)
//             await dispatch({
//                 type: ActionTypes.SUBCATEGORYITEMPAGE,
//                 payload: subCategoryItemsPage + 1,
//             });
//             await dispatch(SubCategoryItems(selectedSubCategory))
//             setLoder(false)
//         } else {
//             showToast("No More Data")
//         }
//     }

//     const Footer = () => {

//         return (
//             <View>
//                 {
//                     loder ? <ActivityIndicator size="large" color="#0000ff" />
//                         :
//                         <Buttons titel={'Load more'} onPress={() => loadMoreData()} textStyle={{ fontSize: 12 }} />
//                 }
//             </View>
//         )
//     }



//     return (
//         <View style={styles.container}>
//             {
//                 memoizedsubCategoryItemsData?.length == 0 ?
//                     <>{NoData()}</>
//                     :
//                     <FlatList
//                         data={memoizedsubCategoryItemsData || []}
//                         keyExtractor={(item, index) => item.id || index}
//                         renderItem={({ item }) => <SubCategoryItemListRender item={item} />}
//                         numColumns={2}
//                         contentContainerStyle={styles.contentContainer}
//                         ListEmptyComponent={() => NoData()}
//                         ListFooterComponent={<Footer />}
//                         ListFooterComponentStyle={{ alignSelf: 'center', marginRight: 140 }}
//                     />
//             }
//         </View>

//     )
// }

// export default SubCategoryItemList

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFF',

//     },
//     itemContainer: {
//         padding: 10,
//         borderBottomColor: '#ccc',
//         height: 260,
//         width: width / 2.9,
//         elevation: 6,
//         backgroundColor: '#fff',
//         marginHorizontal: 6,
//         marginVertical: 6,
//         alignItems: 'center',
//         gap: 10,
//         borderRadius: 8



//     },
//     contentContainer: {
//         backgroundColor: '#FFF',
//         justifyContent: 'center',
//         alignItems: 'flex-start',
//         paddingBottom: 4
//     },
//     img: {
//         height: 100,
//         width: 110,
//         borderWidth: 1,
//         borderRadius: 8

//     },
//     title: {
//         fontSize: scale(12),
//         fontWeight: '700',
//         textAlign: 'left',
//         color: '#000'
//     },
//     price: {
//         fontSize: scale(16),
//         fontWeight: '700',
//         textAlign: 'left',
//         color: 'green'
//     },
//     button: {
//         backgroundColor: '#fff',
//         padding: 4,
//         paddingHorizontal: 8,
//         width: 100,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 8,
//         borderWidth: 1,
//         elevation: 4
//     },
//     buttonTitle: {
//         fontSize: scale(14),
//         fontWeight: '700',
//         color: '#000'
//     },
// });










///////////////
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { scale, width } from '../styles/responsiveSize';

import Buttons from './Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../apiEndpoints/Base_Url';
import { Addtocartaction, Cartget, SubCategoryItems } from '../redux/actions/UserAction';
import * as ActionTypes from '../redux/actionTypes';
import { showToast, } from '../styles/utils/toast';
import { useNavigation } from '@react-navigation/native';
import Units from './Units';
import { moderateScale } from './Matrics';



const NoData = () => {
    return (
        <View style={{ backgroundColor: '#FFF', flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ marginRight: 120, fontSize: 18, fontWeight: '700', color: '#000' }}>No Items</Text>
        </View>

    )
}

const SubCategoryItemListRender = ({ item }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const { storeId, saasId, id } = useSelector(state => state?.auth?.data?.customer_data);
    const [weights, setWeights] = useState({}); // Store selected weights for each item

    const storeData = async ({ item, finalPrice, currentWeight }) => {
        const weight = (currentWeight / 1000)

        let body = JSON.stringify({
            item_id: item?.item_id,
            item_name: item?.item_name,
            category: item?.category,
            message: 'This is an example cart item.',
            itemCode: null,
            sku: 'SKU123',
            description: item?.item_name,
            // price: item?.price,
            price: finalPrice,
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
            gram: currentWeight,

        });

        const res = await dispatch(
            Addtocartaction(body, saasId, storeId, id)
        );
        if (res?.status) {
            await dispatch(Cartget(saasId, storeId, id));
        }

    }
    if (item?.price !== undefined && item?.actual_price !== undefined) {
        const originalPrice = item.actual_price;
        const discountedPrice = item.price;

        const discountAmount = originalPrice - discountedPrice;
        const percentageOff = (discountAmount / originalPrice) * 100;

        var totalOff = percentageOff.toFixed(0) + "%";
    } else {
        showToast("Prices are not defined or null.");
    }

    const handleWeightChange = (weight) => {
        setWeights(prev => ({ ...prev, [item.item_id]: weight }));
    };

    const selectedWeight = (weight) => {
        if (weight) {
            const priceByWeight = (weight / 1000) * item?.price; // converting grams to kg and calculating price
            // console.log(`Selected weight: ${weight} gms, Final Price: ₹${Math.round(priceByWeight)}`);
            return Math.round(priceByWeight);
        } else {
            return item?.price;
        }
    };

    const currentWeight = weights[item.item_id] || 1000; // Default to 1000g if not set
    const finalPrice = selectedWeight(currentWeight) || item?.price


    return (
        <Pressable style={styles.itemContainer}
            onPress={() => navigation.push('ItemDetails', { item: item, totalOff: totalOff })}
        >


            <Image
                source={{ uri: `${BASE_URL}item/get-image/${item.item_id}` }}
                style={styles.img}
                resizeMode='contain'
            />



            <View style={{ width: '100%', gap: 6, height: 65 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.price, { textDecorationLine: 'line-through', fontSize: scale(14), color: '#ccc' }]}>{item?.actual_price > item.price ? ' ₹' : null}{item?.actual_price > item.price ? item?.actual_price : ''}</Text>
                    {/* <Text style={styles.price}>₹{item?.price}</Text> */}
                    <Text style={styles.price}>₹{selectedWeight(currentWeight)}</Text>

                </View>
                <Text style={styles.title} numberOfLines={2}>{item.title}{item?.item_name}</Text>
            </View>

            {/* STock */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 6, width: '100%' }}>
                {
                    item?.stock == 0 ?
                        <Text style={{ alignSelf: 'flex-start', paddingHorizontal: 6, color: 'grey', borderRadius: 4, fontSize: 12, backgroundColor: '#edf1f7' }}>OOS</Text>
                        :
                        <Text style={{ alignSelf: 'flex-start', paddingHorizontal: 6, color: 'grey', borderRadius: 4, fontSize: 12, }}></Text>
                }

                {
                    totalOff == '-Infinity%' ?
                        <Text style={{ alignSelf: 'flex-end', paddingHorizontal: 6, color: '#FFF', borderRadius: 4, fontSize: 12 }}></Text>
                        :
                        <Text style={{ alignSelf: 'flex-end', backgroundColor: item?.actual_price > item?.price ? '#008000' : '#FFF', paddingHorizontal: 6, color: '#FFF', borderRadius: 4, fontSize: 12 }}>{item?.actual_price > item?.price ? totalOff : null}</Text>
                }

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <View style={styles.quantityContainer}>
                    {/* <Text style={[styles.buttonText]}>weight</Text> */}
                </View>
                {item.UOM === "W" ? <Units title="weight" onSelect={handleWeightChange} /> : ""}
            </View>
            <Pressable style={styles.button}
                onPress={() => storeData({ item, finalPrice, currentWeight })}
            >
                <Text style={styles.buttonTitle}>Add</Text>
            </Pressable>
        </Pressable>
    );
};

const SubCategoryItemList = () => {
    const { subCategoryItemsPage, subCategoryItemsTotalPage, selectedSubCategory } = useSelector(state => state?.product);
    const subCategoryItemsData = useSelector(state => state?.product?.subCategoryItemsData);
    const [loder, setLoder] = useState(false)
    const dispatch = useDispatch()


    const memoizedsubCategoryItemsData = useMemo(() => {
        return subCategoryItemsData;
    }, [subCategoryItemsData]);

    const loadMoreData = async () => {

        if (subCategoryItemsTotalPage > subCategoryItemsPage) {
            setLoder(true)
            await dispatch({
                type: ActionTypes.SUBCATEGORYITEMPAGE,
                payload: subCategoryItemsPage + 1,
            });
            await dispatch(SubCategoryItems(selectedSubCategory))
            setLoder(false)
        } else {
            showToast("No More Data")
        }
    }

    const Footer = () => {

        return (
            <View>
                {
                    loder ? <ActivityIndicator size="large" color="#0000ff" />
                        :
                        // <Buttons titel={'Load more'} onPress={() => loadMoreData()} textStyle={{ fontSize: 12 }} />
                        null
                }
            </View>
        )
    }



    return (
        <View style={styles.container}>
            {
                memoizedsubCategoryItemsData?.length == 0 ?
                    <>{NoData()}</>
                    :
                    <FlatList
                        data={memoizedsubCategoryItemsData || []}
                        keyExtractor={(item, index) => item.id || index}
                        renderItem={({ item }) => <SubCategoryItemListRender item={item} />}
                        numColumns={2}
                        contentContainerStyle={styles.contentContainer}
                        ListEmptyComponent={() => NoData()}
                        ListFooterComponent={<Footer />}
                        ListFooterComponentStyle={{ alignSelf: 'center', marginRight: 140 }}
                        // onEndReached={loadMoreData}
                        onEndReachedThreshold={0.2}

                    />
            }
        </View>

    )
}

export default SubCategoryItemList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',

    },
    itemContainer: {
        padding: 10,
        borderBottomColor: '#ccc',
        // height: 260,
        width: width / 2.9,
        elevation: 6,
        backgroundColor: '#fff',
        marginHorizontal: 6,
        marginVertical: 6,
        alignItems: 'center',
        gap: 10,
        borderRadius: 8



    },
    contentContainer: {
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingBottom: 4
    },
    img: {
        height: 100,
        width: 110,
        borderWidth: 1,
        borderRadius: 8

    },
    title: {
        fontSize: scale(12),
        fontWeight: '700',
        textAlign: 'left',
        color: '#000'
    },
    price: {
        fontSize: scale(16),
        fontWeight: '700',
        textAlign: 'left',
        color: 'green'
    },
    button: {
        backgroundColor: '#fff',
        padding: 4,
        paddingHorizontal: 8,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        elevation: 4
    },
    buttonTitle: {
        fontSize: scale(14),
        fontWeight: '700',
        color: '#000'
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
});