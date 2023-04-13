import React, { useEffect, useState } from 'react';
//react redux
import { useDispatch, useSelector } from 'react-redux';
import MainStack from './MainStack';
import { setUser } from '../redux/actions/auth';

const NavigationProvider = () => {
    const user = useSelector(state => state.userReducer.user);
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);

    useEffect(() => {
        getUser();
        console.log(user);
      }, [isLoggedIn]);

    const getUser = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                let authState = { isLoggedIn: true, user: user };
                dispatch(setUser(authState));
            } else {
                let authState = { isLoggedIn: false, user: null };
                dispatch(setUser(authState));
            }
        } catch (error) { }
    };


    return (
        <MainStack isLoggedIn={isLoggedIn} />
        // <MainStack />
    )
}

export default NavigationProvider