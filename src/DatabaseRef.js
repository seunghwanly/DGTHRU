import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import moment from 'moment';

var currDate = moment().format('YYYY_MM_DD')

export const userHistoryRef = 'user_history' + '/' + auth().currentUser.uid;

export function commonRef(shopInfo) {
    return shopInfo + '/' + currDate + '/' + auth().currentUser.phoneNumber;
}

export function commonDatabase(shopInfo) {
    return database().ref(commonRef(shopInfo));
}

export const userHistoryDatabase = database().ref('user_history' + '/' + auth().currentUser.uid);