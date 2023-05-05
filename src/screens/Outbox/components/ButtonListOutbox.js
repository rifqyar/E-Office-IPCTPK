import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { MainRouteName } from '../../constants/mainRouteName';
import truncate from '../../../helpers/truncate';

const ButtonListOutbox = ({data}) => {
    return (
        <TouchableOpacity style={{ marginTop: 2.5, marginHorizontal: '0.5%' }}>
            <View style={styles.mail}>
                <View style={{ marginLeft: '5%', width: '10%', justifyContent: 'center' }}>
                    <Ionicons
                        name="mail"
                        color="#0394fc"
                        size={24}
                    />
                </View>
                <View style={{ minWidth: '55%', marginLeft: '2.5%', marginVertical: 10, justifyContent: 'space-evenly' }}>
                    <Text style={{ fontWeight: 'bold', maxWidth: '95%' }}>{truncate(data.Perihal)}</Text>
                    <Text style={{ color: '#0394fc' }}>{data["Tanggal Surat"]}</Text>
                    <Text style={{ color: '#034afc' }}>{data.Status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ButtonListOutbox

const styles = StyleSheet.create({
    mail: {
      flexDirection: 'row', 
      borderLeftColor: '#ce03fc', 
      borderWidth: 0.4,
      borderLeftWidth: 3,
      borderRadius: 5,
      borderTopLeftRadius: 1,
      borderBottomLeftRadius: 1,
      height: 100
    }
  })