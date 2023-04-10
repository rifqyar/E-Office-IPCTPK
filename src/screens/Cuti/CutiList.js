import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES } from '../../constants/theme';

const CutiList = () => {
  return (
    <View>
      <ScrollView style={{minHeight: '100%', backgroundColor: COLORS.white}}>
        <TouchableOpacity style={styles.buttonStyle}>
          <View style={{ flexDirection: 'row', borderLeftColor: '#ce03fc', borderLeftWidth: 3 }}>
            <View style={{ marginLeft: '5%', width: '10%', justifyContent: 'center' }}>
              <Image
                source={require('../../assets/imgs/menu-icon/cuti.png')}
                style={{ width: 28, height: 28 }}
              />
            </View>
            <View style={{ width: '65%', marginLeft: '2.5%', marginVertical: 10, paddingVertical: 5 }}>
              <Text style={{ color: COLORS.darkRed }}>hari</Text>
              <Text style={{ fontWeight: 'bold' }}>Cuti Tahunan</Text>
              <View style={{flexDirection: 'row'}}>
                <Text>20-APR-23 </Text>
                <Text style={{color: COLORS.Blue}}>s/d </Text>
                <Text>28-APR-23</Text>
              </View>
            </View>
            <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{ fontSize: 12, color: COLORS.Blue }}>KIRIM</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default CutiList

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 5, 
    marginHorizontal: '0.5%', 
    backgroundColor: COLORS.white,
    borderWidth: 0.1,
    borderRadius: 2,
    marginHorizontal: '1.5%'
  }
})