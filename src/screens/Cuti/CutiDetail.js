import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { loading } from '../../redux/actions/loadingAction';
import { COLORS } from '../../constants/theme';
import { useSelector, useDispatch } from 'react-redux';
import {
    api_base_url,
    api_user,
    api_pass
} from '../../../app.json'
import soapCall from '../../helpers/soapCall';

const CutiDetail = ({navigation, route}) => {
    const user = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();

    useEffect(() => {
        getDetailCuti();
        console.log(route.params.mail);
    }, []);

    const getDetailCuti = async () => {
        dispatch(loading());
        soapCall(api_base_url, 'eoffice_viewmail', {
            usernameEDI: api_user,
            passwordEDI: api_pass,
            nipp: user.user.NIPP,
            linkSurat: route.params.mail.Location,
            from_modul: 'cuti'
        }).then((res) => {
            console.log(res)
            // setInboxes(res.data.List_Inbox);
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text>Test</Text>
            </ScrollView>
        </View>
    )
}

export default CutiDetail

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        minHeight: '100%'
    },
})