import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ImageBackgroundBase,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {enableScreens} from 'react-native-screens';
import {myMenuStyle} from './styles';
import moment from 'moment';
enableScreens();

const shopData = [
  {
    id: 'main_outdoor',
    adminPhoneNumber: '+821033333333',
    title: '가온누리',
    location: '본관 야외 휴게장소',
  },
  {
    id: 'singong_1f',
    adminPhoneNumber: '+821022221111',
    title: '남산학사',
    location: '신공학관 1층',
  },
  {
    id: 'hyehwa_roof',
    adminPhoneNumber: '+821011112222',
    title: '혜화카페',
    location: '혜화관 옥상',
  },
  {
    id: 'economy_outdoor',
    adminPhoneNumber: '+821022222222',
    title: '그루터기',
    location: '경영관 야외',
  },
  {
    id: 'munhwa_1f',
    title: '카페두리터',
    adminPhoneNumber: '+821041282470',
    location: '학술문화관 지하1층',
  },
  {
    id: 'logout',
    title: '로그아웃',
    adminPhoneNumber: '+8200000000',
    location: '오늘 하루도 수고하셨어요 !',
  },
];

export default class MyMenuRoute extends React.Component {
  _adminReference;
  // function MyMenuRoute({ navigation, props  }) {
  // const [pastList, setpastList] = useState(props.pastList);
  constructor(props) {
    super(props);
    this.state = {
      pastList: this.props.pastList,
      todayList: [],
      totalAmount: 0,
      templist: [],
      dayTotalCost: 0,
      dayTotalOrder: 0,
      monthTotalCost: 0,
      dayHotMenu: null
    };

    this._adminReference = database().ref(
      'admin/' +
        shopData.find(
          (d) => d.adminPhoneNumber === auth().currentUser.phoneNumber,
        ).id,
    );
  }

  componentDidMount() {
    //today date info
    let todayDate = new Date();
    let todayDateString =
      todayDate.getFullYear() +
      '_' +
      (todayDate.getMonth() + 1) +
      '_' +
      todayDate.getDate();
    //get from database
    this._adminReference.on('value', (snapShot) => {
      var todayTotalCost = 0;
      var todayTotalOrder = 0;
      var thisMonthTotalCost = 0;
      var todayTotalList = [];

      snapShot.forEach((dateSnapShot) => {
        // count today total order / total cost
        if (todayDateString === dateSnapShot.key) {
          dateSnapShot.forEach((contentSnapShot) => {
            // only for today
            todayTotalCost += contentSnapShot.val().cost;
            todayTotalOrder += 1;
            
            todayTotalList.push(contentSnapShot.val().name);
          }); // dateSnapShot forEach
        }
        // only for this month
        if (
          dateSnapShot.key.substring(5, 7) ===
          (todayDate.getMonth() + 1).toString()
        ) {
          dateSnapShot.forEach((contentSnapShot) => {
            thisMonthTotalCost += contentSnapShot.val().cost;
          });
        }
      }); // snapShot forEach

      // what is the hottest menu : today
      var hottestList = [
          {
              name: '',
              count: 0
          }
      ];
      todayTotalList.forEach((item) => {
        // not in the list -> add
        if(hottestList.find((node) => node.name === item) === undefined) {
            //init
            if(hottestList.length === 1) {
                hottestList[0].name = item;
                hottestList[0].cost ++;
            }
            else { //add another one
                hottestList.push(
                    {
                        name: item,
                        count: 1
                    }
                );
            }
        }
        // in the list
        else {
            hottestList.find((node) => node.name === item).count++;
        }
      });
      //then sort with count
      hottestList.sort((A,B) => A.count - B.count);

      this.setState({
        dayTotalCost: todayTotalCost,
        dayTotalOrder: todayTotalOrder,
        monthTotalCost: thisMonthTotalCost,
        dayHotMenu: hottestList[0].name
      });
    }); //end : once
  }

  componentWillUnmount() {
    //database off
    this._adminReference.off();
  }

  _logOut() {
    auth()
      .signOut()
      .then(() => [console.log('User Signed Out !')])
      .catch(() => console.log('already signed out !'));
  }

  fetchData() {
    var templist = [];
    var tempTotal = 0;

    for (var i = 0; i < this.state.pastList.length; i++) {
      if (
        new moment(this.state.pastList[i].date, 'YYYY_MM_DD').format(
          'YYYY_MM_DD',
        ) == new moment('2020_10_02', 'YYYY_MM_DD').format('YYYY_MM_DD')
      ) {
        templist.push(this.state.pastList[i]);
        tempTotal += this.state.pastList[i].cost;
      }
    }
    this.state.todayList = templist;
    this.state.totalAmount = tempTotal;
    return templist.length;
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  render() {
    return (
      <>
        <View style={myMenuStyle.body}>
          <View style={myMenuStyle.contentArea}>
            <View style={myMenuStyle.contentArea_left}>
              <ImageLinker
                name={
                  shopData.find(
                    (d) =>
                      d.adminPhoneNumber === auth().currentUser.phoneNumber,
                  ).id
                }
                style={{
                  width: 200,
                  height: 200,
                  marginVertical: 20,
                  marginTop: 0,
                }}
              />
              <Text style={myMenuStyle.thickFont}>
                {
                  shopData.find(
                    (d) =>
                      d.adminPhoneNumber === auth().currentUser.phoneNumber,
                  ).title
                }
              </Text>
              <Text style={myMenuStyle.thinFont2}>
                Tel.{' '}
                {
                  shopData.find(
                    (d) =>
                      d.adminPhoneNumber === auth().currentUser.phoneNumber,
                  ).adminPhoneNumber
                }
              </Text>
              {/* <Text style = {myMenuStyle.thinFont2}>
                            
                          </Text> */}
            </View>
            <View style={myMenuStyle.contentArea_rightBody}>
              <View style={myMenuStyle.contentArea_right}>
                <Text style={myMenuStyle.thinFont}>오늘 주문된 총 건수는?</Text>

                <Text style={myMenuStyle.thickFont}>
                  {this.state.dayTotalOrder}건
                </Text>
              </View>
              <View style={myMenuStyle.contentArea_right}>
                <Text style={myMenuStyle.thinFont}>
                  오늘{' '}
                  {
                    shopData.find(
                      (d) =>
                        d.adminPhoneNumber === auth().currentUser.phoneNumber,
                    ).title
                  }
                  에서 주문된 총 금액은?
                </Text>
                <Text style={myMenuStyle.thickFont}>
                  {this.state.dayTotalCost.toLocaleString()}원
                </Text>
              </View>
            </View>

            <View style={myMenuStyle.contentArea_rightBody}>
              <View style={myMenuStyle.contentArea_right}>
                <Text style={myMenuStyle.thinFont}>오늘의 인기 메뉴는 ?</Text>

                <Text style={myMenuStyle.thickFont}>{this.state.dayHotMenu}</Text>
              </View>
              <View style={myMenuStyle.contentArea_right}>
                <Text style={myMenuStyle.thinFont}>
                  이번 달{' '}
                  {
                    shopData.find(
                      (d) =>
                        d.adminPhoneNumber === auth().currentUser.phoneNumber,
                    ).title
                  }
                  에서 주문된 총 금액은?
                </Text>
                <Text style={myMenuStyle.thickFont}>
                  {this.numberWithCommas(this.state.monthTotalCost)}원
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={myMenuStyle.footer}>
          <View style={myMenuStyle.logoutArea}>
            <TouchableOpacity
              onPress={this._logOut}
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageLinker
                name={'logout'}
                style={{
                  width: 50,
                  height: 50,
                  marginHorizontal: 20,
                }}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#182335',
                }}>
                로그아웃
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}
