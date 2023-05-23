import { View, Text, Animated, Easing, useWindowDimensions } from 'react-native'
import React, { useRef, useState } from 'react'
// import { SIZES } from '../../assets/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SIZES } from '../theme'

export const LoginAnimation = () => {
    const edges = useSafeAreaInsets()
    const opacityLogo = useRef(new Animated.Value(0)).current;
    const scaleText= useRef(new Animated.Value(1)).current;
    const moveTitle = useRef(new Animated.ValueXY({x: 0, y: 50})).current;
    const moveForm = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
    const contentTransition = useRef(new Animated.Value(0)).current;

    const {width, height} = useWindowDimensions()
    const isLandscape = width > height ? true : false

    setTimeout(() => {
        Animated.parallel([
            // Animated.timing(
            //     startAnimation, {
            //         toValue: -SIZES.height + (edges.top + 80),
            //         useNativeDriver: false,
            //         duration: 500,
            //         delay: 500
            //     }
            // ),
            Animated.timing(
                opacityLogo, {
                    toValue: 1,
                    useNativeDriver: false,
                    duration: 500,
                    easing: Easing.ease
                }
            ),
            Animated.timing(
                scaleText, {
                    toValue: 0.5,
                    useNativeDriver: false,
                    delay: 750
                }
            ),
            Animated.timing(
                moveTitle,{
                    toValue: {
                        x: 0,
                        y: -50
                    }, useNativeDriver: false,
                    delay: 750
                }
            ),
            Animated.timing(
                moveForm,{
                    toValue: {
                        x: 0,
                        y: -50
                    }, useNativeDriver: false,
                }
            ),
            Animated.timing(
                contentTransition, {
                    toValue: 1,
                    useNativeDriver: false,
                    delay: 1500,
                    easing: Easing.in
                }
            )
        ]).start()
    }, 1000);

    return {moveTitle, scaleText, opacityLogo, contentTransition, moveForm}
}