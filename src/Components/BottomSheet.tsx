// import React, { useCallback, useMemo, useRef } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
// import BottomSheet, { } from '@gorhom/bottom-sheet';

// const BottomSheetCompo = () => {
//   // ref
//   const bottomSheetRef = useRef<BottomSheet>(null);

//   // variables
//   const snapPoints = useMemo(() => ['10%', '20%'], []);

//   // callbacks
//   const handleSheetChanges = useCallback((index: number) => {
//   }, []);

//   // renders
//   return (
//     <BottomSheet
//       ref={bottomSheetRef}
//       index={1}
//       snapPoints={snapPoints}
//       onChange={handleSheetChanges}
//       backgroundStyle={{ borderWidth: 1, }}

//     >
//       <View style={styles.contentContainer}>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

//           <Text style={{fontSize:15,fontWeight:'bold'}}>Estimated Delivery</Text>
//           <Text style={{fontSize:16,fontWeight:'bold'}}>Timenlslqkslwkslqk</Text>
//         </View>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

//           <Text>Address</Text>
//           <Text>Delivery Address</Text>
//         </View>


//       </View>
//     </BottomSheet>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // flex:1/2,
//     padding: 24,
//     backgroundColor: 'grey',
//     // backgroundColor: '#fff',
//   },
//   contentContainer: {
//     flex: 1,
//     padding: 8,
//     // alignItems: 'center',
//     elevation: 4,
//     backgroundColor: 'pink',
//     justifyContent: 'space-around'

//   },
// });

// export default BottomSheetCompo;




import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetCompo = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['10%', '20%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
  }, []);

  // renders
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundStyle={{ borderWidth: 1.5, borderColor: 'grey', borderRadius: 30 }}
    >
      <View style={styles.contentContainer}>
        <View style={styles.deliveryInfoContainer}>
          <Text style={styles.deliveryLabel}>Estimated Delivery</Text>
          <Text style={styles.deliveryTime}>Tue, Jan 31, 2024</Text>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>Delivery Address</Text>
          <Text style={styles.addressText}>
            123 Main Street, Cityville, State, 12345
          </Text>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  deliveryInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  deliveryLabel: {
    fontSize: 14,
    color: '#888',
  },
  deliveryTime: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressContainer: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  addressLabel: {
    fontSize: 14,
    color: '#888',
  },
  addressText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BottomSheetCompo;
