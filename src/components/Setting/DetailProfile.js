import { 
    Appearance,
    StyleSheet, 
    View 
} from 'react-native'
import React from 'react'
import { Caption, Text, Surface, Title } from 'react-native-paper'
import { COLORS, FONTS, SIZES } from '../../constants/theme'
import Icon from 'react-native-vector-icons/MaterialIcons'

const DetailProfile = (props) => {
    const {user} = props
    return (
        <View style={styles.mainContainer}>
            <Surface style={styles.containerDivisi} elevation={3}>
                <View style={{flex: 1}}>
                    <Caption style={styles.headerDivisi}>
                        Divisi
                    </Caption>
                    <View style={styles.lineDivisi} />
                    <Caption>
                        {user != null ? (user.DIVISI != '' ? truncate(user.DIVISI, 20) : '') : ''}
                    </Caption>
                </View>

                <View style={{height: '100%', width: 1, backgroundColor: COLORS.Grey, marginHorizontal: 10, opacity: 0.5 }} />

                <View style={{flex: 1}}>
                    <Caption style={styles.headerDivisi}>
                        Atasan
                    </Caption>
                    <View style={styles.lineDivisi} />
                    <Caption>
                        {user != null ? (user.NAMA_ATASAN != '' ? truncate(user.NAMA_ATASAN, 20) : '') : ''}
                    </Caption>
                </View>
            </Surface>

            <Title style={{...FONTS.h5}}>
                Profile
            </Title>

            <View style={{backgroundColor: COLORS.Cyan, width: '30%', height: 2, marginBottom: SIZES.padding2}} />

            <View style={styles.containerProfile}>
                <View style={{backgroundColor: COLORS.Orange, borderRadius: 100, padding: 10}}>
                    <Icon name={'badge'} size={28} color={COLORS.white} style={{opacity: 0.8}} />
                </View>

                <View style={{marginLeft: SIZES.padding * 2}}>
                    <Caption style={{ fontSize:SIZES.body6 }}>
                        NIPP
                    </Caption>
                    <Text style={{...FONTS.body4}}>
                        {user != null ? user.NIPP : ''}
                    </Text>
                </View>
            </View>
            <View style={styles.lineProfile} />


            <View style={styles.containerProfile}>
                <View style={{backgroundColor: COLORS.Pink, borderRadius: 100, padding: 10}}>
                    <Icon name={'contact-mail'} size={28} color={COLORS.white} style={{opacity: 0.8}} />
                </View>

                <View style={{marginLeft: SIZES.padding * 2}}>
                    <Caption style={{ fontSize:SIZES.body6 }}>
                        Email
                    </Caption>
                    <Text style={{...FONTS.body4}}>
                        {user != null ? user.EMAIL : ''}
                    </Text>
                </View>
            </View>
            <View style={styles.lineProfile} />


            <View style={styles.containerProfile}>
                <View style={{backgroundColor: COLORS.accentTeal, borderRadius: 100, padding: 10}}>
                    <Icon name={'contact-phone'} size={28} color={COLORS.white} style={{opacity: 0.8}} />
                </View>

                <View style={{marginLeft: SIZES.padding * 2}}>
                    <Caption style={{ fontSize:SIZES.body6 }}>
                        Nomor Telepon
                    </Caption>
                    <Text style={{...FONTS.body4}}>
                        {user != null ? user.HP : ''}
                    </Text>
                </View>
            </View>
            <View style={styles.lineProfile} />
        </View>
    )  
}

export default DetailProfile

const styles = StyleSheet.create({
    mainContainer: {
        flex:1, 
        marginHorizontal: SIZES.padding * 3, 
        marginTop: SIZES.padding*2
    },
    containerDivisi: {
        flexDirection: 'row', 
        borderRadius: 15, 
        padding: SIZES.padding2, 
        marginBottom: SIZES.padding2*2, 
        backgroundColor: Appearance.getColorScheme() == 'light' ? COLORS.white : COLORS.blackLighten
    }, 
    headerDivisi: {
        fontSize:16, 
        fontWeight: 700,
        color: Appearance.getColorScheme() == 'light' ? COLORS.blackLighten : COLORS.white
    },
    lineDivisi : {
        backgroundColor: COLORS.Cyan, 
        width: '50%', 
        height: 1.5, 
        opacity: 0.5
    },
    lineProfile : {
        width: '100%', 
        height: 2, 
        backgroundColor: Appearance.getColorScheme() == 'light' ? COLORS.lightGrey : COLORS.blackLighten,
        borderRadius: 10
    },
    containerProfile: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: SIZES.padding2*2, 
        marginBottom: SIZES.padding
    }
})