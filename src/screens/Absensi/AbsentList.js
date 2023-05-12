import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';
import { MainRouteName } from '../../constants/mainRouteName';
import AbsentListButton from '../../components/Absensi/AbsentListButton';
import { loading } from '../../redux/actions/loadingAction';
import { useSelector, useDispatch } from 'react-redux';
import {
  api_base_url,
  api_user,
  api_pass
} from '../../../app.json'
import soapCall from '../../helpers/soapCall';

const AbsentList = ({ navigation }) => {
  const user = useSelector(state => state.userReducer.user);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const flatListRef = React.useRef();

  const currentMonth = new Date().getMonth() + 1; //To get the Current Month
  const currentYear = new Date().getFullYear(); //To get the Current Year

  const monthConst = [
    { label: 'Januari', value: 1 },
    { label: 'Februari', value: 2 },
    { label: 'Maret', value: 3 },
    { label: 'April', value: 4 },
    { label: 'Mei', value: 5 },
    { label: 'Juni', value: 6 },
    { label: 'Juli', value: 7 },
    { label: 'Agustus', value: 8 },
    { label: 'September', value: 9 },
    { label: 'Oktober', value: 10 },
    { label: 'November', value: 11 },
    { label: 'Desember', value: 12 },
  ]

  const [dataAbsentList, setDataAbsentList] = useState([])
  const [isLoading, setIsLoading] = useState(false); 
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [monthEmpty, setMonthEmpty] = useState(false);
  const [yearEmpty, setYearEmpty] = useState(false);

  const [openMonths, setOpenMonths] = useState(false);
  const [dataMonths, setDataMonths] = useState([]);
  const [openYears, setOpenYears] = useState(false);
  const [dataYears, setDataYears] = useState([])

  useEffect(() => {
    getDataYears();
    setDataMonths(monthConst); //sementara
  }, []);

  const getDataYears = () => {
    let tempDataYears = [];
    for (let i=0; i<10; i++){
      tempDataYears.push({ label: currentYear-i, value: currentYear-i});
    }
    setDataYears(tempDataYears);
  }

  const openDropdownMonth = () => {
    setOpenMonths(true);
    setOpenYears(false);
  }

  const openDropdownYear = () => {
    setOpenMonths(false);
    setOpenYears(true);
  }

  const getAbsen = async() => {
    if (!month || !year){
      if (!month){
        setMonthEmpty(true);
      } else {
        setMonthEmpty(false);
      }
      if (!year){
        setYearEmpty(true);
      } else {
        setYearEmpty(false);
      }
      return;
    }
    setIsLoading(true);
    dispatch(loading());
    soapCall(api_base_url, 'eoffice_absen_list', {
      usernameEDI: api_user,
      passwordEDI: api_pass,
      nipp: user.user.NIPP,
      bulan: month,
      tahun: year
    }).then((res) => {
      // console.log(res.data)
      setMonthEmpty(false);
      setYearEmpty(false);
      setIsLoading(false);
      setDataAbsentList(res.data);
    })
  }

  return (
    <View>
      <ScrollView style={styles.container}>
        <View>
          {
            (monthEmpty) &&
            <Text style={{ color: 'red', marginLeft: '2.5%', marginTop: 5 }}>
              Bulan Belum Dipilih
            </Text>
          }         
          <DropDownPicker
            zIndex={3000}
            placeholder="--- Pilih Bulan ---"
            placeholderStyle={{color: 'grey', textAlign: 'center'}}
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
          {
            (yearEmpty) &&
            <Text style={{ color: 'red', marginLeft: '2.5%', marginTop: 5 }}>
              Tahun Belum Dipilih
            </Text>
          }          
          <DropDownPicker
            zIndex={3000}
            placeholder="--- Pilih Tahun ---"
            placeholderStyle={{color: 'grey', textAlign: 'center'}}
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
          <TouchableOpacity onPress={getAbsen} style={styles.searchButton}>
            <Ionicons
              name="search"
              color="rgba(255, 255, 255, .9)"
              size={20}
              style={{ marginRight: 2 }}
            />
            <Text style={{ color: COLORS.white }}>Lihat</Text>
          </TouchableOpacity>

          {/* List Absent */}
          <View style={{minHeight: 200}}>
            {
              (isLoading) &&
              <>
                <View style={{height: 100, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>Loading...</Text>
                </View>
              </>
            }
            {
              dataAbsentList?.map((dataAbsen) => {
                return <AbsentListButton data={dataAbsen} />
              })
            }
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
    marginVertical: 10,
  },
  dropDownContainerStyle: {
    borderWidth: 1,
    borderRadius: 10,
    zIndex: 100,
    color: '#000000',
    backgroundColor: 'white',
    opacity: 100,
    borderColor: '#DCDCDC',
    width: '95%',
    marginLeft: '2.5%',
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