# DGTHRU

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

