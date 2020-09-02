/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './src/index';
import {name as appName} from './app.json';

LogBox.ignoreAllLogs(true);

AppRegistry.registerComponent(appName, () => App);
