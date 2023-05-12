/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  LogBox,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import NavigationProvider from './src/navigations/NavigationProvider';
import Home from './src/screens/Home/Home';
import { Provider as PaperProvider } from 'react-native-paper';
import RNBootSplash from "react-native-bootsplash";
import LoadingScreen from './src/components/LoadingScreen';
import { Provider } from 'react-redux';
import store from './src/redux/store';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {
    useEffect(() => {
    // const init = async () => {
    //   // …do multiple sync or async tasks
    // };

    // init().finally(async () => {
      RNBootSplash.hide({ fade: true, duration: 150 });
    // });
    LogBox.ignoreAllLogs();
  }, []);
  return (
    <PaperProvider>
      <Provider store={store}>
        <NavigationProvider />
      </Provider>
    </PaperProvider>
  );
}

export default App;
