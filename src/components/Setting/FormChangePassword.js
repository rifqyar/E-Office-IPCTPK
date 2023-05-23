import { DevSettings, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Dialog, HelperText, Portal, Snackbar, TextInput } from 'react-native-paper'
import { COLORS, FONTS, SIZES } from '../../constants/theme'
import { useDispatch, useSelector } from 'react-redux'
import { loading, notLoading } from '../../redux/actions/loadingAction'
import soapCall from '../../helpers/soapCall'
import {
    api_base_url,
    api_user,
    api_pass
} from '../../../app.json'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LOGOUT } from '../../constants/actionTypes'

const FormChangePassword = (props) => {
    const dispatch = useDispatch()
    const isLoading = useSelector((store) => store.loading.loading)
    const {navigation, user} = props
    const [formValue, setFormValue] = useState([])
    const [errors, SetErrors] = useState([])
    const [securePassword, setSecurePassword] = useState(true)
    const [showDialog, setShowDialog] = useState(false)
    const [dialogText, setDialogText] = useState('')
    
    const handleChangePassword = () => {
        let Err = {};
        let next = true;

        ['passLama', 'passBaru', 'confPass']
        .forEach((name) => {
            let value = formValue[name];

            if (value == null || value == "") {
                if (name == 'passLama') Err[name] = `Harap isi password lama anda`;
                if (name == 'passBaru') Err[name] = 'Harap isi password baru anda';
                if (name == 'confPass') Err[name] = 'harap konfirmasi password baru anda';
                
                next = false
            } else if(name == 'confPass'){
                if (value != formValue.passBaru) {
                    Err[name] = 'Password yang anda masukan tidak sesuai dengan password baru anda';
                    next = false
                }
            }
        });
        
        SetErrors(Err)
        if (next) {
            dispatch(loading())
            handlePostData()
        }
    }

    const handlePostData = async () => {
        await soapCall(api_base_url, 'eoffice_update_user', {
            usernameEDI: api_user,
            passwordEDI: api_pass,
            id_user: user.IDUSER,
            password_lama: formValue.passLama,
            password: formValue.passBaru,
            conf_password: formValue.confPass,
            email: '',
            no_hp: ''
        }).then((res) => {
            dispatch(notLoading())
            setShowDialog(true)
            setDialogText(res.rcmsg)
        })
    }

    const logout = () => {
        AsyncStorage.clear()
        dispatch({
            type: LOGOUT,
        })
        DevSettings.reload()
    }
    
    return (
        <KeyboardAvoidingView style={{flex: 1, marginTop: SIZES.padding * 3, marginHorizontal: SIZES.padding3}}  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TextInput
                mode="flat"
                label="Password Lama"
                secureTextEntry={securePassword}
                underlineStyle={{
                    backgroundColor: COLORS.Blue,
                }}
                style={{
                    backgroundColor: COLORS.transparent
                }}
                onChangeText={(text) => setFormValue({...formValue, passLama: text})}
                value={formValue.passLama}
                left={<TextInput.Icon icon="lock" />}
                right={<TextInput.Icon icon={securePassword ? "eye" : "eye-off"} onPress={() => {
                    setSecurePassword(!securePassword)
                }}/>}
                dense
                error={errors.passLama}
            />
            <HelperText type="error" visible={errors.passLama ? true : false }>
                {errors.passLama}
            </HelperText>

            <TextInput
                mode="flat"
                label="Password Baru"
                secureTextEntry
                underlineStyle={{
                    backgroundColor: COLORS.Blue,
                }}
                style={{
                    backgroundColor: COLORS.transparent,
                    marginTop: SIZES.padding
                }}
                onChangeText={(text) => setFormValue({...formValue, passBaru: text})}
                value={formValue.passBaru}
                left={<TextInput.Icon icon="lock-plus" />}
                dense
                error={errors.passBaru}
            />
            <HelperText type="error" visible={errors.passBaru ? true : false }>
                {errors.passBaru}
            </HelperText>

            <TextInput
                mode="flat"
                label="Confirm Password"
                secureTextEntry
                underlineStyle={{
                    backgroundColor: COLORS.Blue,
                }}
                style={{
                    backgroundColor: COLORS.transparent,
                    marginTop: SIZES.padding
                }}
                onChangeText={(text) => setFormValue({...formValue, confPass: text})}
                value={formValue.confPass}
                left={<TextInput.Icon icon="lock-check" />}
                dense
                error={errors.confPass}
            />
            <HelperText type="error" visible={errors.confPass ? true : false }>
                {errors.confPass}
            </HelperText>

            <Button
                mode="elevated"
                dark
                loading={isLoading}
                style={{
                    marginTop:SIZES.padding3,
                    borderRadius: SIZES.largeTitle,
                }}
                contentStyle={{
                }}
                buttonColor={COLORS.accentIndigo}
                onPress={() => handleChangePassword()}
            >
                Rubah Password
            </Button>

            <Portal>
                <Dialog visible={showDialog} onDismiss={() => {
                    setShowDialog(false)
                    setDialogText('')
                }}>
                    <Dialog.Icon size={dialogText == 'SUCCESS' ? 32 : 28} icon={dialogText == 'SUCCESS' ? 'check-circle' : "alert"} />
                    <Dialog.Title style={{textAlign: 'center', ...FONTS.h5}}>
                        {
                            dialogText != 'SUCCESS' 
                            ? 
                                `Gagal Merubah Data, ${dialogText} `
                            :
                                'Berhasil merubah password anda'
                        }
                    </Dialog.Title>
                    {
                        dialogText == 'SUCCESS'
                        ?
                            <>
                                <Dialog.Content>
                                    <Text variant="bodyMedium">Apakah anda ingin Logout?</Text>
                                </Dialog.Content>
                                <Dialog.Actions>
                                    <Button onPress={() => {
                                        setShowDialog(false)
                                        setDialogText('')
                                    }}>Tidak</Button>
                                    <Button onPress={logout}>OK</Button>
                                </Dialog.Actions>
                            </>
                            
                        :
                            <></>
                    }
                </Dialog>
            </Portal>
        </KeyboardAvoidingView>
    )
}

export default FormChangePassword

const styles = StyleSheet.create({})