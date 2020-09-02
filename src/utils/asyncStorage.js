import AsyncStorage from '@react-native-community/async-storage';

export const getData = async () => {
    // await AsyncStorage.removeItem('amount');
    const pp = await AsyncStorage.getItem('amount');
    console.log('index.js >>>> ' + pp +'\t'+ (typeof pp));
    if (pp !== null) {
        return pp;
    } else {
        return 0;
    }
}

export const pushData = async (count) => {

    if(await AsyncStorage.getItem('amount') === null) {
        await AsyncStorage.setItem('amount', count);
        
    }
    else {
        var prev = await AsyncStorage.getItem('amount');
        prev = Number.parseInt(prev, 10);
        const curr = count * 1;

        var res = prev + curr;

        await AsyncStorage.setItem('amount', res.toString());
        
    }   
}

export const popData = async () => {
    var prev = await AsyncStorage.getItem('amount');
    prev = Number.parseInt(prev, 10) - 1;

    if(prev >= 0) {
        await AsyncStorage.setItem('amount', prev.toString());
        
    }
    else {
        await AsyncStorage.setItem('amount', null);
        
    }
}

export const clearStorage = async () => {
    await AsyncStorage.clear();
  
}