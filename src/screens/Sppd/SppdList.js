import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { MainRouteName } from '../../constants/mainRouteName';
import truncate from '../../helpers/truncate';
import { COLORS, SIZES } from '../../constants/theme';
import { useSelector, useDispatch } from 'react-redux';
import {
  api_base_url,
  api_user,
  api_pass
} from '../../../app.json'
import soapCall from '../../helpers/soapCall';
import ButtonListSppd from '../../components/Sppd/ButtonListSppd';
import LoadingScreen from '../../components/LoadingScreen';

const SppdList = ({ navigation }) => {
  const user = useSelector(state => state.userReducer.user);
  const [batasAtas, setBatasAtas] = useState(1);
  const [batasBawah, setBatasBawah] = useState(10);
  const dispatch = useDispatch();
  const flatListRef = React.useRef();
  const [sppdList, setSppdList] = useState([]);
  const [atLastPage, setAtLastPage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSppdData();
  }, []);

  const getSppdData = async () => {
    setLoading(true);
    soapCall(api_base_url, 'eoffice_sppd_list', {
      usernameEDI: api_user,
      passwordEDI: api_pass,
      id_user: user.user.IDUSER,
      no_pengajuan: '',
      perihal: '',
      penanggung_jawab: '',
      tgl_pengajuan: '',
      start_date: '',
      end_date: '',
      kota_tujuan: '',
      atas: batasAtas,
      bawah: batasBawah
    }).then((res) => {
      console.log(res);
      setLoading(false);
      setSppdList(res.data);
    })
  }

  const handlePagination = async () => {
    let newBatasAtas = batasAtas + 10;
    let newBatasBawah = batasBawah + 10;
    setBatasAtas(newBatasAtas);
    setBatasBawah(newBatasBawah);
    if (atLastPage) {
      console.log("at last page");
      return;
    } else {
      let params = {
        usernameEDI: api_user,
        passwordEDI: api_pass,
        id_user: user.user.IDUSER,
        no_pengajuan: '',
        perihal: '',
        penanggung_jawab: '',
        tgl_pengajuan: '',
        start_date: '',
        end_date: '',
        kota_tujuan: '',
        atas: batasAtas,
        bawah: batasBawah
      }
      setLoading(true)
      soapCall(api_base_url, 'eoffice_sppd_list', params).then((res) => {
        const newSppdList = sppdList.concat(res.data);
        const newData = res.data;
        if (newData.length < 10){
          setAtLastPage(true);
        }
        setSppdList(newSppdList);
        setLoading(false)
      })
    }
  }

  return (
    <View>
      <FlatList
        style={{ minHeight: '100%', backgroundColor: COLORS.white }}
        nestedScrollEnabled={true}
        vertical
        data={sppdList}
        // keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => {
          return (
            <ButtonListSppd
              key={item.id}
              data={item}
            // nav={() => functionNavigate(item.id)}
            />
          );
        }}
        onEndReached={() => handlePagination()}
        onEndReachedThreshold={0.2}
      />

      {
        loading ?
          <LoadingScreen />
          :
          <View />
      }
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