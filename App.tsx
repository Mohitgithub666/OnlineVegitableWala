import {
  Alert,
  LogBox,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Provider} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import {
  notificationListeners,
  requestUserPermission,
} from './src/styles/utils/notificationServices';
import {requestLocationPermission} from './src/styles/utils/location';
import {moderateScale, textScale} from './src/styles/responsiveSize';
import store, {persistor} from './src/redux/Store';
import Routes from './src/navigation/Route';
import SpInAppUpdates, {
  IAUInstallStatus,
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';
import UpdatePopup from './src/Components/UpdatePopup';

const App = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  LogBox.ignoreLogs(['Require cycle:']);
  useEffect(() => {
    SplashScreen.hide();
    checkUpdate();
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      // Only request POST_NOTIFICATIONS for Android 13 and above
      if (Platform.Version >= 33) {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        )
          .then(res => {
            if (!!res && res === 'granted') {
              requestLocationPermission();
              requestUserPermission();
              notificationListeners();
            }
          })
          .catch(error => {
            Alert.alert(
              'Error',
              'Something went wrong while requesting notification permissions',
            );
          });
      } else {
        requestLocationPermission();
        requestUserPermission();
        notificationListeners();
      }
    } else {
      requestLocationPermission();
      requestUserPermission();
      notificationListeners();
    }
  }, []);

  const checkUpdate = async () => {
    const inAppUpdates = new SpInAppUpdates(false); // isDebug = false
    try {
      const result = await inAppUpdates.checkNeedsUpdate();
      console.log('checkUpdate', result);
      if (result.shouldUpdate) {
        setPopupVisible(true); // Show the update popup
      }
    } catch (e) {
      console.log('Error checking for update:', e);
    }
  };

  const handleUpdate = async () => {
    setPopupVisible(false); // Hide the popup
    const inAppUpdates = new SpInAppUpdates(false);

    let updateOptions: StartUpdateOptions = {};
    if (Platform.OS === 'android') {
      updateOptions = {
        updateType: IAUUpdateKind.IMMEDIATE,
      };
    } else if (Platform.OS === 'ios') {
      updateOptions = {
        title: 'Update available',
        message:
          'There is a new version of the app available on the App Store. Do you want to update it?',
        buttonUpgradeText: 'Update',
        buttonCancelText: 'Cancel',
      };
    }

    try {
      inAppUpdates.addStatusUpdateListener(downloadStatus => {
        console.log('Download status:', downloadStatus);
        if (downloadStatus.status === IAUInstallStatus.DOWNLOADED) {
          console.log('Update downloaded, installing...');
          inAppUpdates.installUpdate();
        }
      });
      await inAppUpdates.startUpdate(updateOptions);
    } catch (e) {
      console.log('Error during update:', e);
    }
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar backgroundColor="white" barStyle={'dark-content'} />
      <FlashMessage
        titleStyle={{
          marginRight: moderateScale(5),
          fontSize: textScale(16),
        }}
        position="top"
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={{flex: 1}}>
            <Routes />
            <UpdatePopup
              visible={isPopupVisible}
              handleUpdate={handleUpdate}
              onClose={() => setPopupVisible(false)}
            />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
