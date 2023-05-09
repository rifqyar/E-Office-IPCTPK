import React, { useState } from 'react'
import { 
    Image,
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { COLORS, FONTS, SIZES } from '../../constants/theme'
import { MainRouteName } from '../../constants/mainRouteName'
import { FlatList } from 'react-native-gesture-handler'

const ListMenu = (props) => {
    const { navigation } = props

    const [listMenu, setListMenu] = useState([
        {
            id: 1,
            icon: 'calendar-clock-outline',
            color: COLORS.Purple,
            backgroundColor: COLORS.lightPurple,
            route: MainRouteName.ABSENT,
            description: 'Absensi',
            isShow: true
        },{
            id: 2,
            icon: 'calendar-check-outline',
            color: COLORS.Green,
            backgroundColor: COLORS.lightGreen,
            route: '',
            description: 'Cuti / Izin',
            isShow: true
        },{
            id: 3,
            icon: 'wallet-plus-outline',
            color: COLORS.Teal,
            backgroundColor: COLORS.lightTeal,
            route: '',
            description: 'Payslip',
            isShow: true
        },{
            id: 4,
            icon: 'clipboard-search-outline',
            color: COLORS.Red,
            backgroundColor: COLORS.lightRed,
            route: 'hadirkoe',
            description: 'Surveys',
            isShow: true
        },{
            id: 5,
            icon: 'account-question-outline',
            color: COLORS.Indigo,
            backgroundColor: COLORS.lightIndigo,
            route: '',
            description: 'Helpdesk',
            isShow: true
        },{
            id: 6,
            icon: 'account-supervisor-circle-outline',
            color: COLORS.Orange,
            backgroundColor: COLORS.lightRed,
            route: '',
            description: 'HR Contact',
            isShow: true
        },{
            id: 7,
            icon: 'account-search-outline',
            color: COLORS.Cyan,
            backgroundColor: COLORS.lightCyan,
            route: '',
            description: 'Cari Pegawai',
            isShow: true
        },{
            id: 8,
            icon: 'format-list-checks',
            color: COLORS.Purple,
            backgroundColor: COLORS.lightPurple,
            route: '',
            description: 'Approval PR/PO',
            isShow: true
        },{
            id: 9,
            icon: 'airplane',
            color: COLORS.Red,
            backgroundColor: COLORS.lightRed,
            route: '',
            description: 'SPPD',
            isShow: true
        }
    ])

    const  MenuItem = ({item}) => {
        if (item.isShow){
            return (
                <TouchableOpacity
                    style={{
                        marginBottom: SIZES.padding*2,
                        width: '25%',
                        alignItems:'center',
                    }}
                    onPress={() => {
                        if(item.route != 'hadirkoe'){
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
                    {
                        item.icon != 'hadirkoe'
                        ?
                        <Icon 
                        name={item.icon} 
                        size={32} 
                        color={item.color}
                        style={{
                            opacity: 1,
                            position:'absolute',top: 9}}/>
                        :
                        <Image source={require('../../assets/flat-icon/hadirkoe.png')} style={{ height: 32, width: 32,position:'absolute',top: 9 }} />
                    }
                    
                    <Text style={{textAlign:'center', flexWrap:'wrap'}}>
                        {item.description}
                    </Text>
                </TouchableOpacity>
            )
        }
    }

    return (
        <View style={{flex: 1}}>
            <FlatList 
                data={listMenu}
                numColumns={4}
                columnWrapperStyle={{ }}
                keyExtractor={item => `${item.id}`}
                renderItem={item => MenuItem(item)}
                style={{marginTop:SIZES.padding}}
            />
        </View>
    )
}

export default ListMenu

const styles = StyleSheet.create({
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