import React, { useEffect, useState } from 'react'
import { 
    Alert,
    Linking,
    Platform,
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native'
import Lottie from 'lottie-react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { 
    Caption, 
    Surface, 
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
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MapView from 'react-native-maps';
// import MapboxGL from "@rnmapbox/maps";
import Mapbox, { UserLocation, Camera } from '@rnmapbox/maps';
import Axios from 'axios';
import { format } from 'date-fns'
import { MainRouteName } from '../../constants/mainRouteName';

Mapbox.setAccessToken("pk.eyJ1IjoiY3VraWsiLCJhIjoiY2tmcnAxNHRtMGEyZjJzcGR2ZnFia3J2MyJ9.K9i26lkWh9gSCMA103d8AQ");

const Map = (props) => {
    const { navigation } = props
    const dataValidasi = props.route.params.dataValidasi
    const shiftData = props.route.params.shiftData

    const [loadingAddress, setLoadingAddress] = useState(false)
    const [loadingLocation, setLoadingLocation] = useState(false)
    const user = useSelector(state => state.userReducer.user.user)
    const [addressData, setAddressData] = useState(null)
    const [locationData, setLocationData] = useState(null)
    const [locationDetail, setLocationDetail] = useState('')

    useEffect(() => {
        getAddress()  
        getLocation()
        if (shiftData.CHECK_OUT == true){
            getDetailActivity()
        }
        
    }, [user])

    const getAddress = async () => {
        setLoadingAddress(true)
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
            setLoadingAddress(false)
            if (res.rcmsg == 'SUCCESS'){
                setAddressData(res.data)
            }
        })
    }

    const getLocation = () => {
        setLoadingLocation(true)
        Geolocation.getCurrentPosition(info => {
            setLocationData(info)
            getDetailLocation(info.coords.latitude, info.coords.longitude)
        }, (err) => {
            console.log(err)
            setLoadingLocation(false)

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

    const getDetailLocation = async (lat, lng) => {
        await Axios.get("https://nominatim.openstreetmap.org/reverse?format=json&lat="+lat+"&lon="+lng+"")
                .then((res) => {
                    var location = `${res.data.display_name}`
                    setLocationDetail(location)
                }).catch(err => {
                    console.log(err)
                })
        setLoadingLocation(false)
    }

    const getDetailActivity = async () => {
        var date = format(new Date(), 'dd-MM-yyyy HH:mm:ss', { awareOfUnicodeTokens: true });
        apiCall(`${api_res}am7_activity.php`, {
            usernameEDI: api_user,
            passwordEDI: api_pass,
            id_user: user.IDUSER,
            nipp: user.NIPP,
            arr_param: [],
            action: 'SELECT',
            tgl: date,
            select_type: 'activity'
        }, (res) => {
            if(res.rcmsg == 'SUCCESS'){
                if (res.data.length <= 0){
                    Alert.alert('', 'Harap untuk mengisi activity terlebih dahulu melalui menu Activity sebelum checkout', [
                        { 
                            text: "OK", 
                            onPress: () => {
                                navigation.push(MainRouteName.HOME)
                            } 
                        }
                    ])
                }
            }
        })
    }
    
    return (
        <View style={{flex: 1, backgroundColor: COLORS.white}}>
            {
                (loadingAddress == true || loadingLocation == true) && locationData == null
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
                    <>
                        <View style={styles.contaner}>
                            {
                                Platform.OS == 'ios'
                                ?
                                <MapView
                                    style={{...StyleSheet.absoluteFillObject}}
                                    region={{
                                        latitude: locationData != null ? locationData.coords.latitude : 0,
                                        longitude: locationData != null ?locationData.coords.longitude : 0,
                                        latitudeDelta: 0.010,
                                        longitudeDelta: 0.0021,
                                    }}
                                    showsUserLocation={true}
                                    loadingEnabled={true}
                                />
                                :
                                <View style={styles.container2}>
                                    <Mapbox.MapView style={styles.map}>
                                        <Mapbox.UserLocation visible={true} />
                                        <Mapbox.Camera 
                                            animationMode='none'
                                            zoomLevel={16}
                                            followZoomLevel={16}
                                            centerCoordinate={locationData != null ? [locationData.coords.longitude, locationData.coords.latitude] : [0,0]}
                                        />
                                    </Mapbox.MapView>
                                </View>
                            }

                            <View style={styles.footer}>
                                <Surface style={styles.detailLocationContainer} elevation={5} >
                                    <Title style={{...FONTS.h6}}>
                                        Your Location
                                    </Title>
                                    <View style={{width: '100%', height: 1, backgroundColor: COLORS.Grey, borderRadius: 10, marginVertical: 10}} />
                                    <View style={styles.detailLocationInner}>
                                        <MaterialIcon  name={'location-pin'} size={34} color={COLORS.darkOrange} style={{marginRight: SIZES.padding*2}} />
                                        <View style={styles.detailLocation}>
                                            <Caption style={{fontSize:SIZES.body6, flex: 1, flexWrap: 'wrap'}}>
                                                {locationDetail}
                                            </Caption>
                                            
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                                <Caption>
                                                    <Text style={{fontWeight: 'bold'}}>Lat :</Text> {locationData != null ? locationData.coords.latitude : ''}
                                                </Caption>
                                                <Caption style={{marginLeft: SIZES.padding * 3}}>
                                                    <Text style={{fontWeight: 'bold'}}>Long :</Text> {locationData != null ? locationData.coords.longitude : ''}
                                                </Caption>
                                            </View>
                                        </View>
                                    </View>
                                </Surface>
                                
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={{
                                        backgroundColor: COLORS.lightTeal,
                                        padding: SIZES.padding*1.5,
                                        borderRadius: 20,
                                        flex:1,
                                        flexDirection:'row', 
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <MaterialIcon name={'fingerprint'} size={32} color={COLORS.white} />
                                    <Text style={{...FONTS.body4, textAlign:'center', color: COLORS.white, marginLeft: SIZES.padding}}>
                                        {
                                            shiftData.CHECK_OUT 
                                            ? 
                                                'Check Out'
                                            :
                                                'Check In'
                                        }
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
            }
        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',  
    },
    container2: {
        height: '100%',
        width: '100%',
    },
    contaner:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer:{
        position: 'absolute', 
        width: '90%', 
        bottom: 0, 
        marginBottom: SIZES.padding*3
    },
    detailLocationContainer: {
        marginBottom: SIZES.padding,
        padding: SIZES.padding * 2,
        borderRadius: 25,
    }, 
    detailLocationInner: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    detailLocation: {
        flex: 1,
    },
    map: {
        flex: 1
    }
})