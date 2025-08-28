import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';

const Loader = (props) => {
    const { isLoading, size = 25 } = props;
    if (isLoading) {
        return (
            // <Modal transparent visible={isLoading} >
            <View style={{}}>
                <ActivityIndicator size={size} color={'#000'} />
            </View>
            // </Modal>
        );
    }
    return null;
};

export default Loader;
