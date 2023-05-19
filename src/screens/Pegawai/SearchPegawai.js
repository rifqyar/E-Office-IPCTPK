import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {
    TextInput,
    Text
} from 'react-native-paper'
import { COLORS } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import soapCall from '../../helpers/soapCall';
import LoadingScreen from '../../components/LoadingScreen';
import {
    api_base_url,
    api_user,
    api_pass
} from '../../../app.json';
import SearchPegawaiListButton from '../../components/Pegawai/SearchPegawaiListButton';
import { FlatList } from 'react-native-gesture-handler';

const SearchPegawai = () => {
    const [namaPegawai, setNamaPegawai] = useState();
    const [dataPegawai, setDataPegawai] = useState([]);
    const [loading, setLoading] = useState(false);
    const [batasAtas, setBatasAtas] = useState(1);
    const [batasBawah, setBatasBawah] = useState(10);

    const searchPegawai = async () => {
        setLoading(true)
        soapCall(api_base_url, 'eoffice_findemployee', {
            usernameEDI: api_user,
            passwordEDI: api_pass,
            search: namaPegawai.toUpperCase(),
            atas: batasAtas,
            bawah: batasBawah
        }).then((res) => {
            // console.log(res.data)
            setDataPegawai(res.data);
            setLoading(false)
        })
    }


    return (
        <View>
            <View style={styles.container}>
                <TextInput
                    label="Cari (Nama/NIPP/Jabatan)"
                    onChangeText={(text) => setNamaPegawai(text)}
                    // placeholder="Masukan kata kunci Anda"
                    style={styles.textInput}
                    underlineStyle={{
                        backgroundColor: COLORS.Grey
                    }}
                    textColor={COLORS.black}
                    placeholderTextColor={COLORS.Grey}
                    value={namaPegawai}
                    onFocus={this.onFocus}
                    // error={errors.nipp}
                    dense
                    left={<TextInput.Icon icon="account-multiple" />}
                />
                <TouchableOpacity onPress={searchPegawai} style={[styles.searchButton, { opacity: (namaPegawai) ? 1 : 0.6 }]}>
                    <Icon
                        name="search"
                        color={COLORS.white}
                        size={20}
                        style={{ marginRight: 2 }}
                    />
                    <Text style={{ color: COLORS.white }}>Cari</Text>
                </TouchableOpacity>
                <FlatList
                    style={{ minHeight: '100%', backgroundColor: COLORS.white }}
                    nestedScrollEnabled={true}
                    vertical
                    data={dataPegawai}
                    // keyExtractor={(item, index) => item.id}
                    renderItem={({ item, index }) => {
                        return (
                            <SearchPegawaiListButton
                                key={item.id}
                                data={item}
                            // nav={() => functionNavigate(item.id)}
                            />
                        );
                    }}
                    // onEndReached={() => handlePagination()}
                    onEndReachedThreshold={0.2}
                />
            </View>
            {
                loading ?
                    <LoadingScreen />
                    :
                    <View />
            }
        </View>
    )
}

export default SearchPegawai

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
    },
    textInput: {
        width: '90%',
        marginLeft: '5%',
        borderWidth: 0,
        marginTop: 10,
        backgroundColor: COLORS.transparent
    }
})