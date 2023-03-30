import React from 'react'
import { View, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CardMenuButton = ({ title, bgColor, imgSrc }) => {
  return (
    <View style={{ alignItems: 'center', marginHorizontal: '5%' }}>
      <View style={{ backgroundColor: bgColor, height: 55, width: 55, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={imgSrc} style={{ height: 40, width: 40 }} />
      </View>
      <Text>{title}</Text>
    </View>
  )
}

const SmallMenuButton = ({ title, imgSrc }) => {
  return (
    <View style={{ alignItems: 'center', marginHorizontal: '5%', maxWidth: '17.5%' }}>
      <View style={{ backgroundColor: 'white', height: 52.5, width: 52.5, borderRadius: 100, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5 }}>
        <Image source={imgSrc} style={{ height: 35, width: 35 }} />
      </View>
      <Text style={{ fontSize: 13, textAlign: 'center' }}>{title}</Text>
    </View>
  )
}

const Home = () => {
  return (
    <View>
      <View style={{ flexDirection: 'row', backgroundColor: '#006ba2' }}>
        <View style={{ flexDirection: 'row', width: '50%', marginVertical: 10 }}>
          <Image source={require('../../assets/imgs/ipc-tpk-logo-new.png')} style={{ height: 27, width: 89, marginTop: 10, marginLeft: '2.5%' }} />
          <Text style={{ color: 'white', marginTop: 7.5, marginLeft: 7.5, fontSize: 20 }}>E-Office</Text>
        </View>
        <View style={{ flexDirection: 'row-reverse', width: '50%', marginTop: 17.5 }}>
          <TouchableOpacity>
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
      <ScrollView>
        <View style={{ backgroundColor: 'white' }}>
          <ImageBackground source={require('../../assets/imgs/header-bg-2.png')}>
            <View style={{ marginLeft: '2.5%' }}>
              <Text style={{ color: 'white', marginTop: 10, fontSize: 16 }}>Welcome,</Text>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>user</Text>
            </View>
            <Card style={{ marginTop: 20, marginHorizontal: '2.5%', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <CardMenuButton
                  title={'Surat Masuk'} bgColor={'#FF4D00'}
                  imgSrc={require('../../assets/imgs/menu-icon/inbox-white.png')}
                />
                <CardMenuButton
                  title={'Surat Keluar'} bgColor={'#fcce03'}
                  imgSrc={require('../../assets/imgs/menu-icon/outbox-white.png')}
                />
                <CardMenuButton
                  title={'HadirKoe'} bgColor={'#e0e0de'}
                  imgSrc={require('../../assets/flat-icon/hadirkoe.png')}
                />
              </View>
            </Card>
          </ImageBackground>
          <View style={{ alignItems: 'center', marginBottom: 15 }}>
            <View style={{ marginTop: 25, flexDirection: 'row', marginHorizontal: '2.5%' }}>
              <SmallMenuButton
                title={'Absensi'}
                imgSrc={require('../../assets/imgs/menu-icon/absensi.png')}
              />
              <SmallMenuButton
                title={'Cuti/Izin'}
                imgSrc={require('../../assets/imgs/menu-icon/cuti.png')}
              />
              <SmallMenuButton
                title={'Payslip'}
                imgSrc={require('../../assets/imgs/menu-icon/save-money1.png')}
              />
              <SmallMenuButton
                title={'Survey'}
                imgSrc={require('../../assets/imgs/menu-icon/survey.png')}
              />
            </View>
            <View style={{ marginTop: 25, flexDirection: 'row', marginHorizontal: '2.5%' }}>
              <SmallMenuButton
                title={'Helpdesk'}
                imgSrc={require('../../assets/imgs/menu-icon/helpdesk.png')}
              />
              <SmallMenuButton
                title={'HR Contact'}
                imgSrc={require('../../assets/imgs/menu-icon/hrcontact.png')}
              />
              <SmallMenuButton
                title={'Cari Pegawai'}
                imgSrc={require('../../assets/imgs/menu-icon/search.png')}
              />
              <SmallMenuButton
                title={'Approval PR/PO'}
                imgSrc={require('../../assets/imgs/menu-icon/approval-prpo.png')}
              />
            </View>
            <View style={{ marginTop: 25, flexDirection: 'row', marginHorizontal: '2.5%', alignItems: 'flex-start', minWidth: '92.5%' }}>
              <SmallMenuButton
                title={'SPPD'}
                imgSrc={require('../../assets/imgs/menu-icon/sppd-2.png')}
              />
            </View>
          </View>
        </View>

        {/* Agenda */}
        <View style={{ backgroundColor: 'white', marginTop: 10 }}>
          <Text style={{ marginLeft: '2.5%', fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>Agenda</Text>
          <Text style={{ marginLeft: '2.5%', color: 'grey', marginTop: 5 }}>Daftar agenda anda hari ini</Text>
          <Card style={{ marginHorizontal: '2.5%', backgroundColor: '#0fc7fa', marginTop: 10, marginBottom: 15 }}>
            <Text style={{ marginLeft: '2.5%', color: 'white', marginVertical: 15 }}>Tidak ada agenda hari ini</Text>
          </Card>
        </View>

        {/* P2B */}
        <View style={{ backgroundColor: 'white', marginTop: 10, marginBottom: 60 }}>
          <Text style={{ marginLeft: '2.5%', fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>P2B</Text>
          <Text style={{ marginLeft: '2.5%', color: 'grey', marginTop: 5 }}>Penilaian Performa Bulanan</Text>
          <Card style={{ marginHorizontal: '2.5%', backgroundColor: '#fc6b03', marginTop: 10, marginBottom: 15 }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{ maxWidth: '70%', marginTop: 10 }}>
                <View style={{marginLeft: '5%', flexDirection: 'row'}}>
                  <Image source={require('../../assets/imgs/menu-icon/p2b-white.png')} style={{ height: 35, width: 35 }} />
                  <Text style={{color: 'white', marginLeft: 10, marginTop: 10}}>P2B</Text>
                </View>
                <Text style={{ marginLeft: '2.5%', color: 'white', marginVertical: 15 }}>Karyawan dapat menambah, mengubah, submit serta melakukan approval P2B.</Text>
              </View>
              <View style={{ maxWidth: '25%', alignItems: 'center', justifyContent: 'center', marginLeft: '7.5%' }}>
                <TouchableOpacity style={{ height: 25, width: 50, borderRadius: 100, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: 'white'}}>
                  <Text style={{color: 'white'}}>BUKA</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  )
}

export default Home