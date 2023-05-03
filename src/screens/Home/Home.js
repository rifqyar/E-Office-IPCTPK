import React, { useEffect } from 'react'
import { View, ScrollView, Image, ImageBackground, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
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
  Header
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
    StatusBar.setBackgroundColor('#006ba2'); 
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
    <SafeAreaView>
      <Header navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: COLORS.white }}>
          
          <View style={{ alignItems: 'center', marginBottom: 15 }}>
            <View style={{ marginTop: 25, flexDirection: 'row', marginHorizontal: '2.5%' }}>
              <SmallMenuButton
                title={'Absensi'} navigation={navigation} route={MainRouteName.ABSENT}
                imgSrc={require('../../assets/imgs/menu-icon/absensi.png')}
              />
              <SmallMenuButton
                title={'Cuti/Izin'} navigation={navigation} route={MainRouteName.CUTI}
                imgSrc={require('../../assets/imgs/menu-icon/cuti.png')}
              />
              <SmallMenuButton
                title={'Payslip'}
                imgSrc={require('../../assets/imgs/menu-icon/save-money1.png')}
              />
              <SmallMenuButton
                title={'Survey'}
                imgSrc={require('../../assets/imgs/menu-icon/survey.png')}
              />
            </View>
            <View style={{ marginTop: 25, flexDirection: 'row', marginHorizontal: '2.5%' }}>
              <SmallMenuButton
                title={'Helpdesk'}
                imgSrc={require('../../assets/imgs/menu-icon/helpdesk.png')}
              />
              <SmallMenuButton
                title={'HR Contact'}
                imgSrc={require('../../assets/imgs/menu-icon/hrcontact.png')}
              />
              <SmallMenuButton
                title={'Cari Pegawai'}
                imgSrc={require('../../assets/imgs/menu-icon/search.png')}
              />
              <SmallMenuButton
                title={'Approval PR/PO'}
                imgSrc={require('../../assets/imgs/menu-icon/approval-prpo.png')}
              />
            </View>
            <View style={{ marginTop: 25, flexDirection: 'row', marginHorizontal: '2.5%', alignItems: 'flex-start', minWidth: '92.5%' }}>
              <SmallMenuButton
                title={'SPPD'} navigation={navigation} route={MainRouteName.SPPD}
                imgSrc={require('../../assets/imgs/menu-icon/sppd-2.png')}
              />
            </View>
          </View>
        </View>

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
        <View style={{ backgroundColor: COLORS.white, marginTop: 10, marginBottom: 60 }}>
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
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home