
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

var currDate = moment().format('YYYY_MM_DD');

export const userHistoryRef = () => { 
    if(auth().currentUser !== null)
        return 'user_history' + '/' + auth().currentUser.uid;
}

export function commonRef(shopInfo) {
    if(auth().currentUser !== null)
        return shopInfo + '/' + currDate + '/' + auth().currentUser.phoneNumber;
}

export function commonDatabase(shopInfo) {
    if(auth().currentUser !== null)
        return database().ref(commonRef(shopInfo));
}

export const userHistoryDatabase = () => {
    if(auth().currentUser !== null)
        return database().ref('user_history' + '/' + auth().currentUser.uid);
} 
