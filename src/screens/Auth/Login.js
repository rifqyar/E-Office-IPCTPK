import React, { useEffect } from 'react'
import { View, Image, ImageBackground, StyleSheet, KeyboardAvoidingView, Platform, StatusBar, Animated, ScrollView, useWindowDimensions } from 'react-native';
import { Text, Caption, Title } from 'react-native-paper';
import FormLogin from '../../components/Auth/FormLogin';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../../components/LoadingScreen';
import { LoginAnimation } from '../../constants/Animation/LoginAnimation';
import StatusBarIOS from '../../constants/StatusBarIOS';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Login = (props) => {
  const loading = useSelector((store) => store.loading.loading)
  const {...Animation} = LoginAnimation()
  const {navigation, route} = props
  
  useEffect(() => {
    if(Platform.OS == 'android'){
      StatusBar.setTranslucent(false)
      StatusBar.setBackgroundColor('#fff'); 
      StatusBar.setBarStyle('dark-content')
    }
    
    return () => {
    }
  })

  return (
    <SafeAreaProvider style={{flex: 1}}>
      {Platform.OS == 'ios' ? <StatusBarIOS backgroundColor={COLORS.white} /> : <></>}
      <ImageBackground source={require('../../assets/imgs/login-bg.png')} style={{ 
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <Animated.View style={{
            height: SIZES.width/2,
            opacity: Animation.opacityLogo,
            transform: [
              {translateX: Animation.moveTitle.x},
              {translateY: Animation.moveTitle.y},
            ]
          }}>
            <Image source={require('../../assets/imgs/ipc-tpk-logo-no-white.png')} style={{
              width:SIZES.width/2,
              height: SIZES.width/2,
              resizeMode: 'contain',
              alignSelf: 'center',
            }} />
          </Animated.View>

          <Animated.View style={{
            opacity:Animation.contentTransition,
            transform: [
              {translateX: Animation.moveForm.x},
              {translateY: Animation.moveForm.y},
            ]
          }}>
            <Text style={{
              ...FONTS.h4,
              textAlign: 'center'
            }}>
              E-Office IPCTPK
            </Text>
            <Caption style={{
              ...FONTS.body5,
              textAlign: 'center'
            }}>
              Masukan NIPP dan Password Anda
            </Caption>
            <FormLogin navigation={navigation}/>
          </Animated.View>
        </KeyboardAvoidingView>
      </ImageBackground>
      {
        loading ? 
          <LoadingScreen />
        :
          <></>
      }
    </SafeAreaProvider>
  )
}
export default Login

const styles = StyleSheet.create({
  imagePelindoLogo: {
    
  },
})