import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Text, Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES } from '../../constants/theme';
import CutiListButton from '../../components/Cuti/CutiListButton';
import { useSelector, useDispatch } from 'react-redux';
import {
  api_base_url,
  api_user,
  api_pass
} from '../../../app.json'
import soapCall from '../../helpers/soapCall';
import LoadingScreen from '../../components/LoadingScreen';

const CutiList = () => {
  const user = useSelector(state => state.userReducer.user);
  const [batasAtas, setBatasAtas] = useState(1);
  const [batasBawah, setBatasBawah] = useState(10);
  const dispatch = useDispatch();
  const flatListRef = React.useRef();
  const [cutiList, setCutiList] = useState([]);
  const [atLastPage, setAtLastPage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCutiData();
  }, []);

  const getCutiData = async () => {
    setLoading(true);
    soapCall(api_base_url, 'eoffice_cuti_list', {
      usernameEDI: api_user,
      passwordEDI: api_pass,
      id_user: user.user.IDUSER,
      search_jenis: "",
      search_tgl_pengajuan: "",
      search_tgl_mulai: "",
      search_tgl_selesai: "",
      search_alasan: "",
      atas: batasAtas,
      bawah: batasBawah
    }).then((res) => {
      // console.log(res.data["Cuti Personal"]);
      setLoading(false);
      setCutiList(res.data["Cuti Personal"]);
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
        search_jenis: "",
        search_tgl_pengajuan: "",
        search_tgl_mulai: "",
        search_tgl_selesai: "",
        search_alasan: "",
        atas: newBatasAtas,
        bawah: newBatasBawah
      }
      setLoading(true)
      soapCall(api_base_url, 'eoffice_cuti_list', params).then((res) => {
        const newCutiList = cutiList.concat(res.data["Cuti Personal"]);
        const newData = res.data["Cuti Personal"];
        if (newData.length < 10){
          setAtLastPage(true);
        }
        setCutiList(newCutiList);
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
        data={cutiList}
        // keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => {
          return (
            <CutiListButton
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

export default CutiList

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