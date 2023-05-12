import React from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { MainRouteName } from '../../constants/mainRouteName';
import truncate from '../../helpers/truncate';
import { COLORS } from '../../constants/theme';

const AbsentListButton = ({ data }) => {
    const navigation = useNavigation();

    let keteranganColor = COLORS.Blue;
    if (data.KETERANGAN === 'MANGKIR' || data.KETERANGAN === 'LIBUR'){
        keteranganColor = COLORS.Red;
    } else if (data.KETERANGAN === 'Sabtu' || data.KETERANGAN === 'Minggu'){
        keteranganColor = COLORS.Green;
    }

    return (
        <View style={{ marginTop: 2.5, marginHorizontal: '0.5%', zIndex: 1 }}>
            <View style={{ flexDirection: 'row', borderWidth: 0.1, borderRadius: 2, paddingVertical: 10 }}>
                <View style={{ marginLeft: '5%', width: '10%', justifyContent: 'center' }}>
                    <Image
                        source={require('../../assets/imgs/menu-icon/absensi.png')}
                        style={{ height: 30, width: 30 }}
                    />
                </View>
                <View style={{ minWidth: '52.5%', marginLeft: '2.5%' }}>
                    <Text style={{ fontWeight: 'bold', marginTop: 5 }}>Tanggal {data.TANGGAL}</Text>
                    <Text style={{ color: COLORS.Grey, marginTop: 5 }}>Datang:
                        <Text style={{ color: COLORS.black }}>{data.JAM_DATANG}</Text> | Status:
                        <Text style={{ color: data.STATUS_DATANG === 'APPROVED' ? COLORS.Blue : COLORS.Red }}> {data.STATUS_DATANG}</Text>
                    </Text>
                    <Text style={{ color: COLORS.Grey }}>Ket Datang:</Text>
                    <Text style={{ color: COLORS.black }}>{data.KETERANGAN_MASUK}</Text>
                    <Text style={{ color: COLORS.Grey, marginTop: 5 }}>Pulang:
                        <Text style={{ color: COLORS.black }}>{data.JAM_PULANG}</Text> | Status:
                        <Text style={{ color: data.STATUS_DATANG === 'APPROVED' ? COLORS.Blue : COLORS.Red }}> {data.STATUS_PULANG}</Text>
                    </Text>
                    <Text style={{ color: COLORS.Grey }}>Ket Pulang:</Text>
                    <Text style={{ color: COLORS.black }}>{data.KETERANGAN_PULANG}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate(MainRouteName.ABSENT_DETAIL)}
                    style={styles.detailButton}
                >
                    <Text style={{ fontSize: 12, color: keteranganColor, textAlign: 'center' }}>{data.KETERANGAN}</Text>
                    <Image
                        source={require('../../assets/flat-icon/absen_mobile.png')}
                        style={{ height: 25, width: 25, marginTop: 5 }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AbsentListButton

const styles = StyleSheet.create({
    detailButton: {
        width: '30%', 
        alignItems: 'center', 
        justifyContent: 'center'
    }
  })