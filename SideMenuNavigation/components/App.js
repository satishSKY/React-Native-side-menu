'use strict'

import React, { Component } from 'react';
import { DeviceEventEmitter, Navigator, Text, Image,TouchableOpacity, View } from 'react-native';

import Drawer from 'react-native-drawer';
//import Icon from 'react-native-vector-icons/Ionicons';
import { EventEmitter } from 'fbemitter';

import Menu from './Menu';
import Home from './Home'
import AnotherComponent from './AnotherComponent'

import navigationHelper from '../helpers/navigation';

import styles from '../styles/root';

let _emitter = new EventEmitter();

class App extends Component {
    componentDidMount() {
        var self = this;

        _emitter.addListener('openMenu', () => {
            self._drawer.open();
        });

        _emitter.addListener('back', () => {
            self._navigator.pop();
        });
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={<Menu navigate={(route) => {
                    this._navigator.push(navigationHelper(route));
                    this._drawer.close()
                }}/>}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                styles={{
                    drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
                    main: {paddingLeft: 3}
                }}
                tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2 }
                })}>
                <Navigator
                    ref={(ref) => this._navigator = ref}
                    configureScene={(route) => Navigator.SceneConfigs.FloatFromLeft}
                    initialRoute={{
                        id: 'Home',
                        title: 'Home',
                        index: 0
                    }}
                    renderScene={(route, navigator) => this._renderScene(route, navigator)}
                    navigationBar={
                        <Navigator.NavigationBar
                            style={styles.navBar}
                            routeMapper={NavigationBarRouteMapper} />
                    }
                />
            </Drawer>
        );
    }

    _renderScene(route, navigator) {
        switch (route.id) {
            case 'Home':
                return ( <Home navigator={navigator}/> );

            case 'AnotherComponent':
                return ( <AnotherComponent navigator={navigator}/> );
        }
    }
}

const NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        switch (route.id) {
            case 'Home':
                return (
                    <TouchableOpacity
                        style={styles.navBarLeftButton}
                        onPress={() => {_emitter.emit('openMenu')}}>
                        <Image source={require('../images/menu.png')} />

                    </TouchableOpacity>
                )
            default:
                return (
                    <TouchableOpacity
                        style={styles.navBarLeftButton}
                        onPress={() => {_emitter.emit('back')}}>
                        <Image source={require('../images/back.png')} />
                    </TouchableOpacity>
                )
        }
    },

    RightButton(route, navigator, index, navState) {
        return (
            <TouchableOpacity
                style={styles.navBarRightButton}>
              <Text>more-vert</Text>
            </TouchableOpacity>
        )
    },

    Title(route, navigator, index, navState) {
        return (
            <Text style={[styles.navBarText, styles.navBarTitleText]}>
                {route.title}
            </Text>
        )
    }
}

export default App;
