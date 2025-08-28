import React, {useMemo} from 'react';
import {StyleSheet, Text, View, FlatList, Pressable, Image} from 'react-native';
import {moderateScale, scale} from '../styles/responsiveSize';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {BASE_URL} from '../apiEndpoints/Base_Url';

const CategoryCompoY = () => {
  const masterCategoryData = useSelector(
    state => state?.product?.masterCategory,
  );
  const selectedCategoryItems = useSelector(
    state => state?.product?.selectedcategoryItems,
  );
  const navigation = useNavigation();

  const handleCategoryPress = item => {
    navigation.navigate('SubCategory', {item: item});
  };

  const memoizedmasterCategoryData = useMemo(() => {
    return masterCategoryData || [];
  }, [masterCategoryData]);

  return (
    <View style={styles.container}>
      <FlatList
        data={memoizedmasterCategoryData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Pressable
            onPress={() => handleCategoryPress(item)}
            style={[
              styles.categoryButton,
              {
                backgroundColor:
                  selectedCategoryItems === item?.category_name
                    ? '#ECE447'
                    : '#edf1f7',
              },
            ]}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: `${BASE_URL}Master-category/get-master-image/${item.masterCategoryId}`,
                }}
                style={styles.image}
              />
            </View>
            <Text
              numberOfLines={2}
              style={[
                styles.textStyle,
                {
                  color:
                    selectedCategoryItems === item?.category_name
                      ? '#000'
                      : '#555',
                },
              ]}>
              {item.masterCategoryName}
            </Text>
          </Pressable>
        )}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
  },
  categoryButton: {
    borderRadius: 8,
    padding: 6,
    width: moderateScale(110), // Reduced width
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    marginBottom: 10,
  },
  textStyle: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: scale(10), // Reduced font size
    marginTop: 2, // Reduced margin
  },
  imageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    height: scale(80), // Reduced size
    width: scale(80), // Reduced size
    backgroundColor: '#ccc',
  },
  image: {
    borderRadius: 50,
    backgroundColor: '#FFF',
    height: '100%',
    width: '100%',
  },
});

export default CategoryCompoY;
