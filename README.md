# DGTHRU

   https://reactnative.dev/docs/environment-setup

   아마 dependencies 에 있는그대로 받아지면 추가로 해야할거 별로 없을 거라 믿어

## 임시 UI/UX

   https://ovenapp.io/view/NDd5y85Wg7f95q5oooRO6TVSpcmyzxHo/rm92i

## 일단 mac 기준

    $ npm install / $ yarn install

## [ 화면 전환 이동해주는 거 : navigation ]
    $ npm install @react-navigation/native
    $ npm install @react-navigation/stack

## [ navigation iOS랑 연동해주기 ]
    $ cd ios
    $ pod install

## [ enable screen error ]
    $ npm install --save react-native-screens

## 그 외 추가한 것
     PATH : android/app/build.gradle
     
## 0811 추가한 것
    
    파이어베이스
    $ npm install --save @react-native-firebase/app
    
    Jetify(mac에서 안드로이드 돌릴때)
    $ npm install —save-dev jetifier

## dependencies

    "dependencies": {
     "@react-native-community/masked-view": "^0.1.10",
     "@react-navigation/native": "^5.7.3",
     "@react-navigation/native-stack": "^5.0.5",
     "@react-navigation/stack": "^5.9.0",
     "react": "16.13.1",
     "react-native": "0.63.2",
     "react-native-gesture-handler": "^1.7.0",
     "react-native-reanimated": "^1.11.0",
     "react-native-safe-area-context": "^3.1.4",
     "react-native-screens": "^2.10.1"
    },

### //20200811 추가됨 
    implementation 'androidx.appcompat:appcompat:1.1.0-rc01'
    implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0-alpha02'

