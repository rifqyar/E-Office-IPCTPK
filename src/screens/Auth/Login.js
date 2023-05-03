import React, { useEffect } from 'react'
import { View, Image, ImageBackground, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { Text, Caption } from 'react-native-paper';
import FormLogin from '../../components/Auth/FormLogin';
import { SIZES } from '../../constants/theme';
import { useSelector } from 'react-redux';
import LoadingScreen from '../../components/LoadingScreen';

const Login = ({ navigation }) => {
  const loading = useSelector((store) => store.loading.loading)

  useEffect(() => {
    StatusBar.setTranslucent(false)
    StatusBar.setBackgroundColor('#fff'); 
    StatusBar.setBarStyle('dark-content')

    return () => {
    }
  })

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={require('../../assets/imgs/login-bg.png')} style={{ height: '100%' }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{flex: 1}}>
          <View style={{flex:1, justifyContent: 'center' }}>
            <Image source={require('../../assets/imgs/ipc-tpk-logo-no-white.png')} style={styles.imagePelindoLogo} />
            <Text style={{ marginTop: -240, fontSize: SIZES.body2, fontWeight: 'bold', textAlign: 'center' }}>E-Office IPCTPK</Text>
            <Caption style={{ fontSize: SIZES.body4, textAlign: 'center' }}>Masukan NIPP dan password anda</Caption >

            <FormLogin navigation={navigation}/>

          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
      {
        loading ? 
          <LoadingScreen />
        :
          <View />
      }
    </SafeAreaView>
  )
}
export default Login

const styles = StyleSheet.create({
  imagePelindoLogo: {
    width: '45%',
    resizeMode: 'contain',
    marginTop: -240,
    alignItems: 'center',
    alignSelf: 'center'
  },
})