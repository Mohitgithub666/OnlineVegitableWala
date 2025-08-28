import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';

const Buttons = ({ titel, onPress, style, bgColor, textStyle, disabled, fontSize = 18, isloading = false }) => {
  const colors = useTheme().colors;

  return (
    <View>
      <TouchableOpacity
        style={[{
          // backgroundColor: '#ECE447',
          backgroundColor: disabled ? '#CCCCCC' : "#ECE447",
          width: '90%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          marginLeft: 20,
          marginBottom: 14,
          height: 40,

        }, style]}
        activeOpacity={disabled && 1}
        onPress={disabled ? null : onPress} // Disable the button if disabled is true


      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {
            isloading ?
              <ActivityIndicator size={20} />
              :
              <Text
                style={[{
                  color: '#1E1E1E',
                  fontSize: fontSize,
                  fontWeight: 'bold',
                }, textStyle]}>
                {titel}
              </Text>
          }


        </View>
      </TouchableOpacity>
    </View >
  );
};

export default Buttons;

const styles = StyleSheet.create({});

