import React, { useEffect } from 'react'
import { View, ScrollView, Image, ImageBackground, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, FlatList } from 'react-native';
import { Text, Card, Caption, Avatar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { MainRouteName } from '../../constants/mainRouteName';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SIZES } from '../../constants/theme';
import axios from 'axios';
import soapCall from '../../helpers/soapCall';

import {
  Header, ListMenu
} from '../../components/Home/Index'
import { useSelector } from 'react-redux';

import {
  api_base_url,
  api_user,
  api_pass,
  api_base_url_hadirkoe,
  api_p2b_url
} from '../../../app.json'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SmallMenuButton = ({ title, imgSrc, navigation, route }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(route)} style={{ alignItems: 'center', marginHorizontal: '5%', maxWidth: '17.5%' }}>
      <View style={{ backgroundColor: COLORS.white, height: 52.5, width: 52.5, borderRadius: 100, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5 }}>
        <Image source={imgSrc} style={{ height: 35, width: 35 }} />
      </View>
      <Text style={{ fontSize: 13, textAlign: 'center' }}>{title}</Text>
    </TouchableOpacity>
  )
}

const Home = ({navigation}) => {
  useEffect(() => {
    StatusBar.setTranslucent(false)
    StatusBar.setBackgroundColor(COLORS.Blue); 
    StatusBar.setBarStyle('light-content')

    // getBadgesP2b()
    // getBadgesPrpro()
    return () => {
    }
  })

  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn); //test
  const user = useSelector(state => state.userReducer.user.user); //test

  const getBadgesP2b = async () => {
    const res = await soapCall(api_p2b_url, 'eoffice_countbadges', {
      usernameEDI: api_user,
      passwordEDI: api_pass,
      person_id: '',
      nipp: user.NIPP,
      idjabatan: user.IDJABATAN,
      id_user: user.IDUSER
    })
  }

  const getBadgesPrpro = async () => {
    const res = await soapCall(api_p2b_url, 'eoffice_countbadgestpk', {
      usernameEDI: api_user,
      passwordEDI: api_pass,
      person_id: '',
      nipp: user.NIPP,
      idjabatan: user.IDJABATAN,
      id_user: user.IDUSER
    })
  }
  
  if (typeof(user) != 'undefined')
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      
      <Header navigation={navigation} />

      <FlatList 
        data={[1,2]}
        ListHeaderComponent={<ListMenu navigation={navigation} />}
        ListFooterComponent={() => {
          return(
            <>

            {/* Agenda */}
            <View style={{ backgroundColor: COLORS.white, marginTop: 10 }}>
              <Text style={{ marginLeft: '2.5%', fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>Agenda</Text>
              <Caption style={{ marginLeft: '2.5%', color: 'grey', marginTop: 2 }}>Daftar agenda anda hari ini</Caption>
              <LinearGradient 
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}  
                style={{marginHorizontal: '2.5%', marginTop: 10, marginBottom: 15, borderRadius: 15}} 
                colors={[COLORS.lightPurple, COLORS.lightCyan]}
              >
                <Text style={{ marginLeft: '2.5%', color: COLORS.white, marginVertical: 15 }}>Tidak ada agenda hari ini</Text>
              </LinearGradient>
              {/* <Card style={{ marginHorizontal: '2.5%', backgroundColor: '#0fc7fa', marginTop: 10, marginBottom: 15 }}>
              </Card> */}
            </View>

            {/* P2B */}
            <View style={{ backgroundColor: COLORS.white, marginTop: 10, marginBottom: 10}}>
              <Text style={{ marginLeft: '2.5%', fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>P2B</Text>
              <Caption style={{ marginLeft: '2.5%', color: COLORS.Grey, marginTop: 2 }}>Penilaian Performa Bulanan</Caption>
              <LinearGradient 
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}  
                style={{marginHorizontal: '2.5%', marginTop: 10, marginBottom: 15, borderRadius: 15}} 
                colors={[COLORS.lightPink, COLORS.lightOrange]}
              >
                <View style={{flexDirection: 'row'}}>
                  <View style={{ maxWidth: '70%', marginTop: 10 }}>
                    <View style={{marginLeft: '5%', flexDirection: 'row'}}>
                      <Image source={require('../../assets/imgs/menu-icon/p2b-white.png')} style={{ height: 35, width: 35 }} />
                      <Text style={{color: COLORS.white, marginLeft: 10, marginTop: 10}}>P2B</Text>
                    </View>
                    <Text style={{ marginLeft: '5%', color: COLORS.white, marginVertical: 15 }}>Karyawan dapat menambah, mengubah, submit serta melakukan approval P2B.</Text>
                  </View>
                  <View style={{ maxWidth: '25%', alignItems: 'center', justifyContent: 'center', marginLeft: '7.5%' }}>
                    <TouchableOpacity style={{ height: 25, width: 50, borderRadius: 100, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: 'white'}}>
                      <Text style={{color: COLORS.white}}>BUKA</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </View>
            </>
          )
        }}
      />
    </SafeAreaView>
  )
}

export default Home