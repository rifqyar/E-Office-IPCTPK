import React, { useEffect, useState } from 'react';
//react redux
import { useDispatch, useSelector } from 'react-redux';
import MainStack from './MainStack';
import { setUser } from '../redux/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_USER } from '../constants/actionTypes';
import { loading } from '../redux/actions/loadingAction';

const NavigationProvider = () => {
    const dispatch = useDispatch()
    // const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    const [isLoggedIn, setIsLoggedIn] = useState(null)

    useEffect(() => {
        getUser();
    });

    const getUser = async () => {
        try {
            var user = await AsyncStorage.getItem('user');
            user = JSON.parse(user)
            if (user != null) {
                setIsLoggedIn(true)
                dispatch({
                    type: SET_USER,
                    payload: {user: user, isLoggedIn: true},
                });
            } else {
                let authState = { isLoggedIn: false, user: null };
                setIsLoggedIn(false)
                dispatch(setUser(authState));
            }
        } catch (error) { }
    };

    if (isLoggedIn != null){
        return (
            <MainStack isLoggedIn={isLoggedIn} />
            // <MainStack />
        )
    }
}

export default NavigationProvider