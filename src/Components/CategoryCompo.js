import React, {useMemo} from 'react';
import {StyleSheet, Text, View, FlatList, Pressable, Image} from 'react-native';
import {moderateScale, scale} from '../styles/responsiveSize';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {BASE_URL} from '../apiEndpoints/Base_Url';

const CategoryCompo = () => {
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

  // Memoized category data (only first 6 categories)
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
                  uri: `${BASE_URL}Master-category/get-master-image/${
                    item.masterCategoryId
                  }?key=${new Date()}`,
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <Text
              numberOfLines={1}
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
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryButton: {
    borderRadius: 10,
    padding: 6,
    width: moderateScale(80), // Reduced width to fit 4 categories on screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: scale(9), // Smaller text
    marginTop: 2,
  },
  imageContainer: {
    borderRadius: 100,
    overflow: 'hidden',
    height: scale(40), // Smaller image
    width: scale(40),
    backgroundColor: '#ccc',
  },
  image: {
    borderRadius: 100,
    backgroundColor: '#FFF',
    height: scale(40),
    width: scale(40),
  },
  separator: {
    width: 8, // Space between categories
  },
});

export default CategoryCompo;
