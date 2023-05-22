import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, FONTS, SIZES } from '../../constants/theme'
import { Avatar, Caption, Headline, Title } from 'react-native-paper'
import { useSelector } from 'react-redux'
import MaskedView from '@react-native-masked-view/masked-view';

const HeaderSetting = (props) => {
    const user = useSelector(state => state.userReducer.user.user)
    const {isLandscape} = props
    return (
        <View style={{flex: 1}}>
            <LinearGradient 
                colors={[COLORS.Blue, COLORS.accentBlue]}
                style={[styles.headerContainer, {paddingVertical: isLandscape ? SIZES.padding * 3 : 0}]}
            >   
                <View style={styles.avatarBorder}>
                    <Avatar.Image source={{uri: user.FOTO }} size={100} />
                </View>
                <Caption style={{...FONTS.h6, color: COLORS.white, marginTop: SIZES.padding * 3}}>
                    {user.NAMA}
                </Caption>
                <Caption style={{fontSize: SIZES.body6, color: COLORS.white, marginTop: -5 }}>
                    {user.NAMAJABATAN}
                </Caption>
            </LinearGradient>
        </View>      
    )
}

export default HeaderSetting

const styles = StyleSheet.create({
    headerContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        
    },
    avatarBorder:{
        width: 110,
        height: 110,
        borderWidth: 4,
        borderRadius: 100,
        borderColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center'
    }
})