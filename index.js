/**
 * @format
 */

/** @format */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import './global.css';   // ← Keep this

AppRegistry.registerComponent(appName, () => App);