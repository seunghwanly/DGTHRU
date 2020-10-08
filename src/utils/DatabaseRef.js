
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

export const favoriteRef = () => {
    if (auth().currentUser !== null)
        return 'user/favorites' + '/' + auth().currentUser.uid;
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

export const userCouponRef = () => {
    if (auth().currentUser !== null)
        return 'user/coupons' + '/' + auth().currentUser.uid + '/' + shopInfo;
}

export const userCouponDatabase = () => {
    if (auth().currentUser !== null)
        return database().ref(userCouponRef());
}

export const userCouponTotalDatabase = () => {
    if (auth().currentUser !== null)
        return database().ref('user/coupons' + '/' + auth().currentUser.uid);
}

export const userFavoriteDatabase = (shopInfo) => {
    if (auth().currentUser !== null)
        return database().ref(favoriteRef(shopInfo));
}

export const pushFavorite = async (shopInfo, menu, type, categoryName) => {
    if (auth().currentUser !== null) {

        var isSameMenu = false;

        await database().ref(favoriteRef()).once('value', snapshot => {
            snapshot.forEach((childSnapShot) => {    // auto key
                childSnapShot.forEach((item) => {   // value
                    if (item.val().name === menu.name)
                        isSameMenu = true;
                })
            })
        }).then(() => {
            if (!isSameMenu) {
                const newItem = database()
                    .ref(favoriteRef())
                    .push();


                const data = {
                    'key': newItem.key,
                    'shopInfo': shopInfo,
                    'type': type,
                    'categoryName': categoryName,
                    'value': menu
                }

                newItem
                    .set(data)
                    .then(() => alert('즐겨찾기로 등록되었습니다 !'));
            }
            else
                alert('이미 등록되어있습니다 !');
        });
    }
}

export async function popFavorite(key) {
    if (auth().currentUser !== null) {

        var favoritePath = favoriteRef() + '/' + key;

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
        return database().ref('order_num/' + shopInfo);
    }
}

export async function handleOrder(shopInfo, data, isGroup) {
    var currentTime = moment().format('YYYY_MM_DD');
    if (isGroup) {
        //pop     
        await database().ref('user/basket/' + auth().currentUser.uid + '/group').remove();
        //push
        await database()
            .ref('shops/' + shopInfo + '/' + currentTime + '/' + auth().currentUser.phoneNumber + '/' + 'group')
            .set(data);
    }
    else {
        //pop     
        await database().ref('user/basket/' + auth().currentUser.uid).remove();
        //push
        await database()
            .ref('shops/' + shopInfo + '/' + currentTime + '/' + auth().currentUser.phoneNumber)
            .push(data);
    }
}


export async function handleDeleteOrder(orderKey, isGroup) {

    console.log('>> orderKey : ' + orderKey);

    if (isGroup) {
        var orderPath = 'user/basket/' + auth().currentUser.uid + '/group/' + orderKey;

        await database()
            .ref(orderPath)
            .remove();
    } else {
        var orderPath = 'user/basket/' + auth().currentUser.uid + '/' + orderKey;

        await database()
            .ref(orderPath)
            .remove();
    }
}