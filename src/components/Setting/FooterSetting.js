import React from 'react'
import { 
    Alert,
    DevSettings,
    StyleSheet, 
    TouchableOpacity, 
    View 
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import DeviceInfo from 'react-native-device-info';

import { 
    Caption,
    Text, 
} from 'react-native-paper'
import { COLORS, SIZES } from '../../constants/theme'
import { MainRouteName } from '../../constants/mainRouteName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGOUT } from '../../constants/actionTypes';
import { useDispatch } from 'react-redux';

const FooterSetting = (props) => {
    const {user, navigation} = props
    const dispatch = useDispatch()

    const handleLogout = () => {
        Alert.alert("Hold on!", "Are you sure you want to Logout?", [
            {
            text: "Cancel",
            onPress: () => {
                return true;
            },
            style: "cancel"
            },
            { 
                text: "YES", onPress: () => {
                    DevSettings.reload()
                    AsyncStorage.clear()
                    dispatch({
                        type: LOGOUT,
                    })
                }
            }
        ]);
    }
    return(
        <>
            <View style={{flex: 1, marginHorizontal: SIZES.padding * 3, justifyContent: 'center', alignItems: 'center', marginTop: SIZES.padding5 * 3}}>
                <TouchableOpacity
                    style={[styles.buttonBottom, {
                        backgroundColor: COLORS.darkYellow,
                    }]}
                    onPress={() => {
                        navigation.push(MainRouteName.CHANGEPASSWORD, {
                            user: user
                        })
                    }}
                >
                    <Icon name={'lock'} size={24} color={COLORS.white} style={{marginRight: SIZES.padding}} />
                    <Text style={{color: COLORS.white}}>Rubah Password</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={[styles.buttonBottom, {
                        backgroundColor: COLORS.Blue,
                    }]}
                    onPress={() => {
                        navigation.push(MainRouteName.EDITPROFILE, {
                            user: user
                        })
                    }}
                >
                    <Icon name={'edit'} size={24} color={COLORS.white} style={{marginRight: SIZES.padding}} />
                    <Text style={{color: COLORS.white}}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.buttonBottom, {
                        backgroundColor: COLORS.Red,
                    }]}
                    onPress={() => handleLogout()}
                >
                    <Icon name={'logout'} size={24} color={COLORS.white} style={{marginRight: SIZES.padding}} />
                    <Text style={{color: COLORS.white}}>Logout</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: SIZES.padding2 * 3, flex: 1, justifyContent: 'center', alignItems:'center'}}>
                <Caption>
                    Version {DeviceInfo.getVersion()}
                </Caption>
            </View>
        </>
    )
}

export default FooterSetting

const styles = StyleSheet.create({
    buttonBottom: {
        marginTop: SIZES.padding,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        paddingVertical: SIZES.padding4,
        borderRadius: 25,
    }
})