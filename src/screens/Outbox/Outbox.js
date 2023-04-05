import React from 'react'
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { MainRouteName } from '../../constants/mainRouteName';
import truncate from '../../helpers/truncate';

const Outbox = ({ navigation }) => {
  return (
    <View style={{backgroundColor: 'white', minHeight: '100%'}}>
      {/* Sementara pakai scrollview */}
      <ScrollView>
        <TouchableOpacity style={{marginTop: 2.5, marginHorizontal: '0.5%'}}>
          <View style={styles.mail}>
            <View style={{ marginLeft: '5%', width: '10%' }}>
              <Ionicons
                name="mail"
                color="#0394fc"
                size={24}
                style={{ marginTop: '60%' }}
              />
            </View>
            <View style={{ minWidth: '55%', marginLeft: '2.5%', marginVertical: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>Permohonan cuti penting</Text>
              <Text style={{color: '#0394fc'}}>01-FEB-23</Text>
              <Text style={{color: '#034afc'}}>Kirim</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default Outbox

const styles = StyleSheet.create({
  mail: {
    flexDirection: 'row', 
    borderLeftColor: '#ce03fc', 
    borderWidth: 0.4,
    borderLeftWidth: 3,
    borderRadius: 5,
    borderTopLeftRadius: 1,
    borderBottomLeftRadius: 1
  }
})