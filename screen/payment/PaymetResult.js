import React from 'react';
import {
    View,
    Text, Button
} from 'react-native';


export default PaymentResult = ({ navigation, route }) => {

    const response = route.params;
    
    if(response.imp_success === 'true') {
        //돈을 냈으니까 장바구니에서 지워야 겠죠 네

        // >> 관리자가 메뉴를 확인하고 지우는 게 현명할 거 같음

        return (
            <View style={{
                backgroundColor:'white',
                flex:1,
                justifyContent:'center',
                alignItems:'center'
            }}>
                <Text>메뉴가 준비되면 알려드리겠습니다 !</Text>
                <Button
                    title="홈으로 돌아가기"
                    onPress={() => navigation.navigate('Shops')}
                />
            </View>
        )
    } else {
        return(
            <View style={{
                backgroundColor:'white',
                flex:1,
                justifyContent:'center',
                alignItems:'center'
            }}>
                <Text>결제 실패{'\n'}관리자에게 문의하세요.</Text>
            </View>
        )
    }
}