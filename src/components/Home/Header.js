import React, { useRef, useState } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Image,
    ImageBackground,
    FlatList
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { MainRouteName } from '../../constants/mainRouteName';
import { Avatar, Badge, Caption, Card, IconButton, Surface, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from "react-native-raw-bottom-sheet";

const Header = (props) => {
    const { navigation, badgeList, dataValidasi } = props
    const user = useSelector(state => state.userReducer.user.user); //test
    const refRBSheet = useRef();

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

    const listMenuHadirkoe = [
        {
            id: 1,
            icon: 'calendar-check-outline',
            color: COLORS.lightGreen,
            backgroundColor: COLORS.Green,
            route: '',
            description: 'Check In',
            isShow: true
        },{
            id: 2,
            icon: 'calendar-check-outline',
            color: COLORS.lightRed,
            backgroundColor: COLORS.Red,
            route: '',
            description: 'Check Out',
            isShow: true
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
        }
    ]

    const MenuItem = ({item}) => {
        if (item.isShow){
            return (
                <TouchableOpacity
                    style={{
                        marginBottom: SIZES.padding*2,
                        width: '33%',
                        alignItems:'center',
                    }}
                    onPress={() => {
                        if(item.route != 'hadirkoe'){
                            navigation.push(item.route)
                        } else {
                            refRBSheet.current.open()
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
                                opacity: 1,
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
        if (item.isShow){
            return (
                <TouchableOpacity
                    style={{
                        marginBottom: SIZES.padding*2,
                        width: '33%',
                        alignItems:'center',
                    }}
                    onPress={() => {
                        if(item.route != ''){
                            navigation.push(item.route)
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
                            opacity: 1,
                            position:'absolute',top: 9}}/>
                    
                    <Text style={{textAlign:'center', flexWrap:'wrap', }}>
                        {item.description}
                    </Text>
                </TouchableOpacity>
            )
        }
    }

    return (
        <>
            <LinearGradient colors={[COLORS.Blue, COLORS.accentBlue]} style={{paddingHorizontal: '2.5%', height: '26%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
                <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center', paddingVertical: SIZES.padding}}>
                    <Image source={require('../../assets/imgs/ipc-tpk-logo-new.png')} style={{ height: 27, width: 89, marginTop: 10, marginLeft: '2.5%' }} />
                    {/* <Text style={{ color: COLORS.white, marginTop: 7.5, fontSize: 20 }}>E-Office</Text> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '3%'}}>
                        <TouchableOpacity>
                            <Icon
                                name="settings"
                                color={COLORS.white}
                                size={24}
                                style={{ marginRight: '5%' }}
                            />
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => navigation.navigate(MainRouteName.LOGIN)}>
                            <Icon
                                name="logout"
                                color={COLORS.white}
                                size={24}
                                style={{ marginRight: '5%' }}
                            />
                        </TouchableOpacity> */}
                    </View>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: '2.5%'}}>
                    <View style={{marginTop: '2.5%'}}>
                        <Avatar.Image source={{uri: user.FOTO}}/>
                    </View>
                    <View style={{ marginLeft: '2.5%' }}>
                        <Text style={{ color: COLORS.white, marginTop: 10, fontSize: 16 }}>Welcome,</Text>
                        <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: 'bold' }}>{user.NAMA}</Text>
                        <Caption style={{color:COLORS.white}}>{user.NAMAJABATAN}</Caption>
                    </View>
                </View>

            </LinearGradient>
            <Surface style={{backgroundColor: COLORS.white, marginTop: '-15%',marginBottom: 10, borderRadius: 25, marginHorizontal: '5%'}}>
                <FlatList 
                    data={listMenu}
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
                height={200}
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
                <View style={{flex: 1, margin: SIZES.padding * 2}}>
                    <Text style={{...FONTS.h5, fontWeight: '700'}} >Hadirkoe</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: SIZES.padding4}}>
                        <FlatList 
                            data={listMenuHadirkoe}
                            numColumns={4}
                            columnWrapperStyle={{ justifyContent:'space-around' }}
                            keyExtractor={item => `${item.id}`}
                            renderItem={item => MenuItemHadirkoe(item)}
                            style={{marginTop:SIZES.padding}}
                        />
                    </View>
                </View>
            </RBSheet>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      backgroundColor: '#006ba2',
    },
    buttonMenu:{
        height: 50,
        width: 50,
        marginBottom: 5,
        borderRadius: 20,
        opacity: 0.2,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default Header