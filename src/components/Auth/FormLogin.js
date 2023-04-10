import React, { Component, useState } from 'react'
import { 
    View,
    TouchableOpacity,
    Alert,
    StyleSheet
} from 'react-native'

import {
    Button,
    TextInput,
    HelperText,
    Text,
    Surface,
    Card,
} from 'react-native-paper'

import { COLORS, SIZES } from '../../constants/theme'
import {
    api_base_url,
    api_user,
    api_pass
} from '../../../app.json'
import { Switch } from 'react-native-gesture-handler'
import LoadingScreen from '../LoadingScreen'
import { MainRouteName } from '../../constants/mainRouteName'
import { useDispatch } from 'react-redux'
import { loading } from '../../redux/actions/loadingAction'
// import axios from 'axios'
// import AsyncStorage from '@react-native-async-storage/async-storage'

const FormLogin = (props) => {
    const dispatch = useDispatch()
    const [formValue, setFormValue] = useState([])
    const [errors, SetErrors] = useState([])
    const [securePassword, setSecurePassword] = useState(true)
    const [isSwitchOn, setSwitch] = useState(false)

    handleLoginButton = () => {
        let Err = {};
        let next = true;

        ['nipp', 'password']
        .forEach((name) => {
            let value = formValue[name];

            if (value == null || value == "") {
                Err[name] = `Kolom ${name} Tidak boleh kosong`;
                next = false;
            }
        });
        
        SetErrors(Err)
        if (next) {
            handlePostData()
        }
    }

    handlePostData = () => {
        dispatch(loading())
        // props.navigation.push(MainRouteName.HOME)
    }

    return (
        <View style={{marginTop: 15, marginHorizontal: '10%'}}>
            <TextInput
                label="NIPP"
                onChangeText={(text) => setFormValue({...formValue, nipp: text})}
                placeholder="Masukan Nipp Anda"
                style={styles.textInput}
                underlineStyle={{
                    backgroundColor: COLORS.transparent
                }}
                textColor={COLORS.black}
                placeholderTextColor={COLORS.Grey}
                value={formValue.nipp}
                onFocus={this.onFocus}
                error={errors.nipp}
                dense
                left={<TextInput.Icon icon="account" />}
            />
            <HelperText type="error" visible={errors.nipp ? true : false }>
                {errors.nipp}
            </HelperText>
                
            <TextInput
                label="Password"
                placeholder="*******"
                style={styles.textInput}
                underlineStyle={{
                    backgroundColor: COLORS.transparent
                }}
                textColor={COLORS.black}
                placeholderTextColor={COLORS.Grey}
                secureTextEntry={securePassword}
                value={formValue.password}
                onChangeText={(text) => setFormValue({...formValue, password: text})}
                onFocus={this.onFocus}
                error={errors.password}
                dense
                left={<TextInput.Icon icon="lock" />}

            />
            <HelperText type="error" visible={errors.password ? true : false }>
                {errors.password}
            </HelperText>

            <Card style={styles.verificationCard}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                    <View style={{width: '70%'}}>
                        <Text>Swipe to right to confirm you are not robot</Text>
                    </View>
                    <View style={{width: '30%'}}>
                        <Switch value={isSwitchOn} onValueChange={() => setSwitch(!isSwitchOn)} />
                    </View>
                </View>
            </Card>

            <Button
                mode="elevated"
                dark
                style={{
                    marginTop:SIZES.padding3 * 2,
                    borderRadius: SIZES.largeTitle,
                }}
                contentStyle={{
                }}
                buttonColor={COLORS.accentIndigo}
                disabled={isSwitchOn ? false : true}
                onPress={() => handleLoginButton()}
            >
                Login
            </Button>
            
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        borderRadius: 30,
        borderTopEndRadius: 30, 
        borderTopStartRadius: 30, 
    },
    verificationCard: {
        fontSize: 14,
        marginTop: 10,
        padding: SIZES.padding3,
        backgroundColor: COLORS.white
    },
    loginButton: {
      fontSize: 14,
      height: 40,
      paddingVertical: 2,
      paddingHorizontal: 2,
      marginVertical: 25,
      borderRadius: 30,
      borderTopEndRadius: 30,
      borderTopStartRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(11, 2, 250, 0.5)',
    }
  })

export default FormLogin