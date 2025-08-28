// SwitchButton.js
import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const SwitchButton = ({ label, value, onValueChange }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Switch
                value={value}
                onValueChange={onValueChange}
                circleSize={30}
                barHeight={1}
                circleBorderWidth={0}
                backgroundActive={'#4cd137'}
                backgroundInactive={'#dcdde1'}
                circleActiveColor={'#ffffff'}
                circleInActiveColor={'#ffffff'}
                changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                renderActiveText={false}
                renderInActiveText={false}
                switchLeftPx={2.5} // padding-left
                switchRightPx={2.5} // padding-right
                switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
                switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize value.
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginRight: 4,
        fontWeight: '700'
    },
});

export default SwitchButton;
