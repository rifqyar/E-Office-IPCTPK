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

const InboxDetail = ({navigation, route}) => {
    const user = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();

    useEffect(() => {
        // getDetailInbox();
        console.log(route.params.mail.Location);
    }, []);

    const getDetailInbox = async () => {
        dispatch(loading());
        soapCall(api_base_url, 'eoffice_viewmail', {
            usernameEDI: api_user,
            passwordEDI: api_pass,
            nipp: user.user.NIPP,
            linkSurat: route.params.mail.Location,
            from_modul: ''
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

export default InboxDetail

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        minHeight: '100%'
    },
})