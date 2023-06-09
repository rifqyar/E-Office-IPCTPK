import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { ArrowLeft2 } from 'iconsax-react-native';
import { MainRouteName } from '../constants/mainRouteName';

import Home from '../screens/Home/Home';
import Inbox from '../screens/Inbox/Inbox'
import Login from '../screens/Auth/Login';

const ArrowBackButton = () => {
    const navigation = useNavigation();
    return (
        <ArrowLeft2
            size="24"
            color="#000"
            onPress={() => {
                navigation.goBack();
            }}
            style={{ marginRight: 10 }}
        />
    );
};

const MainStack = ({ isLoggedIn, navigation }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
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
                        headerLeft: () => (
                          <>
                            <ArrowBackButton />
                          </>
                        )
                      }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack