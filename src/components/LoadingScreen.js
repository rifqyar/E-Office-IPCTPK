import React, { Component } from 'react'
import { 
    StyleSheet,
    Animated,
    ActivityIndicator,
    Platform
} from 'react-native'

import { COLORS, SIZES } from '../constants/theme';

export default class LoadingScreen extends Component {
    state = {
        showLoading : false,
        fadeAnim: new Animated.Value(0)
    }

    componentDidMount(){
        Animated.timing(this.state.fadeAnim, {
            toValue: 2,
            duration: 500,
            useNativeDriver: true
        }).start();

        this.setState({
            showLoading: true
        });
    }

    render() {
        return (
            <Animated.View style={[
                styles.loading,{
                    opacity: this.state.fadeAnim,
                    backgroundColor: this.props.isTransparent ? COLORS.transparent : 'rgba(0,0,0,0.2)'
                }
            ]}>
                <ActivityIndicator 
                    color={Platform.OS == 'ios' ? COLORS.Grey : COLORS.accentBlue} 
                    size={Platform.OS == 'android' ? SIZES.width/8 : 'large'} /> 
            </Animated.View> 
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})