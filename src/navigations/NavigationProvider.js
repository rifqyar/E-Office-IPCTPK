import React, { useEffect, useState } from 'react';
//react redux
// import {useDispatch, useSelector} from 'react-redux';
import MainStack from './MainStack';

const NavigationProvider = () => {
    // const user = useSelector(state => state.authReducer);
    // const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

    // useEffect(() => {
    //     getUser();
    //   }, [isLoggedIn]);

    // const getUser = async () => {
        
    //   };

    return (
        // <MainStack isLoggedIn={isLoggedIn} />
        <MainStack />
    )
}

export default NavigationProvider