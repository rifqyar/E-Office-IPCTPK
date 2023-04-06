import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';

const AbsentDetail = ({ navigation }) => {

  return (
    <View>
      <ScrollView style={styles.container}>
        <Card>
          <Text style={{ fontWeight: 'bold', marginTop: 5 }}>Sabtu, 01 April 2023</Text>
        </Card>
      </ScrollView>
    </View>
  )
}

export default AbsentDetail

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    minHeight: '100%'
  },
})