import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';

export default function AddressTextInput(props) {
  const { placeholder, onChangeText, autoFocus, keyboardType, value } = props;
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        placeholderTextColor={'#808080'}
        style={{
          borderWidth: 0.5,
          borderRadius: 5,
          height: 40,
          paddingHorizontal: 10,
          color: 'grey',
          marginHorizontal: 16

        }}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
