import React from 'react'
import { View, ScrollView, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, TextInput, Card, Switch } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { MainRouteName } from '../../constants/mainRouteName';

const Login = ({ navigation }) => {
  return (
    <View>
      <ImageBackground source={require('../../assets/imgs/login-bg.png')} style={{ height: '100%' }}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../../assets/imgs/ipc-tpk-logo-no-white.png')} style={styles.imagePelindoLogo} />
          <Text style={{ marginTop: -240, fontSize: 21, fontWeight: 'bold' }}>E-Office IPCTPK</Text>
          <Text style={{ fontSize: 18, color: 'grey' }}>Masukan NIPP dan password anda</Text>
          <TextInput
            style={styles.textInput}
            underlineColor='white'
            placeholder='Username'
            
          />
          <TextInput
            style={styles.textInput}
            underlineColor='white'
            placeholder='Password'
          />
          <Card style={styles.verificationCard}>
            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              <View style={{ marginLeft: '5%', maxWidth: '70%' }}>
                <Text>Swipe to right to confirm you are not robot</Text>
              </View>
              <View style={{ marginLeft: '5%', maxWidth: '20%' }}>
                <Switch />
              </View>
            </View>
          </Card>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={{fontWeight: 'bold'}}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  imagePelindoLogo: {
    width: '45%',
    resizeMode: 'contain',
    marginTop: -210
  },
  textInput: {
    width: '75%',
    fontSize: 14,
    // borderWidth: 1,
    height: 40,
    paddingVertical: 2,
    paddingHorizontal: 2,
    marginVertical: 5,
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    textAlign:'center'
  },
  verificationCard: {
    width: '75%',
    fontSize: 14,
    borderWidth: 0.3,
    marginTop: 10
  },
  loginButton: {
    width: '70%',
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