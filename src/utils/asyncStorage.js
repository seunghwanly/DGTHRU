import AsyncStorage from '@react-native-community/async-storage';

export const getData = async () => {
    const pp = await AsyncStorage.getItem('amount');
    console.log('index.js >>>> ' + pp);
    if (pp != null) {
        return pp;
    } else {
        return 0;
    }
}

export const pushData = async (count) => {
    if(getData() === 0 ) {
        await AsyncStorage.setItem('amount', count.toString());
    }
    else {
        const prevCount = Number(getData());
        const currCount = prevCount + count;

        console.log('asyncStorage >>>>>>>>>   ' + currCount);

        await AsyncStorage.setItem('amount', currCount.toString());
    }
    
}