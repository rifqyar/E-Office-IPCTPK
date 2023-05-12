import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../../constants/theme';

const InboxDetail = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text>Test</Text>
            </ScrollView>
        </View>
    )
}

export default InboxDetail

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        minHeight: '100%'
    },
})