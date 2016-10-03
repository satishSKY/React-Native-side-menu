import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from '../styles/home'

class AnotherComponent extends Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>AnotherComponent Screen</Text>
            </View>
        );
    }
}

module.exports = AnotherComponent;
