import database from '@react-native-firebase/database';
import moment from 'moment';

export function _setPickUpTime(orderDate, shopName , orderNumber) {
    
    database().ref('admin/' + shopName +'/' + orderDate).once('value', (snapshot) => {
        snapshot.forEach((child) => {
           var orderInfo = child.val().orderInfo;
            if(orderInfo.orderNumber === orderNumber){
                console.log(child.key);
                var now = moment().format("HH:mm:ss");
               // console.log(now);
                database().ref('admin/'+shopName + '/' + orderDate + '/' + child.key +'/orderInfo').update({
                    pickupTime : now
                })
            }
            
    })
})
}

export function _setCompleteTime(orderDate, shopName , orderNumber) {
    
    database().ref('admin/' + shopName +'/' + orderDate).once('value', (snapshot) => {
        snapshot.forEach((child) => {
           var orderInfo = child.val().orderInfo;
          
            if(orderInfo.orderNumber === orderNumber){
                console.log(child.key);
                var now = moment().format("HH:mm:ss");
               // console.log(now);
                database().ref('admin/'+shopName + '/' + orderDate + '/' + child.key +'/orderInfo').update({
                    readyTime : now
                })
            }
            
    })
})
}

export function _setConfirmTime(orderDate, shopName , orderNumber) {
    
    database().ref('admin/' + shopName +'/' + orderDate).once('value', (snapshot) => {
        snapshot.forEach((child) => {
           var orderInfo = child.val().orderInfo;
          
            if(orderInfo.orderNumber === orderNumber){
                console.log(child.key);
                var now = moment().format("HH:mm:ss");
               // console.log(now);
                database().ref('admin/'+shopName + '/' + orderDate + '/' + child.key +'/orderInfo').update({
                    confirmTime : now
                })
            }
            
    })
})
}

export function _stringConverter(str){
     if(str ==='request') 
       return '승인요청';
       
       else if(str ==='confirm')
       return '주문승인';
       
       else if(str ==='ready'){
           return '준비완료';
       }
       else return str;
}

export async function DeleteOrderList(key) {
    var userPath = 'hyehwa_roof/' + currentTime + '/+821012341234/' + key + '/';


    await database()
        .ref(userPath)
        .remove();
}

export async function Setconfirm(shopname, date, phonenum, key, isGroup,orderNumber) {
    if(!isGroup)
        database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/' + key + '/orderInfo').update({ orderState: 'confirm' });
    else{
        database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/group/' + key + '/orderInfo').update({ orderState: 'confirm' });
    }
    _setConfirmTime(date,shopname, orderNumber);
}

export async function SetUnconfirm(shopname, date, phonenum, key, isGroup) {
    if(!isGroup)
        database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/' + key + '/orderInfo').update({ orderState: 'cancel' });
    else {
        database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/group/' + key + '/orderInfo').update({ orderState: 'cancel' });
    }
}

export async function SetReady(shopname, date, phonenum, key, isGroup ,orderNumber) {
    if(!isGroup)
        database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/' + key + '/orderInfo').update({ orderState: 'ready' });
    else {
        database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/group/' + key + '/orderInfo').update({ orderState: 'ready' });
    }
    _setCompleteTime(date, shopname, orderNumber);
}
export async function SetRemove(shopname, date, phonenum, key, isGroup, orderNumber) {
    if(!isGroup)
        database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/' + key).remove();
       
    else {
        database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/group/').remove();
    }
    _setPickUpTime(date, shopname, orderNumber);
}

export async function addToAdmin(shopname, date, phonenum, key, menu,phoneNumber) {
    console.log(date);
    var adminPath = 'admin/' + shopname + '/' + date;
    const adminRef = database().ref(adminPath).push();
    adminRef.set(menu).then(()=>console.log('push to admin'));
}