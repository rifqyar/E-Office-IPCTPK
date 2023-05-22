import React from 'react'
import { 
    View, 
    Text, 
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { 
    Badge,
    Caption, Subheading, Surface
} from 'react-native-paper'
import { COLORS, FONTS, SIZES } from '../../constants/theme'
import { List } from 'react-content-loader/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { DarkTheme } from '@react-navigation/native'

const Footer = (props) => {
    const {navigation, agendaList, badgeP2B} = props

    // DUMMY
    const dummyAgenda = [
        {
            Tanggal_Mulai : '2023-05-15',
            Start_Time : '12:00',
            End_Time : '12:00',
            Nama_Tempat : 'Kantor',
            Acara : 'Meeting'
        },{
            Tanggal_Mulai : '2023-05-15',
            Start_Time : '12:00',
            End_Time : '12:00',
            Nama_Tempat : 'Kantor',
            Acara : 'Meeting'
        },{
            Tanggal_Mulai : '2023-05-15',
            Start_Time : '12:00',
            End_Time : '12:00',
            Nama_Tempat : 'Kantor',
            Acara : 'Meeting'
        },{
            Tanggal_Mulai : '2023-05-15',
            Start_Time : '12:00',
            End_Time : '12:00',
            Nama_Tempat : 'Kantor',
            Acara : 'Meeting'
        }
    ]

    const ListLoader = () => (
        <List
            speed={1}
            backgroundColor={COLORS.lightGrey}
            foregroundColor={COLORS.Grey}
            style={{margin: '4%'}}
        />
    ) 

    const listAgenda = ({item}) => {
        return (
            <Surface style={{flex: 1, marginBottom: SIZES.padding * 2, borderRadius: 20, padding:SIZES.padding}} >
                <View style={{flexDirection: 'row', alignItems:'center', width:'70%', marginBottom: SIZES.padding/2 }}>
                    <Icon  name={'calendar-clock-outline'} size={SIZES.body2} color={COLORS.darkOrange} style={{marginRight: SIZES.padding*2}} />
                    <Caption style={{ fontWeight:'bold' }}>
                        {item.Tanggal_Mulai} ({item.Start_Time} - {item.End_Time})
                    </Caption>
                </View>
                <View style={{flexDirection: 'row', alignItems:'center', width:'70%' }}>
                    <MaterialIcon  name={'location-pin'} size={SIZES.body2} color={COLORS.darkOrange} style={{marginRight: SIZES.padding*2}} />
                    <Caption style={{ fontWeight:'bold' }}>
                        {item.Nama_Tempat}
                    </Caption>
                </View>
                
                <View style={{height: 1, backgroundColor: COLORS.Grey, marginVertical: SIZES.padding*1}} />

                <View style={{flexDirection: 'row', alignItems:'center', width:'70%' }}>
                    <Icon name={'clipboard-check-outline'} size={SIZES.body2} color={COLORS.darkOrange} style={{marginRight: SIZES.padding*2}} />
                    <Subheading>
                        {item.Acara}
                    </Subheading>
                </View>
            </Surface>
        )
    }

    return (
        <View>
            {/* Agenda */}
            {
                agendaList != null
                ?
                    <View style={{ backgroundColor: DarkTheme.dark != true ? COLORS.white : COLORS.black, marginTop: 10, marginHorizontal: '3%' }}>
                        <Text style={{ marginLeft: '2.5%', fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>Agenda</Text>
                        <Caption style={{ marginLeft: '2.5%', color: 'grey', marginTop: 2 }}>Daftar agenda anda hari ini</Caption>
                        <LinearGradient 
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}  
                            style={{marginHorizontal: '2.5%', marginTop: 10, marginBottom: 15, borderRadius: 15}} 
                            colors={[COLORS.lightPurple, COLORS.lightCyan]}
                        >
                            {
                                agendaList.length > 0
                                ?
                                    <FlatList 
                                        data={agendaList} 
                                        renderItem={(item) => listAgenda(item)}
                                        style={{padding: SIZES.padding*2}}
                                        showsVerticalScrollIndicator={false}
                                    />
                                :
                                    <Text style={{ marginLeft: '2.5%', color: COLORS.white, marginVertical: 15 }}>Tidak ada agenda hari ini</Text>
                            }
                        </LinearGradient>
                    </View>
                :
                    <View style={{ backgroundColor: COLORS.white, marginTop: 10, marginHorizontal: '3%' }}>
                        <Text style={{ marginLeft: '2.5%', fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>Agenda</Text>
                        <Caption style={{ marginLeft: '2.5%', color: 'grey', marginTop: 2 }}>Daftar agenda anda hari ini</Caption>
                        <LinearGradient 
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}  
                            style={{marginHorizontal: '2.5%', marginTop: 10, marginBottom: 15, borderRadius: 15}} 
                            colors={[COLORS.lightPurple, COLORS.lightCyan]}
                        >
                            <ListLoader />   
                        </LinearGradient>
                    </View>
            }

            {/* P2B */}
            <View style={{ backgroundColor: DarkTheme.dark != true ? COLORS.white : COLORS.black, marginTop: 10, marginBottom: 10, marginHorizontal: '3%'}}>
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
                        {/* <Image source={require('../assets/imgs/menu-icon/p2b-white.png')} style={{ height: 35, width: 35 }} /> */}
                        <Image source={require('../../assets/imgs/menu-icon/p2b-white.png')} style={{ height: 35, width: 35 }} />
                        <Text style={{color: COLORS.white, marginLeft: 10, marginTop: 10}}>P2B</Text>
                        </View>
                        <Text style={{ marginLeft: '5%', color: COLORS.white, marginVertical: 15 }}>Karyawan dapat menambah, mengubah, submit serta melakukan approval P2B.</Text>
                    </View>
                    <View style={{ maxWidth: '25%', alignItems: 'center', justifyContent: 'center', marginLeft: '7.5%' }}>
                        <TouchableOpacity style={{ height: 25, width: 50, borderRadius: 100, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: 'white'}}>
                            <Text style={{color: COLORS.white}}>BUKA</Text>
                        </TouchableOpacity>

                        {
                            badgeP2B != null 
                            ?
                                badgeP2B.JUMLAH_RENCANA_P2B_BAWAHAN > 0
                                ?
                                    <Badge style={{position:'absolute', top: '32%', right:-10}}> {badgeP2B.JUMLAH_RENCANA_P2B_BAWAHAN} </Badge>
                                :
                                    <></>
                            :
                            <></>
                        }
                    </View>
                    </View>
                </LinearGradient>
            </View>
        </View>
    )
}

export default Footer