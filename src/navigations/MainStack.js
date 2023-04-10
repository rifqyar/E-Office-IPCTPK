import React, { useEffect, useRef } from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { ArrowLeft2, SearchNormal1 } from 'iconsax-react-native';
import { MainRouteName } from '../constants/mainRouteName';

import Home from '../screens/Home/Home';
import Inbox from '../screens/Inbox/Inbox';
import Outbox from '../screens/Outbox/Outbox';
import Login from '../screens/Auth/Login';
import AbsentList from '../screens/Absensi/AbsentList';
import AbsentDetail from '../screens/Absensi/AbsentDetail';
import CutiList from '../screens/Cuti/CutiList';
import { Alert, BackHandler } from 'react-native';

const ArrowBackButton = () => {
    const navigation = useNavigation();
    return (
        <ArrowLeft2
            size="24"
            color="#fff"
            onPress={() => {
                navigation.goBack();
            }}
            style={{ marginRight: 10 }}
        />
    );
};

const SearchButton = () => {
    const navigation = useNavigation();
    return (
        <SearchNormal1
            size="24"
            color="#fff"
            // onPress={() => {
            //     navigation.goBack();
            // }}
            style={{ marginRight: 10 }}
        />
    );
};

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
            <Stack.Navigator>
                {/* Login */}
                <Stack.Screen
                    name={MainRouteName.LOGIN}
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={MainRouteName.HOME}
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={MainRouteName.INBOX}
                    component={Inbox}
                    options={{
                        headerShown: true,
                        headerTitle: "Surat Masuk",
                        headerStyle: {
                            backgroundColor: '#006ba2',
                        },
                        headerTintColor: '#fff',
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
                    name={MainRouteName.OUTBOX}
                    component={Outbox}
                    options={{
                        headerShown: true,
                        headerTitle: "Surat Keluar",
                        headerStyle: {
                            backgroundColor: '#006ba2',
                        },
                        headerTintColor: '#fff',
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
                    name={MainRouteName.ABSENT}
                    component={AbsentList}
                    options={{
                        headerShown: true,
                        headerTitle: "Absensi",
                        headerStyle: {
                            backgroundColor: '#006ba2',
                        },
                        headerTintColor: '#fff',
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
                            backgroundColor: '#006ba2',
                        },
                        headerTintColor: '#fff',
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
                            backgroundColor: '#006ba2',
                        },
                        headerTintColor: '#fff',
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