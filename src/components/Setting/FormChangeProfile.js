import { Alert, DevSettings, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import { SET_USER } from '../../constants/actionTypes'

const FormChangeProfile = (props) => {
    const dispatch = useDispatch()
    const isLoading = useSelector((store) => store.loading.loading)
    const {navigation, user} = props
    const [formValue, setFormValue] = useState([])
    const [showDialog, setShowDialog] = useState(false)
    const [dialogText, setDialogText] = useState('')

    useEffect(() => {
        dispatch(notLoading())
        setFormValue({email: user.EMAIL, hp: user.HP})
    }, [])
    
    const handlePostData = async () => {
        dispatch(loading())
        if (formValue.email != '' && formValue.hp != ''){
            updateEmail((res) => {
                updateHp((res) => {
                    dispatch(notLoading())
                    setShowDialog(true)
                    setDialogText(res.rcmsg)
                })
            })
        } else if (formValue.email != '' && formValue.hp == ''){
            updateEmail((res) => {
                dispatch(notLoading())
                setShowDialog(true)
                setDialogText(res.rcmsg)
            })
        } else if (formValue.hp != '' && formValue.email == ''){
            updateHp((res) => {
                dispatch(notLoading())
                setShowDialog(true)
                setDialogText(res.rcmsg)
            })
        }
    }

    const updateEmail = async (callback) => {
        await soapCall(api_base_url, 'eoffice_update_user', {
            usernameEDI: api_user,
            passwordEDI: api_pass,
            id_user: user.IDUSER,
            password_lama: '',
            password: '',
            conf_password: '',
            email: formValue.email,
            no_hp: ''
        }).then((res) => {
            if (res.rcmsg == 'SUCCESS'){
                callback(res)
            }
        })
    }

    const updateHp = async (callback) => {
        await soapCall(api_base_url, 'eoffice_update_user', {
            usernameEDI: api_user,
            passwordEDI: api_pass,
            id_user: user.IDUSER,
            password_lama: '',
            password: '',
            conf_password: '',
            email: '',
            no_hp: formValue.hp
        }).then((res) => {
            if (res.rcmsg == 'SUCCESS'){
                callback(res)
            }
        })
    }

    const updateDataUser = async () => {
        await soapCall(`${api_base_url}`, 'eoffice_get_user_data', {
            usernameEDI: api_user,
            passwordEDI: api_pass,
            username: user.NIPP
        }).then((res) => {
            AsyncStorage.clear()
            
            dispatch({
                type: SET_USER,
                payload: {user: res.data, isLoggedIn: true}
            });

            AsyncStorage.setItem('user', JSON.stringify(res.data))

            navigation.goBack()
        })
    }
    
    return (
        <KeyboardAvoidingView style={{flex: 1, marginTop: SIZES.padding * 3, marginHorizontal: SIZES.padding3}}  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TextInput
                mode="flat"
                label="Email"
                underlineStyle={{
                    backgroundColor: COLORS.Blue,
                }}
                style={{
                    backgroundColor: COLORS.transparent
                }}
                onChangeText={(text) => setFormValue({...formValue, email: text})}
                value={formValue.email}
                inputMode='email'
                left={<TextInput.Icon icon="email" />}
                dense
            />

            <TextInput
                mode="flat"
                label="Nomor Telepon"
                secureTextEntry
                underlineStyle={{
                    backgroundColor: COLORS.Blue,
                }}
                style={{
                    backgroundColor: COLORS.transparent,
                    marginTop: SIZES.padding
                }}
                onChangeText={(text) => setFormValue({...formValue, hp: text})}
                value={formValue.hp}
                inputMode='tel'
                left={<TextInput.Icon icon="phone" />}
                dense
            />

            <Button
                mode="elevated"
                dark
                loading={isLoading}
                style={{
                    marginTop:SIZES.padding3 * 3,
                    borderRadius: SIZES.largeTitle,
                }}
                contentStyle={{
                }}
                buttonColor={COLORS.accentIndigo}
                onPress={() => {
                    Alert.alert("", "Apakah anda yakin ingin merubah data?", [
                        {
                            text: "Cancel",
                            onPress: () => {
                                return true;
                            },
                            style: "cancel"
                        },
                        { text: "YES", onPress: () => handlePostData() }
                    ]);
                }}
            >
                Rubah Profile
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
                                'Berhasil merubah profile anda'
                        }
                    </Dialog.Title>
                    {
                        dialogText == 'SUCCESS'
                        ?
                            <>
                                <Dialog.Actions>
                                    <Button onPress={updateDataUser}>OK</Button>
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

export default FormChangeProfile

const styles = StyleSheet.create({})