
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

var currDate = moment().format('YYYY_MM_DD');

export const userHistoryRef = () => { 
    if(auth().currentUser !== null)
        return 'user_history' + '/' + auth().currentUser.uid + '/' + currDate;
}

export function commonRef(shopInfo) {
    if(auth().currentUser !== null)
        return 'shops/' + shopInfo + '/' + currDate + '/' + auth().currentUser.phoneNumber;
}

export function commonDatabase(shopInfo) {
    if(auth().currentUser !== null)
        return database().ref(commonRef(shopInfo));
}

export const userHistoryDatabase = () => {
    if(auth().currentUser !== null)
        return database().ref('user_history' + '/' + auth().currentUser.uid + '/' + currDate);
}

export const userHistoryTotalDatabase = () => {
    if(auth().currentUser !== null)
        return database().ref('user_history' + '/' + auth().currentUser.uid);
}

export function getBasketLength(shopInfo) {

    countProperties = (obj) => {
        var count = 0;

        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                ++count;
        }

        return count;
    }

    if(auth().currentUser !== null) {
        database()
            .ref('shops' + shopInfo + '/' + currDate + '/' + auth().currentUser.phoneNumber)
            .once('value', (snapshot) => {
                console.log('>> dataref : '+snapshot.val());
                if(snapshot.val() !== null)
                    return countProperties(snapshot);
                else
                    return 0;
            });
    }
}