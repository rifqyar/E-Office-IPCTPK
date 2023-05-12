import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StatusBarIOS = ({
    backgroundColor,
    barStyle = "dark-content"
}) => {
    const insets = useSafeAreaInsets();
    return (
        <View>
            <View style={{ height: insets.top, backgroundColor }}>
                <StatusBar
                animated={true}
                backgroundColor={backgroundColor}
                barStyle={barStyle} />
            </View>
        </View>
    )
}

export default StatusBarIOS