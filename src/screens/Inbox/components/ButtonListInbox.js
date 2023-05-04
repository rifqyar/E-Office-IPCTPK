import React from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { MainRouteName } from '../../constants/mainRouteName';
import truncate from '../../../helpers/truncate';

const ButtonListInbox = ({ data }) => {
  return (
    <TouchableOpacity style={{marginVertical: 5, width: '97.5%', marginHorizontal: '0.5%'}}>
      <View style={{ flexDirection: 'row', borderLeftColor: '#ce03fc', borderLeftWidth: 3 }}>
        <View style={{ marginLeft: '5%', width: '10%', justifyContent: 'center' }}>
          <Ionicons
            name="mail"
            color="#0394fc"
            size={24}
          />
        </View>
        <View style={{ width: '59%', marginLeft: '2.5%' }}>
          <Text style={{ color: 'grey' }}>{data.No_Surat}</Text>
          <Text style={{ fontWeight: 'bold' }}>{data.Dari}</Text>
          <Text>{truncate(data.Perihal)}</Text>
          <Text style={{ color: '#0394fc' }}>{data.Tanggal_Surat}</Text>
        </View>
        <View style={{ maxWidth: '25%', alignItems: 'center', justifyContent: 'center', marginLeft: '2.5%', marginRight: '2.5%' }}>
          <Text style={{ fontSize: 12, color: '#0394fc' }}>KEMBALIKAN</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ButtonListInbox