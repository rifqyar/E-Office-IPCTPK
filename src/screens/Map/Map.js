import React, { useEffect, useState } from 'react'
import { 
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

const Map = () => {
    const [loading, setLoading] = useState(true)
    const user = useSelector(state => state.userReducer.user.user)
    const [addressData, setAddressData] = useState(null)

    useEffect(() => {
      getAddress()    
    }, [])

    const getAddress = async () => {
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
            if (res.rcmsg == 'SUCCESS'){
                setAddressData(res.data)
            }
        })
    }
    
    return (
        <View style={{flex: 1, backgroundColor: COLORS.white}}>
            {
                loading 
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