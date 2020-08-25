import auth from '@react-native-firebase/auth';
import moment from 'moment';

var currDate = moment().format('YYYY_MM_DD')

export const userHistoryRef = 'user_history' + '/' + auth().currentUser.uid;

export function commonRef(shopInfo) {
    return shopInfo + '/' + currDate + '/' + auth().currentUser.phoneNumber;
}