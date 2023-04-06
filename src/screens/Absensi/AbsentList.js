import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';
import { MainRouteName } from '../../constants/mainRouteName';

const AbsentList = ({ navigation }) => {
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  const [openMonths, setOpenMonths] = useState(false);
  const [dataMonths, setDataMonths] = useState([
    { label: 'Januari', value: 'jan' },
    { label: 'Februari', value: 'feb' },
    { label: 'Maret', value: 'mar' },
    { label: 'April', value: 'apr' }
  ]);
  const [openYears, setOpenYears] = useState(false);
  const [dataYears, setDataYears] = useState([
    { label: 2020, value: 2020 },
    { label: 2021, value: 2021 },
    { label: 2022, value: 2022 },
    { label: 2023, value: 2023 }
  ])

  return (
    <View>
      <ScrollView style={styles.container}>
        <View>
          {/* Header */}
          <DropDownPicker
            zIndex={3000}
            placeholder=""
            open={openMonths}
            value={month}
            items={dataMonths}
            setOpen={setOpenMonths}
            setValue={setMonth}
            setItems={setDataMonths}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
            style={styles.dropDownStyle}
            containerStyle={{
              zIndex: 1000,
              flex: 1,
            }}
            dropDownContainerStyle={styles.dropDownContainerStyle}
          />
          <DropDownPicker
            zIndex={3000}
            placeholder=""
            open={openYears}
            value={year}
            items={dataYears}
            setOpen={setOpenYears}
            setValue={setYear}
            setItems={setDataYears}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
            style={styles.dropDownStyle}
            containerStyle={{
              zIndex: 999,
              flex: 1,
            }}
            dropDownContainerStyle={styles.dropDownContainerStyle}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons
              name="search"
              color="rgba(255, 255, 255, .9)"
              size={20}
              style={{ marginRight: 2 }}
            />
            <Text style={{ color: COLORS.white }}>Lihat</Text>
          </TouchableOpacity>

          {/* List Absent */}
          <View style={{ marginTop: 2.5, marginHorizontal: '0.5%', zIndex: 1 }}>
            <View style={{ flexDirection: 'row', borderWidth: 0.1, borderRadius: 2 }}>
              <View style={{ marginLeft: '5%', width: '10%', justifyContent: 'center' }}>
                <Image
                  source={require('../../assets/imgs/menu-icon/absensi.png')} 
                  style={{ height: 30, width: 30 }}
                 />
              </View>
              <View style={{ minWidth: '50%', marginLeft: '2.5%' }}>
                <Text style={{ fontWeight: 'bold', marginTop: 5}}>Tanggal 1 - Sabtu</Text>
                <Text style={{ color: COLORS.Grey, marginTop: 5  }}>Datang: - | Status: -</Text>
                <Text style={{ color: COLORS.Grey }}>Ket Datang:</Text>
                <Text style={{ color: COLORS.Grey }}>-</Text>
                <Text style={{ color: COLORS.Grey, marginTop: 5 }}>Pulang: - | Status: -</Text>
                <Text style={{ color: COLORS.Grey }}>Ket Pulang:</Text>
                <Text style={{ color: COLORS.Grey }}>-</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate(MainRouteName.ABSENT_DETAIL)}
                style={{ minWidth: '25%', alignItems: 'flex-end', justifyContent: 'center', marginLeft: '2.5%', marginRight: '2.5%' }}
              >
                <Text style={{ fontSize: 12, color: '#0394fc' }}>Sabtu</Text>
                <Image
                  source={require('../../assets/flat-icon/absen_mobile.png')} 
                  style={{ height: 25, width: 25, marginTop: 5 }}
                 />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default AbsentList

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    minHeight: '100%'
  },
  dropDownStyle: {
    borderWidth: 1,
    borderRadius: 10,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    borderColor: '#DCDCDC',
    zIndex: 100,
    width: '95%',
    marginLeft: '2.5%',
    marginVertical: 10
  },
  dropDownContainerStyle: {
    borderWidth: 1,
    borderRadius: 10,
    zIndex: 100,
    color: '#000000',
    backgroundColor: 'white',
    opacity: 100,
    borderColor: '#DCDCDC',
  },
  searchButton: {
    width: '95%',
    backgroundColor: COLORS.Blue,
    height: 40,
    marginVertical: 10,
    marginLeft: '2.5%',
    borderRadius: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
})