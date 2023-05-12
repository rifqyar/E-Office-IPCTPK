import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { loading } from '../../redux/actions/loadingAction';
import { COLORS, SIZES } from '../../constants/theme';
import { useSelector, useDispatch } from 'react-redux';
import {
  api_base_url,
  api_user,
  api_pass
} from '../../../app.json'
import soapCall from '../../helpers/soapCall';
import ButtonListInbox from '../../components/Inbox/ButtonListInbox';

const Inbox = ({ navigation }) => {
  const user = useSelector(state => state.userReducer.user);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const flatListRef = React.useRef();
  const [inboxes, setInboxes] = useState([]);
  const [atLastPage, setAtLastPage] = useState(false);

  useEffect(() => {
    getInbox();
  }, []);

  const getInbox = async () => {
    dispatch(loading());
    soapCall(api_base_url, 'eoffice_inbox', {
      usernameEDI: api_user,
      passwordEDI: api_pass,
      iduser: user.user.IDUSER,
      idjabatan: user.user.IDJABATAN,
      page: currentPage,
      jmlpage: '20',
      perihal: "",
      tanggalawal: "",
      tanggalakhir: "",
      sorting: "1",
      filter: "0"
    }).then((res) => {
      // console.log(res)
      setInboxes(res.data.List_Inbox);
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
      dispatch(loading());
      soapCall(api_base_url, 'eoffice_inbox', params).then((res) => {
        const newList = inboxes.concat(res.data.List_Inbox);
        const newData = res.data.List_Inbox;
        // console.log(newData.length)
        if (newData.length < 20){
          setAtLastPage(false);
        }
        setInboxes(newList);
      })
    }
  }

  return (
    <View>
      <FlatList
        style={{ minHeight: '100%', backgroundColor: COLORS.white }}
        nestedScrollEnabled={true}
        vertical
        data={inboxes}
        // keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => {
          return (
            <ButtonListInbox
              key={item.id}
              data={item}
            // nav={() => functionNavigate(item.id)}
            />
          );
        }}
        onEndReached={() => handlePagination()}
        onEndReachedThreshold={0.2}
      />
    </View>
  )
}

export default Inbox

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