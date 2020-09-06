import React from 'react';
import auth from '@react-native-firebase/auth';

/* 아임포트 결제모듈을 불러옵니다. */
import IMP from 'iamport-react-native';

/* 로딩 컴포넌트를 불러옵니다. */
import Loading from './Loading';

//결제완료시간 주기
import moment from 'moment';

export function Payment({ navigation, route }) {

    const { totalCost } = route.params;
    const { shopInfo } = route.params;

    console.log('totalCost :' + totalCost + '\tshopInfo : ' + shopInfo);
    // const { quantity } = route.params;

    /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
    function callback(response) {
        navigation.replace('Result', 
        {
            response : response,
            shopInfo : shopInfo,
            requestTime : moment().format('HH:mm:ss') 
        });
    }

    /* [필수입력] 결제에 필요한 데이터를 입력합니다. */
    const data = {
        pg: 'kakaopay',
        pay_method: 'card',
        name: '동국대학교 DGTHRU',
        merchant_uid: `mid_${new Date().getTime()}`,
        amount: totalCost,
        buyer_tel: auth().currentUser.phoneNumber,
        app_scheme: 'example',
        customer_uid: 'customer_' + new Date().getTime(),
        //KAKAOPAY DATA ESSENTIAL
        // cid: 'TC0ONETIME',
        // partner_order_id : 'DGTHRU_TEST',
        // partner_user_id : auth().currentUser.uid,
        // item_name : 'coffee',
        // quantity : Number(quantity),
        // total_amount : Number(totalCost),
        // tax_free_amount : 0,
        // approval_url : 'https://localhost:8081/PaymentResult',
        // cancel_url : 'https://localhost:8081/PaymentResult',
        // fail_url : 'https://localhost:8081/PaymentResult'
        // [Deprecated v1.0.3]: m_redirect_url
    };

    /*
          필수입력 : 카카오페이
  
          cid : 기맹점 코드 10자
          partner_order_id : 가맹점 주문번호, 최대100자
          partner_user_id : 가맹점 회원 id, 최대 100자
          item_name : 상품명, 최대 100자
          quantity : 상품 수량
          total_amount : 상품 총액
          tax_free_amount : 상품 비과세 금액
          approval_url : 결제 성공시 redirect url, 255
          cancel_url : 결제 취소시 redirect url, 255
          fail_url : 결제 실패시 redirect url, 255
    */

    return (
        <IMP.Payment
            kakaoOpenApp={true}
            userCode={'imp30810955'}  // 가맹점 식별코드 >> essential
            loading={<Loading />} // 로딩 컴포넌트
            data={data}           // 결제 데이터  >> essential
            callback={callback}   // 결제 종료 후 콜백    >> essential
        />
    );
}

export default Payment;