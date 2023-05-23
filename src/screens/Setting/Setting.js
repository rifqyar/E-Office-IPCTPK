import React from 'react'
import { 
    Appearance,
    FlatList, 
    Pressable, 
    StyleSheet, 
    View, 
    useWindowDimensions,
    Image
} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES } from '../../constants/theme'
import { useDispatch, useSelector } from 'react-redux'
import { FooterSetting, Header, Profile } from '../../components/Setting/Index'
import { Modal, Portal, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { hideModal } from '../../redux/actions/modalAction'

const Setting = (props) => {
    const { navigation } = props
    const {width, height} = useWindowDimensions()
    const isLandscape = width > height ? true : false
    const user = useSelector(state => state.userReducer.user?.user);
    const colorScheme = Appearance.getColorScheme();
    const modalShow = useSelector(state => state.modal.show)
    const dispatch = useDispatch()

    return (
        <SafeAreaProvider style={{flex: 1, backgroundColor: colorScheme == 'light' ? COLORS.white : COLORS.black}}>
            {
                !isLandscape
                ?
                    <>
                        <View style={{flex: 0.4}}>
                            <Header navigation={navigation} isLandscape={isLandscape} />
                        </View>
                        <View style={{flex: 1.1}}>
                            <FlatList 
                                data={[0,1]}
                                showsVerticalScrollIndicator={false}
                                ListHeaderComponent={<Profile user={user} />}
                                ListFooterComponent={<FooterSetting user={user} navigation={navigation} />}
                            />
                        </View>
                    </>
                :   
                    <FlatList 
                        data={[0,1]}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={() => {
                            return (
                                <>
                                    <Header navigation={navigation} isLandscape={isLandscape} />
                                    <Profile user={user} />
                                </>
                            )
                        }}
                        ListFooterComponent={ <FooterSetting user={user} navigation={navigation} />}
                    />
            }

            <Portal>
                <Modal 
                    visible={modalShow}
                    dismissableBackButton={true}
                    contentContainerStyle={{
                        flex: 1,
                        backgroundColor: COLORS.transparent, 
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Icon 
                        name={'close-circle'} 
                        size={42} 
                        color={COLORS.white} 
                        style={{position: 'absolute', top: 15, right: 15}}
                        onPress={() => {
                            dispatch(hideModal())
                        }}
                    />

                    <Image source={{uri: user.FOTO}} resizeMode="contain" style={{
                        width: SIZES.width / 1.5,
                        height: SIZES.width,
                        borderRadius: 25,
                    }} />
                </Modal>
            </Portal>

        </SafeAreaProvider>
    )
}

export default Setting

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
})