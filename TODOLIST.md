## CLIENT 해야할 일

~~1. 주문내역 화면 생성~~<br>
~~2. 컵 고르는 곳에 '개인컵' 추가하기~~<br>
3. 옵션 선택화면 >> 정인이<br>
4. 가온누리, 남산학사, 그루터기, 두리터 메뉴 추가하기<br>
5. 자주 가는 매장 위로 올리기<br>
~~6. 바로 결제하기 넣기~~<br>
7. 쿠폰<br>
~~8. 자주 찾는 메뉴란 추가하기<br>~~
9. AsyncStorage로 header 랑 바로 동기화가 안됨...ㅠㅜㅠㅠ >> mobx으로 해결해보겠음<br>

## SUPERVISOR 해야할 일
```
```

### 옵션추가 메뉴 상세화 : 어떤 것이 옵션이 추가가되는 거고 아닌건지 명확해야함
### 디비 작업 : 아직까지 혼동이 있음 정확하게 설계하고 가야함
#### [ 가게별 디비, 공통 디비, 사용자 기록용 디비 ]
##### DB는 항상 autoKey와 주문정보가 같이 올라가야함
```
    autoKey
        ㄴ 주문정보
```
##### 1. 공통DB / 가게DB 에서 [ 주문정보 - orderState ] 변경시 'ready'가 되면 사용자 어플리케이션에서 알림이 울리도록 설정
##### 2-1. 1안은 주문정보를 orderState 값이 사용자 입장에서는 'ready'가 아닌 'request'만 장바구니 상세보기에서 불러와야함
##### 2-2. 2안은 주문정보를 orderState 값이 사용자 입장에서는 주문이 완료되면 해당 정보를 공통DB에서 지우는 것. >> 이럴 경우 장바구니에는 현재 존재하는 DB만 불러오면됨

```
    ( >> 여기는 보류
    - 가게DB
        ㄴ 가온누리
        ㄴ 남산학사
        ㄴ 혜화
        ㄴ 그루터기
        ㄴ 두리터
    )
    - 공통DB / 가게DB가 될 것임
        ㄴ 가온누리
        ㄴ 남산학사
        ㄴ 혜화
            ㄴ 오늘날짜(2020_09_02)
                ㄴ 사용자 phoneNumber
                    ㄴ autoKey
                        ㄴ 주문정보
                    ㄴ autoKey
                        ㄴ 주문정보
        ㄴ 그루터기
        ㄴ 두리터
    - 사용자 기록DB
        ㄴ 사용자 uid
            ㄴ 오늘날짜(2020_09_02)
                ㄴ autoKey
                    ㄴ 주문정보
```
### 장바구니 동기화
### 쿠폰기능 : 
#### 관리자에서는 사용자 번호로 추가로 쿠폰을 넣어줄 수 있음
#### 사용자는 사용자권한으로 쿠폰에 관여할 수 없음 (기록용) >> 선물용 후에 추가
