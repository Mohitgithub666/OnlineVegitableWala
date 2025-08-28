import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import RollingBar from 'react-native-rolling-bar';
import {scale} from '../styles/responsiveSize';

const RollingBarCompo = () => {
  const [paused, setPaused] = useState(false);

  const messages = [
    '🔴 For kg click Add',
    '⚖️ For grams, select weight first',
    '🛒 Add items to your cart',
    // '📦 Free delivery on orders above $50',
    '🚀 Fast checkout available!',
    '💰 Save more with exclusive deals!',
  ];

  return (
    <TouchableOpacity onPress={() => setPaused(!paused)}>
      <RollingBar interval={2000} paused={paused}>
        {messages.map((msg, index) => (
          <Text
            key={index}
            style={[styles.note, {color: index % 2 === 0 ? 'red' : 'blue'}]}>
            {msg}
          </Text>
        ))}
      </RollingBar>
    </TouchableOpacity>
  );
};

export default RollingBarCompo;

const styles = StyleSheet.create({
  note: {
    fontSize: scale(12),
    marginTop: 4,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
