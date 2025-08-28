// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';
// import { useDispatch, useSelector } from 'react-redux';
// import { cityAction, getCity } from '../redux/actions/AuthAction';
// import * as ActionTypes from '../redux/actionTypes';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



// const DropdownCompo = ({ }) => {
//     const [value, setValue] = useState(null);
//     const [isFocus, setIsFocus] = useState(false);
//     const [searchQuery, setSearchQuery] = useState();
//     const [searchResults, setSearchResults] = useState([]);
//     const dispatch = useDispatch()
//     const cityArray = useSelector(state => state?.auth?.city);
//     console.log("DropdownCompo", cityArray)


    
//     const fetchData = async () => {
//         dispatch(getCity(searchQuery))
//     };
//     const renderLabel = () => {
//         if (value || isFocus) {
//             return (
//                 <Text style={[styles.label, isFocus && { color: 'grey' }]}>
//                     City Name
//                 </Text>
//             );
//         }
//         return null;
//     };


//     return (
//         <View style={styles.container}>
//             {renderLabel()}


//             <Dropdown
//                 style={[styles.dropdown, isFocus && { borderColor: 'grey', borderWidth: 2 }]}
//                 placeholderStyle={styles.placeholderStyle}
//                 selectedTextStyle={styles.selectedTextStyle}
//                 inputSearchStyle={styles.inputSearchStyle}
//                 iconStyle={styles.iconStyle}
//                 data={cityArray && cityArray || []}
//                 search
//                 maxHeight={300}
//                 labelField="city"
//                 valueField="city"
//                 placeholder={!isFocus ? 'Select city' : ''}
//                 searchPlaceholder="Search"
//                 value={value}
//                 onFocus={() => setIsFocus(true)}
//                 onBlur={() => setIsFocus(false)}
//                 onChange={(item) => {
//                     setValue(item);
//                     setIsFocus(false);
//                     setSearchQuery()
//                     dispatch({
//                         type: ActionTypes.SELECTEDCITY,
//                         payload: item,
//                     });

//                 }
//                 }
//                 renderLeftIcon={() => (
//                     <MaterialCommunityIcons name={'city'} size={20} color={isFocus ? 'grey' : 'grey'} style={styles.icon} />
//                 )}
//                 onChangeText={(item) => {
//                     fetchData(item)
//                     setSearchQuery(item)
//                 }
//                 }
//             />

//         </View>
//     );
// };

// export default DropdownCompo;

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: 'white',
//         padding: 20,
//         paddingHorizontal: 20
//     },
//     dropdown: {
//         height: 50,
//         borderColor: 'black',
//         borderWidth: 1,
//         borderRadius: 8,
//         paddingHorizontal: 8,
//     },
//     icon: {
//         marginRight: 5,
//     },
//     label: {
//         position: 'absolute',
//         backgroundColor: 'white',
//         left: 22,
//         top: 8,
//         zIndex: 999,
//         paddingHorizontal: 8,
//         fontSize: 14,
//     },
//     placeholderStyle: {
//         fontSize: 16,
//     },
//     selectedTextStyle: {
//         fontSize: 16,
//         // marginLeft:5
//     },
//     iconStyle: {
//         width: 20,
//         height: 20,
//     },
//     inputSearchStyle: {
//         height: 40,
//         fontSize: 16,
//     },
// });









//////////////////
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { cityAction, getCity } from '../redux/actions/AuthAction';
import * as ActionTypes from '../redux/actionTypes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const DropdownCompo = ({ }) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [searchQuery, setSearchQuery] = useState();
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch()
    const cityArray = useSelector(state => state?.auth?.city);


    
    const fetchData = async () => {
        dispatch(getCity(searchQuery))
    };
    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'grey' }]}>
                    City Name
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
                data={cityArray && cityArray || []}
                search
                maxHeight={300}
                labelField="city"
                valueField="city"
                placeholder={!isFocus ? 'Select city' : ''}
                searchPlaceholder="Search"
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                    setValue(item);
                    setIsFocus(false);
                    setSearchQuery()
                    dispatch({
                        type: ActionTypes.SELECTEDCITY,
                        payload: item,
                    });

                }
                }
                renderLeftIcon={() => (
                    <MaterialCommunityIcons name={'city'} size={20} color={isFocus ? 'grey' : 'grey'} style={styles.icon} />
                )}
                onChangeText={(item) => {
                    fetchData(item)
                    setSearchQuery(item)
                }
                }
            />

        </View>
    );
};

export default DropdownCompo;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        paddingHorizontal: 20
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
        // marginLeft:5
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