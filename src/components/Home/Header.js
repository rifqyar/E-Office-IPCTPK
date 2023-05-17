import React, { useRef, useState } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Image,
    ImageBackground,
    FlatList,
    Platform
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { MainRouteName } from '../../constants/mainRouteName';
import { Avatar, Badge, Caption, Card, IconButton, Surface, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from "react-native-raw-bottom-sheet";
import LoadingScreen from '../LoadingScreen';
import soapCall from '../../helpers/soapCall';
import {
    api_base_url_hadirkoe,
    api_user,
    api_pass,
  } from '../../../app.json'

const Header = (props) => {
    const { navigation, badgeList, dataValidasi, isLandscape} = props
    const user = useSelector(state => state.userReducer.user.user); //test
    const refRBSheet = useRef();
    const [loading, setLoading] = useState(false)
    const [shiftData, setShiftData] = useState(null)

    const listMenu = [
        {
            id: 1,
            icon: 'mail',
            color: COLORS.accentOrange,
            backgroundColor: COLORS.lightOrange,
            route: MainRouteName.INBOX,
            description: 'Surat Masuk',
            badge: badgeList != null ? badgeList.JUMLAH_SURAT_ALL_BADGES : 0,
            isShow: true
        },{
            id: 2,
            icon: 'outgoing-mail',
            color: COLORS.Amber,
            backgroundColor: COLORS.lightYellow,
            route: MainRouteName.OUTBOX,
            description: 'Surat Keluar',
            badge: badgeList != null ? 0 : 0,
            isShow: true
        },{
            id: 3,
            icon: 'hadirkoe',
            color: COLORS.Orange,
            backgroundColor: COLORS.lightRed,
            route: 'hadirkoe',
            description: 'Hadirkoe',
            isShow: dataValidasi != null ? user.TNO == false && dataValidasi.HADIRKOE == true ? true : false : true,
        },{
            id: 4,
            icon: 'airplanemode-active',
            color: COLORS.Red,
            backgroundColor: COLORS.lightRed,
            route: '',
            description: 'SPPD',
            isShow: user.TNO == true && dataValidasi.HADIRKOE == false ? true : false
        }
    ]

    const listMenuHadirkoe = [{
        id: 1,
        icon: 'calendar-check-outline',
        color: COLORS.lightGreen,
        backgroundColor: COLORS.Green,
        route: MainRouteName.MAP,
        description: 'Check In',
        isShow: shiftData != null ? shiftData.CHECK_IN : false
    },{
        id: 2,
        icon: 'calendar-check-outline',
        color: COLORS.lightRed,
        backgroundColor: COLORS.Red,
        route: MainRouteName.MAP,
        description: 'Check Out',
        isShow: shiftData != null ? shiftData.CHECK_OUT : false
    },{
        id: 3,
        icon: 'clipboard-text-clock-outline',
        color: COLORS.lightCyan,
        backgroundColor: COLORS.Cyan,
        route: '',
        description: 'Activity',
        isShow: true
    },{
        id: 4,
        icon: 'account-group',
        color: COLORS.lightPurple,
        backgroundColor: COLORS.Purple,
        route: '',
        description: 'Team',
        isShow: true
    }]

    const getValidasi = async () => {
        setLoading(true)
        await soapCall(api_base_url_hadirkoe, 'am3_check_shift', {
            usernameEDI: api_user,
            passwordEDI: api_pass,
            person_id: '',
            nipp: user.NIPP,
            iduser: user.IDUSER
        }).then((res) => {
            if(res.rcmsg == "SUCCESS"){
                setShiftData(res.data)
            } else {
              // setErrorAPI(true)
            }
            setLoading(false)
        })
    }

    const MenuItem = ({item}) => {
        if (item.isShow){
            return (
                <TouchableOpacity
                    style={{
                        marginBottom: SIZES.padding,
                        width: '33%',
                        alignItems:'center',
                    }}
                    onPress={() => {
                        if(item.route != 'hadirkoe'){
                            navigation.push(item.route)
                        } else {
                            refRBSheet.current.open()
                            getValidasi()
                        }
                    }}
                >
                    <View
                        style={[
                            styles.buttonMenu,
                            {backgroundColor: item.backgroundColor}
                        ]}>
                    </View>
                    {
                        item.icon != 'hadirkoe'
                        ?
                        <>

                            <Icon 
                            name={item.icon} 
                            size={32} 
                            color={item.color}
                            style={{
                                opacity: 0.6,
                                position:'absolute',top: 9}}/>
                            {
                            item.badge && item.badge != 0
                                ?
                                    <Badge style={{position:'absolute', right:'25%'}}> {item.badge} </Badge>
                                :
                                    <></>
                            }
                        </>
                        :
                            <Image source={require('../../assets/flat-icon/hadirkoe.png')} style={{ height: 32, width: 32,position:'absolute',top: 9 }} />
                    }
                    
                    <Text style={{textAlign:'center', flexWrap:'wrap', }}>
                        {item.description}
                    </Text>
                </TouchableOpacity>
            )
        }
    }

    const MenuItemHadirkoe = ({item}) => {
        return (
            <TouchableOpacity
                disabled={!item.isShow}
                style={{
                    marginBottom: SIZES.padding*2,
                    width: '33%',
                    alignItems:'center',
                    opacity: item.isShow ? 1 : 0.5
                }}
                onPress={() => {
                    if(item.route != ''){
                        navigation.push(item.route, props)
                        refRBSheet.current.close()
                    }
                }}
            >
                <View
                    style={[
                        styles.buttonMenu,
                        {backgroundColor: item.backgroundColor}
                    ]}>
                </View>
                <MaterialCommunityIcons 
                    name={item.icon} 
                    size={32} 
                    color={item.color}
                    style={{
                        opacity: item.isShow ? 0.6 : 0.3,
                        position:'absolute',top: 9}}/>
                
                <Text style={{textAlign:'center', flexWrap:'wrap', }}>
                    {item.description}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{flex: 1}}>
            <LinearGradient 
                colors={[COLORS.Blue, COLORS.accentBlue]} 
                style={[styles.headerBanner, {
                    paddingBottom: !isLandscape ? (Platform.OS == 'android' ? '20%' : '15%' )  : '7%'
                }]}>
                <View style={[styles.header, {
                    paddingVertical: !isLandscape ? SIZES.padding : 0
                }]}>
                    <Image source={require('../../assets/imgs/ipc-tpk-logo-new.png')} style={{ height: 27, width: 89, marginTop: 10, marginLeft: '2.5%' }} />

                    <View style={{marginTop: '3%'}}>
                        <TouchableOpacity>
                            <Icon
                                name="settings"
                                color={COLORS.white}
                                size={24}
                                style={{ marginRight: '5%' }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.profileSection}>
                    <View style={{marginTop: !isLandscape ? '2.5%' : 0}}>
                        <Avatar.Image source={{uri: user.FOTO}}/>
                    </View>
                    <View style={{ marginLeft: '2.5%' }}>
                        <Text style={{ color: COLORS.white, marginTop: 10, fontSize: 16 }}>Welcome,</Text>
                        <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: 'bold' }}>{user.NAMA}</Text>
                        <Caption style={{color:COLORS.white}}>{user.NAMAJABATAN}</Caption>
                    </View>
                </View>
            </LinearGradient>

            <Surface 
                style={[styles.menu ,{
                    bottom: isLandscape ? (Platform.OS == 'android' ? -50 : 20)  : (Platform.OS == 'android' ? -20 : 15) ,
                }]}>
                <FlatList 
                    data={listMenu}
                    scrollEnabled={false}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent:'space-around' }}
                    keyExtractor={item => `${item.id}`}
                    renderItem={item => MenuItem(item)}
                    style={{marginTop:SIZES.padding}}
                />
            </Surface>

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={Platform.OS == 'android' ? 200 : 230}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    },
                    container:{
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    },
                }}
            >
                <View style={{flex: 1}}>
                    <Text style={{fontSize: 18, color: COLORS.darkGrey, fontWeight: '700', marginLeft: SIZES.padding * 2.5}} >Hadirkoe</Text>
                    {
                        loading == true 
                        ? 
                            <LoadingScreen isTransparent={true} />
                        :
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: SIZES.padding4*2 }}>
                                <FlatList 
                                    data={listMenuHadirkoe}
                                    scrollEnabled={false}
                                    numColumns={4}
                                    columnWrapperStyle={{ justifyContent:'space-around' }}
                                    keyExtractor={item => `${item.id}`}
                                    renderItem={item => MenuItemHadirkoe(item)}
                                />
                            </View>
                    }
                </View>
            </RBSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row', 
        justifyContent:'space-between', 
        alignItems:'center', 
    },
    profileSection: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginLeft: '2.5%'
    },
    buttonMenu:{
        height: 50,
        width: 50,
        marginBottom: 5,
        borderRadius: 20,
        opacity: 0.2,
        alignItems:'center',
        justifyContent:'center'
    },
    headerBanner: {
        paddingHorizontal: '2.5%', 
        borderBottomLeftRadius: 20, 
        borderBottomRightRadius: 20,
    },
    menu: {
        backgroundColor: COLORS.white, 
        marginBottom: 10, 
        borderRadius: 25, 
        marginHorizontal: '5%',
        position: 'absolute',
    }
})

export default Header