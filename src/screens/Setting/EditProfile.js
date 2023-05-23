import React from 'react'
import { ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../constants/theme'
import { Surface, Title, Text } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'
import LoadingScreen from '../../components/LoadingScreen'
import { FormChangeProfile } from '../../components/Setting/Index'

const background = require('../../assets/imgs/login-bg.png')
const EditProfile = (props) => {
    const user = props.route.params.user
    const {navigation} = props
    const loading = useSelector((store) => store.loading.loading)

    return (
        <ImageBackground source={background} style={{flex:1}}>
            <LinearGradient colors={[COLORS.transparent, 'rgba(0,0,0,0.7)']} style={{flex: 1}}>
                <View style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Title style={{...FONTS.h3, fontWeight: 700,textAlign: 'center', marginBottom: SIZES.padding*3}}>Form Edit Profile</Title>
                    <Surface style={styles.formContainer} elevation={4}>
                        <FormChangeProfile navigation={navigation} user={user} />
                    </Surface>
                </View>

                {
                    loading ? <LoadingScreen child={<Text style={{marginTop: SIZES.padding * 2}}> Merubah Data </Text>} /> : <View />
                }
            </LinearGradient>
        </ImageBackground>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        marginHorizontal: SIZES.padding * 2,
        flex: 0.4,
        width: '80%',
        borderRadius: 25
    }
})