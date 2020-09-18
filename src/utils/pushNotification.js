import { useState, useEffect } from 'react';
import { AppState, PushNotificationIOS } from 'react-native';
import PushNotification from 'react-native-push-notification';
import BackgroundFetch from 'react-native-background-fetch';
import { commonDatabase } from './DatabaseRef';

const _handleAppStateChange = (nextAppState,currentMessage) => {
    if (nextAppState === 'active') {
        _registerLocalNotification(currentMessage);
    }
};

const _registerLocalNotification = (currentMessage) => {
    PushNotification.setApplicationIconBadgeNumber(0);
    PushNotification.cancelAllLocalNotifications();

    PushNotification.localNotificationSchedule({
        /* Android Only Properties */
        vibrate: true,
        vibration: 300,
        priority: 'hight',
        visibility: 'public',
        importance: 'hight',

        /* iOS and Android properties */
        message: currentMessage, // (required)
        playSound: false,
        number: 1,
        actions: '["OK"]',

        // for production
        // repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
        // date: nextHour,

        // test to trigger each miniute
        // repeatType: 'minute',
        // date: new Date(Date.now()),

        // test to trigger one time
        date: new Date(Date.now() + 10 * 1000),
    });
};



export default {
    register: async (shopInfo) => {
        PushNotification.configure({
            onNotification: function (notification) {
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            popInitialNotification: true,
        });

        //state
        const [orderState, setOrderState] = useState([]);
        const [currentMessage, setCurrentMessage] = useState('');

        //effect
        useEffect(() => {
            commonDatabase(shopInfo)
                .on('value', (snapshot) => {
                    //init
                    setOrderState([]);

                    snapshot.forEach((childSnapShot) => {

                        if (childSnapShot.key.charAt(0) === '-') {  // 단일 주문 건
                            //주문정보담기
                            setOrderState(orderState.concat(childSnapShot.val().orderInfo.orderState));
                        }
                        else {  // 장바구니 주문 건
                            childSnapShot.forEach((dataChild) => {
                                //주문정보담기
                                setOrderState(orderState.concat(dataChild.val().orderInfo.orderState));
                            })
                        }
                    })

                    console.log('> push_notification : ' + JSON.stringify(orderState));

                    var isFullyReady = 0;
                    for (var i = 0; i < orderState.length; ++i) {
                        if (orderState[i] === 'ready') {
                            isFullyReady++;
                        }
                        else if (orderState[i] === 'cancel') {
                            console.log('카운터로 와주세요 :(');
                            setCurrentMessage('카운터로 와주세요 :(');
                        }
                        else if (orderState[i] === 'confirm') {
                            console.log('메뉴가 준비중입니다 !');
                            setCurrentMessage('메뉴가 준비중입니다 !');
                        }
                        else {
                            if (isFullyReady > 0) isFullyReady--;
                        }
                        // isCanceled 추가 하기 객체에
                    }
                    if (isFullyReady === orderState.length && isFullyReady > 0) {
                        console.log('메뉴가 준비되었습니다. 픽업대에서 받아주세요 !');
                        setCurrentMessage('메뉴가 준비되었습니다. 픽업대에서 받아주세요 !');
                        //this.setState({ isMenuReady: true });
                    }
                })
        });

        _registerLocalNotification(currentMessage);
        

        AppState.addEventListener('change', _handleAppStateChange(AppState.currentState,currentMessage));
    },
    unregister: () => {
        AppState.removeEventListener('change', _handleAppStateChange(AppState.currentState, ''));
    },
};