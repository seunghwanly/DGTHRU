import * as React from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text, ScrollView, TouchableOpacity } from 'react-native';
import { TabView, TabBar} from 'react-native-tab-view';
import ImageLinker from '../../utils/ImageLinker';
import { menuStyles } from './styles';

import database from '@react-native-firebase/database';

const initialLayout = { width: Dimensions.get('window').width };


export default class TabViewExample extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            drinkData: [],
            index: 0,
            routes : []
        }
        console.log('> constructor');
    }

    _fetchData() {
        database()
            .ref('menu/' + this.props.route.params.shopInfo + '/categories_drink')
            .once('value', (snapshot) => {
                this.setState({ drinkData: snapshot.val() });
            }).then(() => this._setRoute());
    }

    _setRoute = () => {
        this.setState({ routes : [] });
        this.state.drinkData.map((item, index) => {
            this.setState({ routes : this.state.routes.concat({ key: index, title: item.category_name }) });
        })
    }

    _setIndex = (idx) => {
        this.setState({ index: idx });
    }

    shouldComponentUpdate(nextState) {
        console.log('> shouldComponentUpdate');
        return nextState !== this.state;
    }

    componentDidMount() {
        console.log('> componentDidMount');
        this._fetchData();
    }

    render() {
        console.log('> render');

        return (
            // <View />
            <TabView
                renderTabBar={(props) => (
                    <View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <TabBar
                                {...props}
                                indicatorStyle={{ backgroundColor: 'white' }}
                                style={{ backgroundColor: 'pink', height: 50, width:1000, justifyContent:'center'}}
                                getLabelText={({ route }) => (<Text style={{fontSize: 12, fontWeight:'bold', color:'white',paddingBottom:5, textAlign:'center' }}>{route.title}</Text>)}
                            />
                        </ScrollView>
                    </View>
                )}
                navigationState={{ index: this.state.index, routes: this.state.routes }}
                onIndexChange={this._setIndex}
                initialLayout={initialLayout}
                renderScene={({ route }) => {
                    switch (route.key) {
                        case 0:
                            return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.drinkData.filter((item) => { if(item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="drink" navigation={this.props.navigation}/> 
                        case 1:
                            return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.drinkData.filter((item) => { if(item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="drink" navigation={this.props.navigation}/> 
                        case 2:
                            return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.drinkData.filter((item) => { if(item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="drink" navigation={this.props.navigation}/> 
                        case 3:
                            return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.drinkData.filter((item) => { if(item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="drink" navigation={this.props.navigation}/> 
                        case 4:
                            return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.drinkData.filter((item) => { if(item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="drink" navigation={this.props.navigation}/> 
                        case 5:
                            return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.drinkData.filter((item) => { if(item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="drink" navigation={this.props.navigation}/> 
                        case 6:
                            return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.drinkData.filter((item) => { if(item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="drink" navigation={this.props.navigation}/> 
                        case 7:
                            return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.drinkData.filter((item) => { if(item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="drink" navigation={this.props.navigation}/> 
                        case 8:
                            return <MenuChildView categoryName={route.title} itemsString={JSON.stringify(this.state.drinkData.filter((item) => { if(item.category_name === route.title) return item.menu }))} shopInfo={this.props.route.params.shopInfo} type="drink" navigation={this.props.navigation}/> 
                        
                        default:
                            return null;
                    }
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        backgroundColor:'red'
    },
});

class MenuChildView extends React.Component {

    render() {

        const { categoryName, itemsString, shopInfo, type } = this.props;
        const items = JSON.parse(itemsString);

        return (
            <View style={menuStyles.background}>
                <View style={[menuStyles.sectionHeader, { height: 'auto', width: '90%', borderColor: 'lightgray' }]}>
                    <Text style={[menuStyles.subTitle, { color: 'black', fontSize: 16 }]}>{categoryName}</Text>
                </View>
                <ScrollView style={[menuStyles.sectionHeader, {
                    width: '90%',
                    height: '100%',
                    borderColor: 'lightgray'
                }]}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                >
                    <FlatList
                        data={items[0].menu}
                        renderItem={
                            ({ item }) => {
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
                        keyExtractor={(item, index) => item.key}
                        scrollEnabled={false}
                        contentContainerStyle={{ alignItems: 'flex-start', margin: 5 }}
                    />
                </ScrollView>
                <Text style={{ marginBottom: 25, color: 'gray', fontSize: 12 }}>길게 누르시면 '즐겨찾기' 등록이 가능합니다.</Text>
            </View>
        )
    }
}