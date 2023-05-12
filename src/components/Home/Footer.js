import React from 'react'
import { 
    View, 
    Text, 
    TouchableOpacity
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Caption } from 'react-native-paper'
import { COLORS } from '../../constants/theme'
import { Image } from 'iconsax-react-native'

const Footer = (props) => {
    const {navigation, agendaList} = props
    return (
        <View>
            {/* Agenda */}
            <View style={{ backgroundColor: COLORS.white, marginTop: 10, marginHorizontal: '3%' }}>
                <Text style={{ marginLeft: '2.5%', fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>Agenda</Text>
                <Caption style={{ marginLeft: '2.5%', color: 'grey', marginTop: 2 }}>Daftar agenda anda hari ini</Caption>
                <LinearGradient 
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}  
                    style={{marginHorizontal: '2.5%', marginTop: 10, marginBottom: 15, borderRadius: 15}} 
                    colors={[COLORS.lightPurple, COLORS.lightCyan]}
                >
                    <Text style={{ marginLeft: '2.5%', color: COLORS.white, marginVertical: 15 }}>Tidak ada agenda hari ini</Text>
                </LinearGradient>
            </View>

            {/* P2B */}
            <View style={{ backgroundColor: COLORS.white, marginTop: 10, marginBottom: 10, marginHorizontal: '3%'}}>
                <Text style={{ marginLeft: '2.5%', fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>P2B</Text>
                <Caption style={{ marginLeft: '2.5%', color: COLORS.Grey, marginTop: 2 }}>Penilaian Performa Bulanan</Caption>
                <LinearGradient 
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}  
                    style={{marginHorizontal: '2.5%', marginTop: 10, marginBottom: 15, borderRadius: 15}} 
                    colors={[COLORS.lightPink, COLORS.lightOrange]}
                >
                    <View style={{flexDirection: 'row'}}>
                    <View style={{ maxWidth: '70%', marginTop: 10 }}>
                        <View style={{marginLeft: '5%', flexDirection: 'row'}}>
                        <Image source={require('../../assets/imgs/menu-icon/p2b-white.png')} style={{ height: 35, width: 35 }} />
                        <Text style={{color: COLORS.white, marginLeft: 10, marginTop: 10}}>P2B</Text>
                        </View>
                        <Text style={{ marginLeft: '5%', color: COLORS.white, marginVertical: 15 }}>Karyawan dapat menambah, mengubah, submit serta melakukan approval P2B.</Text>
                    </View>
                    <View style={{ maxWidth: '25%', alignItems: 'center', justifyContent: 'center', marginLeft: '7.5%' }}>
                        <TouchableOpacity style={{ height: 25, width: 50, borderRadius: 100, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: 'white'}}>
                        <Text style={{color: COLORS.white}}>BUKA</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </LinearGradient>
            </View>
        </View>
    )
}

export default Footer