import React from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';
import { MainRouteName } from '../../constants/mainRouteName';
import { Avatar, Caption, Card } from 'react-native-paper';
import { useSelector } from 'react-redux';

const Header = (props) => {
    const { navigation } = props
    const user = useSelector(state => state.userReducer.user.user); //test

    const CardMenuButton = ({ title, bgColor, imgSrc, navigation, route }) => {
        // const navigation = useNavigation();
        return (
        <TouchableOpacity onPress={() => navigation.navigate(route)}>
            <View style={{ alignItems: 'center', marginHorizontal: '5%' }}>
            <View style={{ backgroundColor: bgColor, height: 55, width: 55, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={imgSrc} style={{ height: 40, width: 40 }} />
            </View>
            <Text>{title}</Text>
            </View>
        </TouchableOpacity>
        )
    }

    return (
        <>
        <View style={ styles.header }>
            <View style={{ flexDirection: 'row', marginVertical: 10, marginLeft: '2.5%' }}>
                <Image source={require('../../assets/imgs/ipc-tpk-logo-new.png')} style={{ height: 27, width: 89, marginTop: 10, marginLeft: '2.5%' }} />
                <Text style={{ color: COLORS.white, marginTop: 7.5, marginLeft: 7.5, fontSize: 20 }}>E-Office</Text>
            </View>
            <View style={{ flexDirection: 'row-reverse', marginTop: 17.5, marginRight: '2.5%' }}>
                <TouchableOpacity onPress={() => navigation.navigate(MainRouteName.LOGIN)}>
                    <AntDesign
                        name="logout"
                        color="rgba(255, 255, 255, .9)"
                        size={24}
                        style={{ marginRight: '5%' }}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons
                        name="settings-sharp"
                        color="rgba(255, 255, 255, .9)"
                        size={24}
                        style={{ marginRight: '5%' }}
                    />
                </TouchableOpacity>
            </View>
        </View>

        <View>
            <ImageBackground source={require('../../assets/imgs/header-bg-2.png')}>
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
                <Card style={{ marginTop: 20, marginHorizontal: '2.5%', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        <CardMenuButton
                        title={'Surat Masuk'} bgColor={COLORS.darkOrange} navigation={navigation} route={MainRouteName.INBOX}
                        imgSrc={require('../../assets/imgs/menu-icon/inbox-white.png')}
                        />
                        <CardMenuButton
                        title={'Surat Keluar'} bgColor={COLORS.lightYellow} navigation={navigation} route={MainRouteName.OUTBOX}
                        imgSrc={require('../../assets/imgs/menu-icon/outbox-white.png')}
                        />
                        <CardMenuButton
                        title={'HadirKoe'} bgColor={COLORS.lightGrey}
                        imgSrc={require('../../assets/flat-icon/hadirkoe.png')}
                        />
                    </View>
                </Card>
            </ImageBackground>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      backgroundColor: '#006ba2',
    }
})

export default Header