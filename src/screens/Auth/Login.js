import React, { useEffect } from 'react'
import { View, Image, ImageBackground, StyleSheet, KeyboardAvoidingView, Platform, StatusBar, Animated } from 'react-native';
import { Text, Caption } from 'react-native-paper';
import FormLogin from '../../components/Auth/FormLogin';
import { COLORS, SIZES } from '../../constants/theme';
import { useSelector } from 'react-redux';
import LoadingScreen from '../../components/LoadingScreen';
import { LoginAnimation } from '../../constants/Animation/LoginAnimation';
import StatusBarIOS from '../../constants/StatusBarIOS';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Login = ({ navigation }) => {
  const loading = useSelector((store) => store.loading.loading)
  const {...Animation} = LoginAnimation()

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
      <ImageBackground source={require('../../assets/imgs/login-bg.png')} style={{ height: '100%' }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{flex: 1}}>
          <View style={{flex:1, justifyContent: 'center' }}>
            
            <Animated.Image source={require('../../assets/imgs/ipc-tpk-logo-no-white.png')} style={{
              width: '45%',
              resizeMode: 'contain',
              alignItems: 'center',
              alignSelf: 'center',
              opacity: Animation.opacityLogo,
              transform: [
                {translateX: Animation.moveTitle.x},
                {translateY: Animation.moveTitle.y},
                // {scale: Animation.scaleText}
              ]
            }} />

            <Animated.View style={{opacity:Animation.contentTransition,transform: [
                {translateX: Animation.moveForm.x},
                {translateY: Animation.moveForm.y},
              ]}}>
              <Text style={{ marginTop: -240, fontSize: SIZES.body2, fontWeight: 'bold', textAlign: 'center' }}>E-Office IPCTPK</Text>
              <Caption style={{ fontSize: SIZES.body4, textAlign: 'center' }}>Masukan NIPP dan password anda</Caption >
              <FormLogin navigation={navigation}/>
            </Animated.View>

          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
      {
        loading ? 
          <LoadingScreen />
        :
          <View />
      }
    </SafeAreaProvider>
  )
}
export default Login

const styles = StyleSheet.create({
  imagePelindoLogo: {
    
  },
})