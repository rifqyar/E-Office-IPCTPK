import React from 'react'
import { View, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { MainRouteName } from '../../constants/mainRouteName';
import truncate from '../../helpers/truncate';

const Inbox = ({ navigation }) => {
  return (
    <View>
      {/* <Text>inbox</Text> */}
      {/* Sementara pakai scrollview */}
      <ScrollView>
        <TouchableOpacity style={{marginTop: 2.5, marginHorizontal: '0.5%'}}>
          <View style={{ flexDirection: 'row', borderLeftColor: '#ce03fc', borderLeftWidth: 3 }}>
            <View style={{ marginLeft: '5%', width: '10%' }}>
              <Ionicons
                name="mail"
                color="#0394fc"
                size={24}
                style={{ marginTop: '80%' }}
              />
            </View>
            <View style={{ maxWidth: '60%', marginLeft: '2.5%' }}>
              <Text style={{ color: 'grey' }}>HM.608/21/12/1/IPCTPK-22</Text>
              <Text style={{ fontWeight: 'bold' }}>Direktur Keunangan dan SDM</Text>
              <Text>Pemberlakuan Sistem Administrasi Perkantoran Pelindo</Text>
              <Text style={{color: '#0394fc'}}>01-FEB-23</Text>
            </View>
            <View style={{ maxWidth: '25%', alignItems: 'center', justifyContent: 'center', marginLeft: '2.5%', marginRight: '2.5%' }}>
              <Text style={{fontSize: 12}}>KEMBALIKAN</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default Inbox