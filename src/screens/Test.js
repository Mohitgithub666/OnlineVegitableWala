import {View, Text, Button} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {GetMasterCategory, ProductAction} from '../redux/actions/UserAction';

const Test = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <Text>Test</Text>
      <Button title="hjkl" onPress={() => dispatch(GetMasterCategory())} />
    </View>
  );
};

export default Test;
