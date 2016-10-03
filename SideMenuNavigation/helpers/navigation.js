import React, { Platform } from 'react-native';
import _ from 'underscore';

module.exports = function (scene) {
    var componentMap = {
        'Home': {
            title: 'Home',
            id: 'Home'
        },
        'AnotherComponent': {
            title: 'AnotherComponent',
            id: 'AnotherComponent'
        }
    }

    return componentMap[scene];
}
