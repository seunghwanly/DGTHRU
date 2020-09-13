import * as React from 'react';
import { View, Dimensions, FlatList, Text, ScrollView, TouchableOpacity } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import ImageLinker from '../../utils/ImageLinker';
import { menuStyles } from './styles';
import Loading from '../payment/Loading';

import database from '@react-native-firebase/database';

const initialLayout = { width: Dimensions.get('window').width };


export default class TabViewExample extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            drinkData: [],
            bakeryData: [],
            drinkRoutes: [],
            bakeryRoutes: [],
            isDrinkMenu: true,
            isLoading: true
        }
        console.log('> constructor');
    }

    _fetchData() {

        database()
            .ref('menu/' + this.props.route.params.shopInfo + '/categories_drink')
            .once('value', (snapshot) => {
                this.setState({ drinkData: snapshot.val() });
            }).then(() => this._setRoute());

        database()
            .ref('menu/' + this.props.route.params.shopInfo + '/categories_bakery')
            .once('value', (snapshot) => {
                this.setState({ bakeryData: snapshot.val() });
            }).then(() => this._setRoute());

    }

    _setRoute = () => {
        this.setState({ drinkRoutes: [] });
        this.state.drinkData.map((item, index) => {
            this.setState({ drinkRoutes: this.state.drinkRoutes.concat({ key: index, title: item.category_name }) });
        })
        this.setState({ bakeryRoutes: [] });
        this.state.bakeryData.map((item, index) => {
            this.setState({ bakeryRoutes: this.state.bakeryRoutes.concat({ key: index, title: item.category_name }) });
        })
        // console.log('> _setRoute : ' + JSON.stringify(this.state.bakeryRoutes));
    }

    _setMenu = (change) => {
        this.setState({ isDrinkMenu: change });
        this.scrollView.scrollTo({ x: 0 });
    }

    _setIndex = (idx) => {
        if (this.state.isDrinkMenu === true) {
            this.scrollView.scrollTo({
                x: 500 * (idx / 8)
            });
        } else {
            this.scrollView.scrollTo({
                x: 200 * (idx / 4)
            })
        }
        this.setState({ index: idx });
    }

    componentDidMount = async () => {
        console.log('> componentDidMount');
        this._fetchData();
        setTimeout(() => { this.setState({ isLoading: false }) }, 1000);
    }

    shouldComponentUpdate(nextState) {
        console.log('> shouldComponentUpdate');
        return nextState !== this.state;
    }


    render() {
        // console.log('> render ' + this.state.isDrinkMenu, JSON.stringify(this.state.bakeryData));
        if (this.state.isLoading) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <>
                    <TabView
                        renderTabBar={(props) => (
                            <View style={{ backgroundColor:'#182335', paddingHorizontal:'5%' }}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    ref={ref => (this.scrollView = ref)}
                                >
                                    <TabBar
                                        {...props}
                                        indicatorStyle={{ 
                                            backgroundColor: '#EEAF9D',
                                            borderRadius:20,
                                            height:100,
                                        }}
                                        
                                        style={{ 
                                            marginTop:'10%',
                                            backgroundColor: 'transparent',
                                            height: 100, 
                                            width: Dimensions.get('window').width,
                                            justifyContent: 'center',
                                        }}
                                        getLabelText={({ route }) => (<Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white', paddingBottom: 5, textAlign: 'center' }}>{route.title}</Text>)}
                                        tabStyle={{ width: 90 }}
                                        scrollEnabled={true}
                                    />
                                </ScrollView>
                            </View>
                        )}
                        navigationState={
                            this.state.isDrinkMenu === true ?
                                { index: this.state.index, routes: this.state.drinkRoutes }
                                :
                                { index: this.state.index, routes: this.state.bakeryRoutes }
                        }
                        onIndexChange={this._setIndex}
                        initialLayout={initialLayout}
                        renderScene={({ route }) => {
                            if (this.state.isDrinkMenu === true) {
                                switch (route.key) {
                                    case 0:
                                        return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.drinkData.filter((item) => { if (item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="drink" navigation={this.props.navigation} />
                                    case 1:
                                        return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.drinkData.filter((item) => { if (item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="drink" navigation={this.props.navigation} />
                                    case 2:
                                        return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.drinkData.filter((item) => { if (item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="drink" navigation={this.props.navigation} />
                                    case 3:
                                        return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.drinkData.filter((item) => { if (item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="drink" navigation={this.props.navigation} />
                                    case 4:
                                        return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.drinkData.filter((item) => { if (item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="drink" navigation={this.props.navigation} />
                                    case 5:
                                        return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.drinkData.filter((item) => { if (item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="drink" navigation={this.props.navigation} />
                                    case 6:
                                        return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.drinkData.filter((item) => { if (item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="drink" navigation={this.props.navigation} />
                                    case 7:
                                        return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.drinkData.filter((item) => { if (item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="drink" navigation={this.props.navigation} />
                                    case 8:
                                        return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.drinkData.filter((item) => { if (item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="drink" navigation={this.props.navigation} />

                                    default:
                                        return null;
                                }   // switch
                            }   // if    
                            else {
                                switch (route.key) {
                                    case 0:
                                        return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.bakeryData.filter((item) => { if (item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="bakery" navigation={this.props.navigation} />
                                    case 1:
                                        return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.bakeryData.filter((item) => { if (item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="bakery" navigation={this.props.navigation} />
                                    case 2:
                                        return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.bakeryData.filter((item) => { if (item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="bakery" navigation={this.props.navigation} />
                                    case 3:
                                        return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.bakeryData.filter((item) => { if (item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="bakery" navigation={this.props.navigation} />
                                    default:
                                        return null;

                                }
                            }
                        }}
                    />
                    <TouchableOpacity
                        style={
                            {
                                width: 60,
                                height: 60,
                                right: '10%',
                                bottom: '12%',
                                position: 'absolute',
                                backgroundColor: '#EEAF9D',
                                borderRadius: 30,
                                justifyContent: 'center',
                                padding: 5,
                                shadowColor: "#333",
                                shadowOffset: {
                                    width: 1,
                                    height: 2
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 2,
                                elevation: 1
                            }
                        }
                        onPress={() => this._setMenu(!this.state.isDrinkMenu)}
                    >
                        {
                            this.state.isDrinkMenu === true ? <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>디저트{'\n'}메뉴가기</Text> : <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>음료{'\n'}메뉴가기</Text>
                        }
                    </TouchableOpacity>
                </>
            );
        }
    }
}

class MenuChildView extends React.Component {

    render() {

        const { categoryName, itemsString, shopInfo, type } = this.props;
        const items = JSON.parse(itemsString);

        return (
            <View style={menuStyles.background}>
                <View style={[menuStyles.sectionHeader, { height: 'auto'}]}>
                    <Text style={[menuStyles.subTitle, { color: 'black', fontSize: 16, paddingStart:5, paddingTop:5 }]}>{categoryName}</Text>
                </View>
                <ScrollView 
                    style={
                        {
                            width:'95%',
                            padding:10,
                            backgroundColor:'#fff'
                        }
                        }
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                >
                    <FlatList
                        data={items[0].menu}
                        renderItem={
                            ({ item }) => {
                                console.log(item.name)
                                if (item.sold_out !== true) {

                                    return (
                                        <TouchableOpacity
                                            style={{ alignItems: 'center', flexDirection: 'row', }}
                                            onPress={() => this.props.navigation.navigate('SelectMenu',
                                                {
                                                    item: item,
                                                    shopInfo: shopInfo,
                                                    type: type,
                                                    categoryName: categoryName
                                                }
                                            )}
                                            onLongPress={() => pushFavorite(shopInfo, item)}
                                        >
                                            <ImageLinker name={item.name} style={menuStyles.subRadiusIcon} />
                                            <View style={{ flexDirection: 'column', marginStart: 10 }}>
                                                <Text style={menuStyles.subRadiusText}>{item.name}</Text>
                                                <Text style={[menuStyles.subRadiusText, { color: 'grey', fontSize: 13 }]}>{item.cost}원</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                                else {
                                    return (
                                        <View style={menuStyles.subRadiusIconSoldOut} >
                                            <Text style={{ color: 'white', fontWeight: 'bold' }}>IMG</Text>
                                            <Text style={menuStyles.subRadiusText}>{item.name}</Text>
                                        </View>
                                    )
                                }
                            }
                        }
                        keyExtractor={item => item.name}
                        scrollEnabled={false}
                        contentContainerStyle={{ alignItems: 'flex-start', margin: 5 }}
                    />
                </ScrollView>
                <View style={{ backgroundColor: '#fff', width:'95%', alignItems:'center' }}>
                    <Text style={{ marginBottom: 25, color: 'gray', fontSize: 12 }}>길게 누르시면 '즐겨찾기' 등록이 가능합니다.</Text>
                </View>
            </View>
        )
    }
}
