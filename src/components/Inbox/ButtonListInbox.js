import React from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { MainRouteName } from '../../constants/mainRouteName';
import truncate from '../../helpers/truncate';
import { COLORS } from '../../constants/theme';

const ButtonListInbox = ({ data }) => {
  const navigation = useNavigation();

  // console.log(data.IsBaca)
  let bgColor;
  if (data.IsBaca){
    bgColor = COLORS.white
  } else {
    bgColor = COLORS.lightGrey
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate(MainRouteName.INBOX_DETAIL, {mail: data})} 
    style={{marginVertical: 5, marginHorizontal: '0.5%', backgroundColor: bgColor}}>
      <View style={{ flexDirection: 'row', borderLeftColor: COLORS.lightPurple, borderLeftWidth: 3, height: 120 }}>
        <View style={{ marginLeft: '5%', width: '10%', justifyContent: 'center' }}>
          <Ionicons
            name="mail"
            color="#0394fc"
            size={24}
          />
        </View>
        <View style={{ width: '59%', marginLeft: '2.5%', justifyContent: 'space-evenly' }}>
          <Text style={{ color: 'grey' }}>{data.No_Surat}</Text>
          <Text style={{ fontWeight: 'bold' }}>{data.Dari}</Text>
          <Text>{truncate(data.Perihal)}</Text>
          <Text style={{ color: '#0394fc' }}>{data.Tanggal_Surat}</Text>
        </View>
        <TouchableOpacity onPress={() => console.log("Kembalikan")} style={{ maxWidth: '25%', alignItems: 'center', justifyContent: 'center', marginLeft: '2.5%', marginRight: '2.5%' }}>
          <Text style={{ fontSize: 12, color: '#0394fc' }}>KEMBALIKAN</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default ButtonListInbox