import React, { useEffect, useState } from 'react'
import { View, Image, TouchableOpacity, SafeAreaView, StatusBar, FlatList, RefreshControl, Platform } from 'react-native';
import { Text, Caption, Snackbar, Card } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../constants/theme';
import soapCall from '../../helpers/soapCall';

import {
  Footer,
  Header, 
  ListMenu
} from '../../components/Home/Index'
import { useSelector } from 'react-redux';

import {
  api_base_url,
  api_user,
  api_pass,
  api_res,
  api_p2b_url
} from '../../../app.json'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StatusBarIOS from '../../constants/StatusBarIOS';
import { MainRouteName } from '../../constants/mainRouteName';
import apiCall from '../../helpers/apiCall';

const Home = ({navigation}) => {
  const [errorAPI, setErrorAPI] = useState(false);
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn); //test
  const user = useSelector(state => state.userReducer.user.user)
  const [badgeList, setBadgeList] = useState(null)
  const [badgeP2B, setBadgeP2B] = useState(null)
  const [badgePrPo, setBadgePrPo] = useState(null)
  const [agendaList, setAgendaList] = useState(null)
  const [dataValidasi, setDataValidasi] = useState(null)
  const [refresh, setRefresh] = useState(false)
  
  useEffect(() => {
    if (Platform.OS == 'android') {
      StatusBar.setTranslucent(false)
      StatusBar.setBackgroundColor(COLORS.Blue); 
      StatusBar.setBarStyle('light-content')
    }

    getBadgesP2b()
    getBadgesPrpro()
    getBadges()
    getDataAgenda()
    getDataValidasi()
  }, [user])

  const getBadges = async () => {
    await soapCall(api_base_url, 'eoffice_countbadges', {
      usernameEDI: api_user,
      passwordEDI: api_pass,
      nipp: user.NIPP,
      idjabatan: user.IDJABATAN,
      iduser: user.IDUSER
    }).then((res) => {
      if(res.rcmsg == "SUCCESS"){
        setBadgeList(res.data);
      } else {
        // setErrorAPI(true)
      }
    })
  }

  const getBadgesP2b = async () => {
    await soapCall(api_p2b_url, 'eoffice_countbadges', {
      usernameEDI: api_user,
      passwordEDI: api_pass,
      person_id: '',
      nipp: user.NIPP,
      idjabatan: user.IDJABATAN,
      id_user: user.IDUSER
    }).then((res) => {
      if(res.rcmsg == "SUCCESS"){
        setBadgeP2B(res.data);
      } else {
        // setErrorAPI(true)
      }
    })
  }

  const getBadgesPrpro = async () => {
    await soapCall(api_p2b_url, 'eoffice_countbadgestpk', {
      usernameEDI: api_user,
      passwordEDI: api_pass,
      person_id: '',
      nipp: user.NIPP,
      idjabatan: user.IDJABATAN,
      id_user: user.IDUSER
    }).then((res) => {
      if(res.rcmsg == "SUCCESS"){
        setBadgePrPo(res.data);
      } else {
        // setErrorAPI(true)
      }
    })
  }

  const getDataAgenda = async () => {
    await soapCall(api_base_url, 'eoffice_home', {
      usernameEDI: api_user,
      passwordEDI: api_pass,
      nipp: user.NIPP,
      idjabatan: user.IDJABATAN,
      id_user: user.IDUSER
    }).then((res) => {
      if(res.rcmsg == "SUCCESS"){
        setAgendaList(res.data.AGENDA_HARI_INI);
      } else {
        // setErrorAPI(true)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  const getDataValidasi = async () => {
    await apiCall(`${api_res}am3_check_shift.php`,{
      usernameEDI: api_user,
      passwordEDI: api_pass,
      person_id: user.PERSON_ID,
      nipp: user.NIPP,
      id_user: user.IDUSER
    },(res) => {
      if (res.rcmsg == 'SUCCESS'){
        setDataValidasi(res.data)
      }
      console.log(res)
    })
  }

  const getAllData = async (callback) => {
    await getBadges()
    await getBadgesP2b()
    await getBadgesPrpro()
    await getDataAgenda()
    await getDataValidasi()
    callback(true)
  }

  if (typeof(user) != 'undefined')
  return (
    <SafeAreaProvider style={{flex: 1, backgroundColor: COLORS.white}}>
      {Platform.OS == 'ios' ? <StatusBarIOS backgroundColor={COLORS.Blue} barStyle='light-content' /> : <></>}

      <Header navigation={navigation} badgeList={badgeList} dataValidasi={dataValidasi} />

      <FlatList 
        data={[1,2]}
        ListHeaderComponent={<ListMenu navigation={navigation} badgeList={badgeList} badgeListPrPo={badgePrPo} dataValidasi={dataValidasi} />}
        ListFooterComponent={ <Footer navigation={navigation} agendaList={agendaList} /> }
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => {
            setRefresh(true)
            getAllData((done) => {
              if(done)
              setRefresh(false)
            })
          }} />
        }
      />

      <Snackbar
        visible={errorAPI}
        duration={2500}>
        <Text>Maaf terjadi kesalahan, harap coba beberapa saat lagi</Text>
      </Snackbar>
    </SafeAreaProvider>
  )
}

export default Home