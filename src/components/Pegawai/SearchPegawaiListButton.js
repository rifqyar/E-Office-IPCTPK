import React from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MainRouteName } from '../../constants/mainRouteName';
import { COLORS } from '../../constants/theme';

const SearchPegawaiListButton = ({data}) => {
    return (
        <TouchableOpacity //onPress={() => navigation.navigate(MainRouteName.INBOX_DETAIL, { mail: data })}
            style={styles.buttonStyle}>
            <View style={{ flexDirection: 'row', borderLeftColor: COLORS.lightPurple, borderLeftWidth: 3, height: 120 }}>
                <View style={{ marginLeft: '2.5%', width: '20%', justifyContent: 'center' }}>
                    <Image
                        source={{ uri: data.FOTO }}
                        style={{height: '80%'}}
                    />
                </View>
                <View style={{ width: '75%', marginLeft: '2.5%', justifyContent: 'space-evenly' }}>
                    <Text>{data.NIPP}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{data.NAMA}</Text>
                    <Text>{data.NAMA_CABANG}</Text>
                    <Text style={{ color: COLORS.Grey }}>{data.NAMA_JABATAN}</Text>
                    <Text style={{ color: COLORS.Red }}>{data.EMAIL}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SearchPegawaiListButton

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