import React from 'react'
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { MainRouteName } from '../../constants/mainRouteName';
import truncate from '../../helpers/truncate';
import { COLORS, SIZES } from '../../constants/theme';

const SppdList = ({ navigation }) => {
  return (
    <View>
      <ScrollView style={{minHeight: '100%', backgroundColor: COLORS.white}}>
        <TouchableOpacity style={styles.buttonStyle}>
          <View style={{ flexDirection: 'row', borderLeftColor: '#ce03fc', borderLeftWidth: 3 }}>
            <View style={{ marginLeft: '5%', width: '10%', justifyContent: 'center' }}>
              <Image
                source={require('../../assets/imgs/menu-icon/sppd.png')}
                style={{ width: 28, height: 28 }}
              />
            </View>
            <View style={{ maxWidth: '80%', marginLeft: '2.5%', paddingVertical: 10 }}>
              <Text style={{ color: COLORS.Blue, marginTop: 5 }}>Bogor</Text>
              <Text>Menghadiri Join Planning Session (JPS) dan Penandatangan Nota Kesepakatan antara PT Integrasi Logistik Cipta Solusi dengan PT Microsoft Indonesia</Text>
              <Text style={{ color: COLORS.Grey, marginTop: 5 }}>16-MAR-23 s/d 17-MAR-23</Text>
              <Text style={{ fontSize: SIZES.body5, color: COLORS.Blue, marginTop: 5 }}>KIRIM</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default SppdList

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