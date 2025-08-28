import { View, Text, ToastAndroid } from 'react-native'


const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
};

const showToastWithGravity = ({ message }) => {
    ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
    );
};

const showToastWithGravityAndOffset = ({ message }) => {
    ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
    );
};
export { showToast, showToastWithGravity, showToastWithGravityAndOffset }