import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('shopInfo', value);
        console.log('asyncStorage store : ' + value);
    } catch (e) {
        console.log("[ERROR] Shops.js > "+e);
    }
}

export const getData = async () => {
    var result = '';
    await AsyncStorage.getItem('shopInfo', (err, res) => result = res);
    return result;
}
  

export const clearStorage = async () => {
    await AsyncStorage.clear();
  
}