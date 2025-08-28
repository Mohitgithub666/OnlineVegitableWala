import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { scale } from '../styles/responsiveSize';
import { useDispatch, useSelector } from 'react-redux';
import { SubCategoryItems } from '../redux/actions/UserAction';
import { BASE_URL } from '../apiEndpoints/Base_Url';
import * as ActionTypes from '../redux/actionTypes';



const NoData = () => {
    return (
        <View style={{ backgroundColor: '#FFF', flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '700' }}>No Items</Text>
        </View>
    )
}

const SubCategoryListRender = ({ item }) => {
    const [loding, setLoading] = useState(false)
    const dispatch = useDispatch()
    const imageUrl = `${BASE_URL}category/get-category-image/${item.id}?key=${new Date()}`;
    const selectedSubCategory = useSelector(state => state?.product?.selectedSubCategory);


    const fetchData = async (category) => {
        await dispatch({
            type: ActionTypes.SUBCATEGORYITEMPAGE,
            payload: 1,
        });
        setLoading(true)
        const subCategoryItemsResp = await dispatch(SubCategoryItems(category))
        // await dispatch({
        //     type: ActionTypes.SELECTEDSUBCATEGORY,
        //     payload: item?.category,
        // });
        await dispatch({
            type: ActionTypes.SELECTEDSUBCATEGORY,
            payload: subCategoryItemsResp?.data?.[0]?.category,
        });

        setLoading(false)
    }

    return (
        <Pressable style={[styles.itemContainer, { backgroundColor: selectedSubCategory == item?.category ? "#eeeeee" : '#fff' }]}
            onPress={() => {
                fetchData(item?.category)
            }
            }
        >
            {/* <Pressable style={[styles.itemContainer,]}> */}
            <Image
                source={{ uri: imageUrl }}
                style={styles.img}
                resizeMode='cover'
            />
            <Text style={styles.title} numberOfLines={2}>{item.category}</Text>
        </Pressable>
    );
};

const SubCategoryList = () => {
    const subCategoryDataData = useSelector(state => state?.product?.subCategoryData);
    const selectedSubCategory = useSelector(state => state?.product?.selectedSubCategory);
    const selectedMasterCategory = useSelector(state => state?.product?.selectedMasterCategory);
    const memoizedSubCategoryDataData = useMemo(() => {
        return subCategoryDataData;
    }, [subCategoryDataData]);


    return (
        <View style={styles.container}>
            {
                memoizedSubCategoryDataData?.length == 0 ?
                    <>{NoData()}</>
                    :

                    <FlashList
                        data={memoizedSubCategoryDataData || []}
                        keyExtractor={(item, index) => item.id || index}
                        renderItem={({ item }) => <SubCategoryListRender item={item} selected={selectedSubCategory} />}
                        estimatedItemSize={50} // Optional: Estimate the height of an item for better performance
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        contentContainerStyle={styles.contentContainer}
                    />
            }
        </View>
    );
};

export default SubCategoryList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    itemContainer: {
        padding: 10,
        height: 80,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        borderColor: '#000',
        // backgroundColor: 'pink',
        backgroundColor: '#fff',
        elevation: 8,
        marginVertical: 2

    },
    img: {
        height: 50,
        width: 50,
        borderWidth: 0.5,
        borderRadius: 50

    },
    title: {
        fontSize: scale(10),
        fontWeight: '700',
        textAlign: 'center'
    },
    separator: {
        // height: 10
    },
    contentContainer: {
        paddingBottom: 4,

    },

});
