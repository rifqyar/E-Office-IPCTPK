import React, { useEffect, useState } from 'react'
import { 
    Alert,
    Linking,
    Platform,
    StyleSheet, 
    Text, 
    View 
} from 'react-native'
import Lottie from 'lottie-react-native';
import { COLORS, SIZES } from '../../constants/theme';
import { 
    Caption, 
    Title 
} from 'react-native-paper';
import {
  api_base_url,
  api_user,
  api_pass,
  api_res,
  api_p2b_url
} from '../../../app.json'

import { useSelector } from 'react-redux';
import apiCall from '../../helpers/apiCall';

import Geolocation from '@react-native-community/geolocation';

const Map = (props) => {
    console.log(props)
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.userReducer.user.user)
    const [addressData, setAddressData] = useState(null)

    useEffect(() => {
      getAddress()  
      getLocation()  
    }, [user])

    const getAddress = async () => {
        setLoading(true)
        await apiCall(`${api_res}am9_address.php`,{
            usernameEDI:api_user,
            passwordEDI:api_pass,
            id_user:user.IDUSER,
            nipp:user.NIPP,
            id_jabatan:'',
            longitude:'',
            latitude:'',
            action:'get_address',
            status:''
        }, (res) => {
            setLoading(false)
            if (res.rcmsg == 'SUCCESS'){
                setAddressData(res.data)
            }
        })
    }

    const getLocation = () => {
        // Geolocation.requestAuthorization(info => {
        //     console.log(info)
        // })
        Geolocation.getCurrentPosition((info) => {
            console.log(info)
        }, (err) => {
            console.log(err.PERMISSION_DENIED)

            if (err.PERMISSION_DENIED == '1'){
                Alert.alert(err.message, "Gagal mendapatkan Lokasi, nyalakan GPS/Location device anda atau ijinkan aplikasi IMOVE mengakses lokasi anda.", [
                    {
                        text: "Cancel",
                        onPress: () => {
                            Alert.alert('', 'Aplikasi tidak akan bisa melakukan Check In / Check Out jika tidak mengaktifkan GPS / Location Service',
                            {text: 'OK', onPress: () => navigation})
                        },
                        style: "cancel"
                    },
                    { 
                        text: "Buka Pengaturan", 
                        onPress: () => {
                            if (Platform.OS === 'ios') {
                                Linking.openURL('app-settings:');
                            } else {
                                Linking.openSettings();
                            }
                        } 
                    }
                ]);
            }
        });
    }
    
    return (
        <View style={{flex: 1, backgroundColor: COLORS.white}}>
            {
                loading == true
                ?
                    <View style={styles.contaner}>
                        <Lottie source={require('../../assets/icon/location.json')} autoPlay loop style={{
                            width: SIZES.width / 2
                        }} />
                        <Title>
                            Mendapatkan Lokasi Anda
                        </Title>
                    </View>
                :
                    <View style={styles.contaner}>
                        <Text>Map</Text>
                    </View>
            }
        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    contaner:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})