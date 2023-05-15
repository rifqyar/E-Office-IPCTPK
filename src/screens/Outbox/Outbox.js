import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { MainRouteName } from '../../constants/mainRouteName';
import truncate from '../../helpers/truncate';
import { COLORS, SIZES } from '../../constants/theme';
import { loading } from '../../redux/actions/loadingAction';
import { useSelector, useDispatch } from 'react-redux';
import {
  api_base_url,
  api_user,
  api_pass
} from '../../../app.json'
import soapCall from '../../helpers/soapCall';
import ButtonListOutbox from '../../components/Outbox/ButtonListOutbox';
import LoadingScreen from '../../components/LoadingScreen';

const Outbox = ({ navigation }) => {
  const user = useSelector(state => state.userReducer.user);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const flatListRef = React.useRef();
  const [outboxes, setOutboxes] = useState([]);
  const [atLastPage, setAtLastPage] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getOutbox();
  }, []);

  const getOutbox = async () => {
    setLoading(true)
    soapCall(api_base_url, 'eoffice_outbox', {
      usernameEDI: api_user,
      passwordEDI: api_pass,
      iduser: user.user.IDUSER,
      idjabatan: user.user.IDJABATAN,
      page: currentPage,
      jmlpage: '20',
      perihal: "",
      tanggalawal: "",
      tanggalakhir: "",
    }).then((res) => {
      setOutboxes(res.data["List Outbox"]);
      setLoading(false)
    })
  }

  const handlePagination = async () => {
    let newPage = currentPage + 1;
    setCurrentPage(newPage);
    if (atLastPage) {
      return;
    } else {
      let params = {
        usernameEDI: api_user,
        passwordEDI: api_pass,
        iduser: user.user.IDUSER,
        idjabatan: user.user.IDJABATAN,
        page: newPage,
        jmlpage: '20',
        perihal: "",
        tanggalawal: "",
        tanggalakhir: "",
        sorting: "1",
        filter: "0"
      }
      setLoading(true)
      soapCall(api_base_url, 'eoffice_outbox', params).then((res) => {
        const newList = outboxes.concat(res.data["List Outbox"]);
        const newData = res.data["List Outbox"];
        // console.log(newData.length)
        if (newData.length < 20){
          setAtLastPage(true);
        }
        setLoading(false)
        setOutboxes(newList);
      })
    }
  }

  return (
    <View style={{backgroundColor: 'white', minHeight: '100%'}}>
      <FlatList
        style={styles.flatListStyle}
        nestedScrollEnabled={true}
        vertical
        data={outboxes}
        // keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => {
          return (
            <ButtonListOutbox
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

export default Outbox

const styles = StyleSheet.create({
  flatListStyle: {
    minHeight: '100%', 
    backgroundColor: COLORS.white
  }
})