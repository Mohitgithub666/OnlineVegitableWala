import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AntDesign } from 'react-native-vector-icons/AntDesign';

const Great = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* <AntDesign name="checkcircleo" size={50} color="red" /> */}
        <View style={styles.greenBox} />

        <Text style={{textAlign:"center",fontSize:40,padding:30,color:"black",fontWeight:"600",elevation:4}}>Great!</Text>
   <Text style={{textAlign:"center",fontSize:17,color:"black"}}>You have successfully registered</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  greenBox: {
    backgroundColor: '#19D296',
    height: '60%',
  },
});

export default Great;
