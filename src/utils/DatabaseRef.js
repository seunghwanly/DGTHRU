
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

var currDate = moment().format('YYYY_MM_DD');

export const userHistoryRef = () => {
    if (auth().currentUser !== null)
        return 'user/user_history/' + auth().currentUser.uid + '/' + currDate;
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
    if (auth().currentUser !== null)
        return database().ref(favoriteRef(shopInfo));
}

export const pushFavorite = (shopInfo, menu) => {
    if (auth().currentUser !== null) {

        const newItem = database()
            .ref(favoriteRef(shopInfo))
            .push();


        const data = {
            'key': newItem.key,
            'value': menu
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
//==========================================================주문번호
// export function setOrderNum(shopInfo) {
//     if (auth().currentUser !== null) {
//         //결제하기할때 주문번호를 넣는게 맞는거 같은데
//         const currentOrderNum = '';
//         //현재 주문번호를 읽어와야지
//         orderNumDatabase(shopInfo)
//             .once('value', (snapshot) => {
//                 currentOrderNum = snapshot.val().number;
//             }).then(() => {
//                 if (Number(currentOrderNum) === 999) {
//                     database()
//                         .ref('order_num/' + shopInfo)
//                         .update({ number: 0 });
//                 }
//                 else {
//                     database()
//                         .ref('order_num/' + shopInfo)
//                         .update({ number: Number(currentOrderNum) + 1 });
//                 }
//             })
//     }
// }

export function orderNumDatabase(shopInfo) {
    if (auth().currentUser !== null) {
        console.log('orderNum >> ' + shopInfo);
        //현재 주문번호를 읽어오자
        return database().ref('order_num/'+shopInfo);
    }
}