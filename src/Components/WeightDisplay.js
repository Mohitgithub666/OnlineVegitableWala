// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
// import { getDataInDB } from "../styles/utils/commonFunctions";

// const WeightDisplay = ({ weights, onSelect }) => {
//   const [selectedWeight, setSelectedWeight] = useState(null);
//     const [weightOptions, setWeightOptions] = useState([]);
  

//   const handleSelect = (weight) => {
//     setSelectedWeight(weight);
//     if (onSelect) {
//       onSelect(weight);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const retrievedArray = await getDataInDB('UOM');
//       setWeightOptions(retrievedArray || [50, 100, 250, 500, 750]);
//     };

//     fetchData();
//   }, []); // Empty dependency array ensures this runs once on mount

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={weightOptions}
//         keyExtractor={(item) => item.toString()}
//         numColumns={3}
//         columnWrapperStyle={styles.row}
//         renderItem={({ item }) => (
//           <TouchableOpacity 
//             style={[styles.item, selectedWeight === item && styles.selectedItem]} 
//             onPress={() => handleSelect(item)}
//           >
//             <Text style={styles.text}>{item} grams</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   row: {
//     justifyContent: "space-between",
//   },
//   item: {
//     flex: 1,
//     padding: 6,
//     margin: 5,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   selectedItem: {
//     backgroundColor: "#d0d0d0",
//   },
//   text: {
//     fontSize: 14,
//     fontWeight: "bold",
//   },
// });

// export default WeightDisplay;










import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { getDataInDB } from "../styles/utils/commonFunctions";

const WeightDisplay = ({ onSelect }) => {
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [weightOptions, setWeightOptions] = useState([]);

  const handleSelect = (weight) => {
    const newSelection = selectedWeight === weight ? null : weight;
    setSelectedWeight(newSelection);
    if (onSelect) {
      onSelect(newSelection);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const retrievedArray = await getDataInDB('UOM');
      setWeightOptions(retrievedArray || [50, 100, 250, 500, 750]);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={weightOptions}
        keyExtractor={(item) => item.toString()}
        numColumns={3}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.item, selectedWeight === item && styles.selectedItem]} 
            onPress={() => handleSelect(item)}
          >
            <Text style={styles.text}>{item} grams</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    justifyContent: "space-between",
  },
  item: {
    flex: 1,
    padding: 6,
    margin: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
  },
  selectedItem: {
    backgroundColor: "#d0d0d0",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default WeightDisplay;