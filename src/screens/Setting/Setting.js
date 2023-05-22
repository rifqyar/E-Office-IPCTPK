import React from 'react'
import { FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import HeaderSetting from '../../components/Setting/HeaderSetting'
import { Title } from 'react-native-paper'
import { SIZES } from '../../constants/theme'

const Setting = (props) => {
    const { navigation } = props
    const {width, height} = useWindowDimensions()
    const isLandscape = width > height ? true : false

    const DetailProfile = () => {
        return (
            <View style={{flex:1, marginHorizontal: SIZES.padding * 3, marginTop: SIZES.padding}}>
                <Title>
                    Profile
                </Title>
            </View>
        )    
    }

    return (
        <SafeAreaProvider style={{flex: 1}}>
            {
                !isLandscape
                ?
                    <>
                        <View style={{flex: 0.4}}>
                            <HeaderSetting isLandscape={isLandscape} />
                        </View>
                        <FlatList 
                            data={[0,1]}
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={<DetailProfile />}
                        />
                    </>
                :   
                    <FlatList 
                        data={[0,1]}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={() => {
                            return (
                                <>
                                    <HeaderSetting isLandscape={isLandscape} />
                                    <DetailProfile />
                                </>
                            )
                        }}
                    />
            }
        </SafeAreaProvider>
    )
}

export default Setting

const styles = StyleSheet.create({})