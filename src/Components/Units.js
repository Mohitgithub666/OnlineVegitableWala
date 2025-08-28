import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { moderateScale } from './Matrics';
import { getDataInDB } from '../styles/utils/commonFunctions';

export default function Units({ title = 'Select Weight', onSelect }) {
  const [visible, setVisible] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [weightOptions, setWeightOptions] = useState([]);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const handleSelect = weight => {
    setSelectedWeight(weight);
    hideMenu();
    if (onSelect) {
      onSelect(weight);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const retrievedArray = await getDataInDB('UOM');
      setWeightOptions(retrievedArray || [50, 100, 250, 500, 750]);
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  // Specify only the required weight options
  // const weightOptions = [50, 100, 250, 500, 750];

  return (
    <View
      style={{
        backgroundColor: '#fff',
      }}>
      <Menu
        visible={visible}
        anchor={
          <TouchableOpacity onPress={showMenu}>
            <Text
              style={{
                color: '#000', // marginTop: 10,
                fontSize: 14,
                fontWeight: '700',
                textDecorationLine: 'none',
                borderWidth: 2,
                borderColor: 'green',
                borderRadius: 15,
                padding: 6,
              }}>
              {selectedWeight ? `${selectedWeight} gms` : title}
            </Text>
          </TouchableOpacity>
        }
        onRequestClose={hideMenu}>
        {weightOptions?.map((weight, index) => (
          <MenuItem key={index} onPress={() => handleSelect(weight)}>
            <Text style={{ color: '#000' }}>{weight} gms</Text>
          </MenuItem>
        ))}
        <MenuDivider />
      </Menu>
    </View>
  );
}
