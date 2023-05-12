import { View, Text } from 'react-native'
import React from 'react'
import Axios from 'axios';

/**
 * @param {Object} body 
 * @param {String} endpoint
 * @param {Function} callback
 */
export default apiCall = async (endpoint, body, callback) => {
    try {
        await Axios.post(endpoint, body).then((res) => {
            callback(res.data)
        }).catch(err => {
            console.log(err)
        })
    } catch (error) {
        console.error(error);
        throw error;
    }
}