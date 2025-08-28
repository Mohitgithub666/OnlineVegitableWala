import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { scale, textScale } from '../styles/responsiveSize';
import { useDispatch, useSelector } from 'react-redux';
import { ViewOrderDetailsMethod, ViewOrderMethod } from '../redux/actions/UserAction';
import { BASE_URL } from '../apiEndpoints/Base_Url';
import Headers from './Headers';
import { moderateScale } from './Matrics';


const RenderViewOrder = ({ route }) => {
    const dispatch = useDispatch()
    const product = useSelector(state => state?.auth?.data?.customer_data);
    const ViewOrderDetailsListArrayData = useSelector(state => state?.product?.ViewOrderDetailsList);

    const userId = product?.id
    const { orderId } = route?.params

    const getViewOrders = async () => {
        dispatch(ViewOrderMethod(product?.storeId, product?.saasId, userId));
    }

    useEffect(() => {
        getViewOrders()
    }, [])

    useEffect(() => {
        dispatch(ViewOrderDetailsMethod(product?.storeId, product?.saasId, orderId));

    }, [])


    const getTotalOrderValue = () => {
        const orderValues = ViewOrderDetailsListArrayData.map(order => order.item_price);
        const sumOrderValue = orderValues.reduce((total, value) => total + value, 0);
        return sumOrderValue

    }
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };



    return (
        <>
            <Headers
                title={orderId}
                quantity={ViewOrderDetailsListArrayData?.length}
            />
            <View style={{ flex: 1 }}>
                <FlatList
                    data={ViewOrderDetailsListArrayData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                margin: 'auto',
                                borderBottomWidth: 1,
                                borderBlockColor: '#C1C1E2',
                                marginHorizontal: scale(10),
                                minHeight: moderateScale(80)
                            }}>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    marginBottom: 10,
                                    flex: 1
                                }}>
                                <View
                                    style={{
                                        height: scale(60),
                                        width: scale(60),

                                    }}>


                                    <Image
                                        source={{
                                            uri: `${BASE_URL}item/get-image/${item.item_id}`
                                            // uri: `${BASE_URL}item/get-image/${item.item_id}?${new Date().getTime()}`
                                        }}
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            borderRadius: 8,
                                        }}
                                    />
                                </View>
                                <View
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginLeft: 20,
                                        justifyContent: 'center',

                                    }}>
                                    <Text
                                        numberOfLines={1}
                                        style={{ fontSize: 14, fontWeight: 400, alignSelf: 'flex-start', fontWeight: 'bold', color: '#000' }}>
                                        {capitalizeFirstLetter(item?.item_name)}
                                    </Text>
                                    {/* <Text style={{ fontSize: 13, fontWeight: 400, alignSelf: 'flex-start', color: '#000' }}>Category:{item.category}</Text> */}
                                    <Text style={{ fontSize: 13, fontWeight: 400, alignSelf: 'flex-start', color: '#000' }}>Quantity:{item.bill_qty}</Text>
                                </View>
                            </View>

                            <View style={{ justifyContent: 'flex-end', alignSelf: 'center', marginRight: scale(4), }}>
                                <Text
                                    numberOfLines={2}
                                    style={{
                                        fontSize: textScale(18),
                                        fontWeight: 400,
                                        marginLeft: scale(120),
                                        color: 'grey'

                                    }}
                                >₹{item.item_price}</Text>

                            </View>
                        </View>
                    )}
                />


            </View>

            {/* Total */}
            <View
                style={{
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                    borderTopColor: '#EEE',
                    marginBottom: scale(10)
                }}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <View style={{ marginLeft: 30 }}>
                        <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 10 }}>
                            Total:
                        </Text>

                    </View>
                    <View style={{ marginRight: 30, marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, marginTop: 20, }}>
                            ₹{getTotalOrderValue()}
                        </Text>
                    </View>
                </View>
            </View>
        </>
    )
}

export default RenderViewOrder

const styles = StyleSheet.create({})







