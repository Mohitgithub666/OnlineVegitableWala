import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Products = () => {
  const data = [
    {
      id: 1,
      name: 'Product 1',
      img: 'https://images.unsplash.com/photo-1586640167802-8af12bf651fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1682&q=80',
    },
    {
      id: 2,
      name: 'Product 2',
      img: 'https://images.unsplash.com/photo-1586640167802-8af12bf651fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1682&q=80',
    },
    {
      id: 3,
      name: 'Product 3',
      img: 'https://images.unsplash.com/photo-1586640167802-8af12bf651fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1682&q=80',
    },
    {
      id: 4,
      name: 'Product 4',
      img: 'https://images.unsplash.com/photo-1586640167802-8af12bf651fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1682&q=80',
    },
    {
      id: 5,
      name: 'Product 5',
      img: 'https://images.unsplash.com/photo-1586640167802-8af12bf651fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1682&q=80',
    },
    {
      id: 6,
      name: 'Product 6',
      img: 'https://images.unsplash.com/photo-1586640167802-8af12bf651fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1682&q=80',
    },
    {
      id: 7,
      name: 'Product 7',
      img: 'https://images.unsplash.com/photo-1586640167802-8af12bf651fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1682&q=80',
    },
    {
      id: 8,
      name: 'Product 8',
      img: 'https://images.unsplash.com/photo-1586640167802-8af12bf651fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1682&q=80',
    },
    {
      id: 9,
      name: 'Product 9',
      img: 'https://images.unsplash.com/photo-1586640167802-8af12bf651fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1682&q=80',
    },
    {
      id: 10,
      name: 'Product 10',
      img: 'https://images.unsplash.com/photo-1586640167802-8af12bf651fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1682&q=80',
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.header_text}>Create Your Order</Text>p
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  header_text: {
    fontSize: 25,
    fontWeight: '500',
  },
});
