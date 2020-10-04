/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './src/index';
import {name as appName} from './app.json';

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(['Warning: Encountered two children with the same key, `:::`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.',
    'Warning: Encountered two children with the same key, `::`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.',
    'Warning: Encountered two children with the same key, `:`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.'
    ,'A VirtualizedList contains a cell which itself contains more than one VirtualizedList of the same orientation as the parent list. You must pass a unique listKey prop to each sibling list.'
]);

AppRegistry.registerComponent(appName, () => App);
