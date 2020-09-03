
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

var currDate = moment().format('YYYY_MM_DD');

export const userHistoryRef = () => {
    if (auth().currentUser !== null)
        return 'user_history' + '/' + auth().currentUser.uid + '/' + currDate;
}

export function commonRef(shopInfo) {
    if (auth().currentUser !== null)
        return 'shops/' + shopInfo + '/' + currDate + '/' + auth().currentUser.phoneNumber;
}

export const favoriteRef = (shopInfo) => {
    if (auth().currentUser !== null)
        return 'user/favorites' + '/' + shopInfo + '/' + auth().currentUser.uid;
}

export function commonDatabase(shopInfo) {
    if (auth().currentUser !== null)
        return database().ref(commonRef(shopInfo));
}

export const userHistoryDatabase = () => {
    if (auth().currentUser !== null)
        return database().ref(userHistoryRef());
}

export const userHistoryTotalDatabase = () => {
    if (auth().currentUser !== null)
        return database().ref('user/user_history' + '/' + auth().currentUser.uid);
}

export const userFavoriteDatabase = (shopInfo) => {
    if(auth().currentUser !== null) 
        return database().ref(favoriteRef(shopInfo));
}

export const pushFavorite = (shopInfo, menu) => {
    if (auth().currentUser !== null) {

        const newItem = database()
            .ref(favoriteRef(shopInfo))
            .push();
        
        
        const data ={
            'key' : newItem.key,
            'value' : menu
        }

        newItem
            .set(data)
            .then(() => alert('즐겨찾기로 등록되었습니다 !'));
    }
}

export async function popFavorite(shopInfo, key) {
    if (auth().currentUser !== null) {

        var favoritePath = favoriteRef(shopInfo) + '/' + key;

        await database().ref(favoritePath).remove().then(() => alert('삭제되었습니다 !'));
    }
}