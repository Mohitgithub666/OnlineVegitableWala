import { Share } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const ShareAppLink = async (appLink, storeName) => {
    // const  message = `Check out this App`
    const shareOptions = {
        message: `Check out this App! \n ${appLink}`,
        // url: `data:application/pdf;base64,${pdfBase64Data}`,
        title: storeName
    };
    Share.share(shareOptions)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            err && console.log(err);
        });
}


// Save data to AsyncStorage
const saveDataInDB = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error('Error saving data:', e);
    }
  };
  
  // Retrieve data from AsyncStorage
  const getDataInDB = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue != null) {
        return JSON.parse(jsonValue);
      } else {
        console.log(`No data found for key: ${key}`);
        return null;
      }
    } catch (e) {
      console.error('Error reading data:', e);
    }
  };

export { saveDataInDB, getDataInDB };
