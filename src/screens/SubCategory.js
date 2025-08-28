import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, memo } from 'react';
import { width } from '../styles/responsiveSize';
import SubCategoryList from '../Components/SubCategoryList';
import SubCategoryItemList from '../Components/SubCategoryItemList';
import Loader from '../Components/Loader';
import Headers from '../Components/Headers';
import { useDispatch, useSelector } from 'react-redux';
import { GetSubCategory, SubCategoryItems } from '../redux/actions/UserAction';
import { showToast } from '../styles/utils/toast';
import * as ActionTypes from '../redux/actionTypes';


const SubCategory = (props) => {
    const { masterCategoryId, masterCategoryName } = props?.route?.params?.item;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

  
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const startTime = performance.now();

            try {
                const subCategoryResp = await dispatch(GetSubCategory(masterCategoryId));
                // console.log("subCategoryResp", subCategoryResp, subCategoryResp?.data == null);

                if (subCategoryResp?.status) {
                    const subCategory = subCategoryResp.data[0]?.category;
                    if (subCategory) {
                        const subCategoryItemsResp = await dispatch(SubCategoryItems(subCategory));
                        await dispatch({
                            type: ActionTypes.SELECTEDSUBCATEGORY,
                            payload: subCategoryItemsResp?.data?.[0]?.category,
                        });

                        if (subCategoryItemsResp?.status) {
                            setLoading(false);
                            const endTime = performance.now();
                            // console.log(`fetchData function executed in ${(endTime - startTime) / 1000} seconds.`);
                            return;
                        }
                    }
                }
                showToast("No Sub Category Or their data Available");
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
                setLoading(false);
                const endTime = performance.now();
                // console.log(`fetchData function executed in ${(endTime - startTime) / 1000} seconds.`);
            }
        };

        fetchData();
    }, [dispatch, masterCategoryId]);


    return (
        <>
            <Headers title='Category' showBack={true} />
            <View style={styles.container}>
                {!loading ? (
                    <>
                        <View style={styles.containerLeft}>
                            <MemoizedSubCategoryList />
                        </View>
                        <View style={styles.containerRight}>
                            <MemoizedSubCategoryItemList />
                        </View>
                    </>
                ) : (
                    <View style={styles.loader}>
                        <Loader isLoading={loading} size={40} />
                    </View>
                )}
            </View>
        </>
    );
};

const MemoizedSubCategoryList = memo(SubCategoryList);
const MemoizedSubCategoryItemList = memo(SubCategoryItemList);

export default SubCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        flexDirection: 'row'
    },
    containerLeft: {
        width: width / 4,
        borderRightWidth: 0.5
    },
    containerRight: {
        backgroundColor: 'green',
        width: width,
        justifyContent: 'center',
    },
    loader: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
