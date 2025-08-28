import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BASE_URL } from '../apiEndpoints/Base_Url';
import { useDispatch, useSelector } from 'react-redux';
import * as ActionTypes from '../redux/actionTypes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { showMessage } from 'react-native-flash-message';
import { showToast } from '../styles/utils/toast';


const DropDownSaasIdStoreId = ({ }) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [searchQuery, setSearchQuery] = useState();
    const [searchResults, setSearchResults] = useState([]);
    const selectedCity = useSelector(state => state?.city?.selectedCity);
    const dispatch = useDispatch()


    useEffect(() => {
        fetchData()
    }, [selectedCity])




    const fetchData = async () => {
        const response1 = await fetch(`${BASE_URL}auth/all-store-name/${selectedCity?.city}`);
        const data1 = await response1.json();


        if (data1?.data?.length > 0) {
            setSearchResults(data1?.data)
        } else {
            setValue(null)
            setSearchResults([])
            dispatch({
                type: ActionTypes.BOTHID,
                payload: {},
            });


        }


    };
    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: '#grey' }]}>
                    Store Name
                </Text>
            );
        }
        return null;
    };



    return (
        <View style={styles.container}>
            {renderLabel()}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'grey', borderWidth: 2 }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={searchResults && searchResults || []} // Use search results as data
                search
                maxHeight={300}
                labelField="store_name"
                valueField="store_name"
                placeholder={!isFocus ? 'Select store' : ''}
                searchPlaceholder="Search"
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                    setValue(item);
                    setIsFocus(false);
                    setSearchQuery()
                    dispatch({
                        type: ActionTypes.BOTHID,
                        payload: item,
                    });

                }
                }
                renderLeftIcon={() => (
                    <MaterialCommunityIcons name={'order-numeric-ascending'} size={20} color={isFocus ? 'grey' : 'grey'} style={styles.icon} />
                )}

            />
            {/* {error && (
                <View style={{
                    justifyContent: "flex-start", alignItems: 'flex-start', alignSelf: 'flex-start',
                    // paddingHorizontal: moderateScale(20),
                    // backgroundColor:'green',
                    flex:1

                }}>
                    <Text style={{ color: 'red', fontSize: 12 }}>
                        {error}
                    </Text>
                </View>
            )} */}
            
        </View>
    );
};

export default DropDownSaasIdStoreId;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
    },
    dropdown: {
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
