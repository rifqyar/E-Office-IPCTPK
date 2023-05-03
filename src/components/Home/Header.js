import React from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Image
} from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';
import { MainRouteName } from '../../constants/mainRouteName';

const Header = (props) => {
    const { navigation } = props
    console.log(navigation)

    return (
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