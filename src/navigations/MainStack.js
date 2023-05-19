import React, { useEffect, useRef } from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { ArrowLeft2, SearchNormal1 } from 'iconsax-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { MainRouteName } from '../constants/mainRouteName';
import { COLORS } from '../constants/theme';

import Home from '../screens/Home/Home';
import Inbox from '../screens/Inbox/Inbox';
import Outbox from '../screens/Outbox/Outbox';
import Login from '../screens/Auth/Login';
import AbsentList from '../screens/Absensi/AbsentList';
import AbsentDetail from '../screens/Absensi/AbsentDetail';
import CutiList from '../screens/Cuti/CutiList';
import SppdList from '../screens/Sppd/SppdList';
import SearchPegawai from '../screens/Pegawai/SearchPegawai';
import InboxDetail from '../screens/Inbox/InboxDetail';
import Map from '../screens/Map/Map';
import { Alert, BackHandler, TouchableOpacity, Image } from 'react-native';

const ArrowBackButton = () => {
    const navigation = useNavigation();
    return (
        <Icon name={'chevron-left'} size={36} color={COLORS.white} onPress={() => {
            navigation.goBack();
        }} />
    );
};

const SearchButton = () => {
    const navigation = useNavigation();
    return (
        <MaterialIcons name={'search'} size={28} color={COLORS.white} />
        // <SearchNormal1
        //     size="24"
        //     color={COLORS.white}
        //     // onPress={() => {
        //     //     navigation.goBack();
        //     // }}
        //     style={{ marginRight: 10 }}
        // />
    );
};

const LogSuratButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => { console.log("Log Surat") }}>
            <Image
                source={require('../assets/imgs/menu-icon/history.png')}
                style={{ height: 28, width: 28, marginRight: '10%' }}
            />
        </TouchableOpacity>
    );
};

const DownloadButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => { console.log("Download") }}>
            <Icon 
                name='download' 
                size={28} 
                color={COLORS.white}
                style={{marginRight: '-5%'}}
            />
        </TouchableOpacity>
    );
};

const SetAddress = () => {
    return (
        <MaterialIcons name={'location-pin'} size={28} color={COLORS.white} />
    )
}

const MainStack = ({ isLoggedIn, navigation }) => {
    const navigationRef = useRef();
    const routeNameRef = useRef();

    const backAction = () => {
        if (routeNameRef.current == 'Home' || routeNameRef.current == 'Login'){
            Alert.alert("Hold on!", "Are you sure you want to exit app?", [
                {
                text: "Cancel",
                onPress: () => {
                    return true;
                },
                style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        }
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
      }
    }, [])
    
    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => (routeNameRef.current = navigationRef.current.getCurrentRoute().name)}
            onStateChange={async () => {
                const currentRouteName = navigationRef.current.getCurrentRoute().name;
                routeNameRef.current = currentRouteName;
            }}
        >
            <Stack.Navigator
                initialRouteName={
                    isLoggedIn ? MainRouteName.HOME : MainRouteName.LOGIN
                    // MainRouteName.HOME
                }>
                <Stack.Screen
                    name={MainRouteName.HOME}
                    component={Home}
                    options={{ headerShown: false }}
                />
                {/* Login */}
                <Stack.Screen
                    name={MainRouteName.LOGIN}
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={MainRouteName.INBOX}
                    component={Inbox}
                    options={{
                        headerShown: true,
                        headerTitle: "Surat Masuk",
                        headerStyle: {
                            backgroundColor: COLORS.Blue,
                        },
                        headerTintColor: COLORS.white,
                        headerLeft: () => (
                            <>
                                <ArrowBackButton />
                            </>
                        ),
                        headerRight: () => (
                            <>
                                <SearchButton />
                            </>
                        ),
                    }}
                />
                <Stack.Screen
                    name={MainRouteName.INBOX_DETAIL}
                    component={InboxDetail}
                    options={{
                        headerShown: true,
                        headerTitle: "",
                        headerStyle: {
                            backgroundColor: COLORS.Blue,
                        },
                        headerTintColor: COLORS.white,
                        headerLeft: () => (
                            <>
                                <ArrowBackButton />
                            </>
                        ),
                        headerRight: () => (
                            <>
                                <LogSuratButton />
                                <DownloadButton />
                            </>
                        ),
                    }}
                />
                <Stack.Screen
                    name={MainRouteName.OUTBOX}
                    component={Outbox}
                    options={{
                        headerShown: true,
                        headerTitle: "Surat Keluar",
                        headerStyle: {
                            backgroundColor: COLORS.Blue,
                        },
                        headerTintColor: COLORS.white,
                        headerLeft: () => (
                            <>
                                <ArrowBackButton />
                            </>
                        ),
                        headerRight: () => (
                            <>
                                <SearchButton />
                            </>
                        )
                    }}
                />
                <Stack.Screen
                    name={MainRouteName.MAP}
                    component={Map}
                    options={{
                        headerShown: true,
                        headerTitle: "Lokasi Anda",
                        headerStyle: {
                            backgroundColor: COLORS.Blue,
                        },
                        headerTintColor: COLORS.white,
                        headerLeft: () => (
                            <>
                                <ArrowBackButton />
                            </>
                        ),
                        headerRight: () => (
                            <>
                                <SetAddress />
                            </>
                        )
                    }}
                />
                <Stack.Screen
                    name={MainRouteName.ABSENT}
                    component={AbsentList}
                    options={{
                        headerShown: true,
                        headerTitle: "Absensi",
                        headerStyle: {
                            backgroundColor: COLORS.Blue,
                        },
                        headerTintColor: COLORS.white,
                        headerLeft: () => (
                            <>
                                <ArrowBackButton />
                            </>
                        )
                    }}
                />
                <Stack.Screen
                    name={MainRouteName.ABSENT_DETAIL}
                    component={AbsentDetail}
                    options={{
                        headerShown: true,
                        headerTitle: "Absen Mobile",
                        headerStyle: {
                            backgroundColor: COLORS.Blue,
                        },
                        headerTintColor: COLORS.white,
                        headerLeft: () => (
                            <>
                                <ArrowBackButton />
                            </>
                        )
                    }}
                />
                <Stack.Screen
                    name={MainRouteName.CUTI}
                    component={CutiList}
                    options={{
                        headerShown: true,
                        headerTitle: "Izin/Cuti",
                        headerStyle: {
                            backgroundColor: COLORS.Blue,
                        },
                        headerTintColor: COLORS.white,
                        headerLeft: () => (
                            <>
                                <ArrowBackButton />
                            </>
                        ),
                        headerRight: () => (
                            <>
                                <SearchButton />
                            </>
                        )
                    }}
                />
                <Stack.Screen
                    name={MainRouteName.CARI_PEGAWAI}
                    component={SearchPegawai}
                    options={{
                        headerShown: true,
                        headerTitle: "Cari Pegawai",
                        headerStyle: {
                            backgroundColor: COLORS.Blue,
                        },
                        headerTintColor: COLORS.white,
                        headerLeft: () => (
                            <>
                                <ArrowBackButton />
                            </>
                        )
                    }}
                />
                <Stack.Screen
                    name={MainRouteName.SPPD}
                    component={SppdList}
                    options={{
                        headerShown: true,
                        headerTitle: "SPPD",
                        headerStyle: {
                            backgroundColor: COLORS.Blue,
                        },
                        headerTintColor: COLORS.white,
                        headerLeft: () => (
                            <>
                                <ArrowBackButton />
                            </>
                        ),
                        headerRight: () => (
                            <>
                                <SearchButton />
                            </>
                        )
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack