import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ListModal = ({isVisible, data, onClose, onSelect}) => {
  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onDismiss={onClose}
      animationType="slide"
      transparent={true}>
      <View style={styles.modalContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.title}>Select an Coupon</Text>
          <Pressable onPress={() => onClose()}>
            <MaterialCommunityIcons name={'close'} size={24} color={'grey'} />
          </Pressable>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text
                style={[styles.itemText, {fontWeight: '500', color: '#000'}]}>
                {capitalizeFirstLetter(item?.couponName)}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  onSelect(item);
                }}
                style={styles.button}>
                <Text
                  style={[
                    styles.itemText,
                    {padding: 6, borderRadius: 4, paddingHorizontal: 10},
                  ]}>
                  Apply Coupon
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA', // Light gray background for better contrast
  },
  modal: {
    width: '90%', // Responsive width
    maxWidth: 300, // Maximum width for larger screens
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: '#E1E8F0', // Softer border color
    justifyContent: 'flex-start', // Changed to flex-start for better content alignment
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    marginTop: '66%', // Keep percentage-based height
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#1A1A1A', // Darker text for better readability
    letterSpacing: 0.5,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background for items
  },
  itemText: {
    fontSize: 16,
    color: '#FFF', // Dark gray for better readability
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  button: {
    backgroundColor: '#38A169', // More pleasant green
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    // Added text style for buttons
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default ListModal;
