import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES } from '../../constants/theme';
import { loading } from '../../redux/actions/loadingAction';
import { useSelector, useDispatch } from 'react-redux';
import {
  api_base_url,
  api_user,
  api_pass
} from '../../../app.json'
import soapCall from '../../helpers/soapCall';

const AbsentDetail = ({ navigation }) => {
  const user = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getAbsenDetail();
  }, []);

  const getAbsenDetail = async () => {
    dispatch(loading());
    soapCall(api_base_url, 'am6_detail_absen', {
      usernameEDI: api_user,
      passwordEDI: api_pass,
      iduser: user.user.IDUSER,
    }).then((res) => {
      // console.log(res)
      setInboxes(res.data.List_Inbox);
    })
  }

  return (
    <View>
      <ScrollView style={styles.container}>
        <Card style={styles.cardStyle}>
          <Text style={{ fontWeight: 'bold', marginTop: 5 }}>Sabtu, 01 April 2023</Text>
          <View style={styles.centerIdCard}>
            <Text style={{ fontWeight: 'bold' }}>JOHN DOE</Text>
            <Text style={{ color: COLORS.Grey }}>12334342</Text>
            <Text>Staf Perencanaan & Pengembangan SI Jr</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View style={{ width: '45%', alignItems: 'flex-end'}}>
              <Text style={{ color: COLORS.Green }}>Check In</Text>
              <Text style={{ fontWeight: 'bold', marginRight: '2.5%'}}>--:--:--</Text>
            </View>
            <View style={{ width: '45%' }}>
              <Text style={{ color: COLORS.Red}}>Check Out</Text>
              <Text style={{ fontWeight: 'bold', marginLeft: '-5%'}}>-  --:--:--</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.cardStyle}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={{ width: '45%', alignItems: 'center' }}>
              <Image source={require('../../assets/flat-icon/photo_dummy_2.png')} style={{ width: '100%', height: 160 }} />
            </View>
            <View style={{ width: '45%' }}>
              <Text style={{ color: COLORS.Green }}>Check In Activity</Text>
              <Text>-</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.cardStyle}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={{ width: '45%', alignItems: 'center' }}>
              <Image source={require('../../assets/flat-icon/photo_dummy_2.png')} style={{ width: '100%', height: 160 }} />
            </View>
            <View style={{ width: '45%' }}>
              <Text style={{ color: COLORS.Red }}>Check Out Activity</Text>
              <Text>-</Text>
            </View>
          </View>
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
  cardStyle: {
    width: '95%',
    marginLeft: '2.5%',
    padding: 5,
    marginTop: 10,
    borderWidth: 0.05, //1
    borderBottomWidth: 0.45,
    borderColor: COLORS.Grey,
    borderRadius: 10,
    backgroundColor: COLORS.white,

    shadowColor: COLORS.black, //#000
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,

    elevation: 5,
  },
  centerIdCard: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // alignContent: 'center',
    // textAlign: 'center',
    width: '100%'
  }
})