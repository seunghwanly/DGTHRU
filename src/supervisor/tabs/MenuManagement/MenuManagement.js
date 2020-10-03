import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Pressable,
    Image,
    FlatList
} from 'react-native';
import { menuManage, modalItem } from '../styles'
import MenuModal from './MenuModal';
import database from '@react-native-firebase/database';

export default class MenuManagement extends React.Component {

    _menuDatabse;

    constructor(props) {
        super(props);

        this.state = {
            drinkMenu: [],
            dessertMenu: [],
            currentItem: null,
            currentItemIndex: 0,
            currentType: 'drink',
            currentCategory: null,
            currentCategoryIndex: 0,
            modalVisible: false,
            searchItem: null,
            searchResult: null,
            isAddMenu : false
        }

        this._menuDatabse = database().ref('menu/' + this.props.shopname);
    }

    componentDidMount() {
        this._fetchData();
    }

    shouldComponentUpdate(nextState) {
        return nextState !== this.state;
    }

    _setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    _setAddMenu = (add, visible) => {
        this.setState({ 
            isAddMenu : add,
            modalVisible : visible
        });
    }

    _setCurrentItem = (item, itemIdx, group, index, type) => {
        this.setState({
            currentItem: item,
            currentItemIndex: itemIdx,
            currentCategory: group,
            currentCategoryIndex: index,
            currentType: type
        });
        this._setModalVisible(true);
    }

    _fetchData = () => {
        this._menuDatabse
            .on('value', snapshot => {
                var drinkData = [];
                var dessertData = [];
                snapshot.forEach(twoTypeData => {

                    if (twoTypeData.key === 'categories_drink')    //drink data
                    {
                        twoTypeData.forEach(drinkItems => {
                            drinkData.push(drinkItems.val());
                        })
                    }
                    else if (twoTypeData.key === 'categories_bakery') // dessert data
                    {
                        twoTypeData.forEach(dessertItems => {
                            dessertData.push(dessertItems.val());
                        })
                    }

                });
                this.setState({
                    drinkMenu: drinkData,
                    dessertMenu: dessertData
                });
            });
    }

    _searchItem = (name) => {
        if (name === null)
            alert('검색어를 입력해주세요 !');
        else {
            var isFound = false;
            var categoryName = null;
            var vertexIndex = 0;

            this.state.drinkMenu.forEach((category, index) => {
                if (category.hasOwnProperty('menu')) {
                    category.menu.forEach((item, i) => {
                        if (item.name === name) {
                            categoryName = category.category_name;
                            vertexIndex = index / 4;
                            isFound = true;
                        }
                    })
                }
            });

            this.state.dessertMenu.forEach((category, index) => {
                if (category.hasOwnProperty('menu')) {
                    category.menu.forEach((item, i) => {
                        if (item.name === name){
                            categoryName = category.category_name;
                            vertexIndex = index / 4;
                            isFound = true;
                        }
                    })
                }
            });

            if(isFound) {
                alert(name + ' 를\n '+ categoryName +' 에서 찾았습니다 !');
                this.scrollView.scrollTo({y:vertexIndex * 100});
                this.setState({ searchResult : name });
            }
            else
                alert('찾을 수 없습니다 :(');
                
        }
    }

    _resetSearchResult = () => {
        this.setState({ searchResult : null, searchItem : null });
        this.scrollView.scrollTo({y:0});
    }

    componentWillUnmount() {
        this._menuDatabse.off();
    }


    render() {

        return (
            <View style={menuManage.mainBackground} >
                <MenuModal
                    data={this.state.currentItem}
                    dataIndex={this.state.currentItemIndex}
                    categoryIndex={this.state.currentCategoryIndex}
                    categoryType={this.state.currentType}
                    shopname={this.props.shopname}
                    modalVisible={this.state.modalVisible}
                    onPress={() => this._setModalVisible(!this.state.modalVisible)}
                    isAddMenu={this.state.isAddMenu}
                />

                <KeyboardAvoidingView
                    keyboardVerticalOffset={30}
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={menuManage.keyboardAvoidingView}
                    >
                    <View style={{ width:'15%', paddingStart:'2%' }}>
                        <Pressable 
                            style={ ({ pressed }) => [
                                menuManage.resetSearch,
                                {
                                    backgroundColor : pressed
                                    ? '#eaa517'
                                    : '#eaaf9d'
                                }
                            ]}
                            onPress={() => this._setAddMenu(true, true)}
                            >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>새로운 메뉴추가</Text>
                        </Pressable>
                    </View>
                    
                    <View style={
                        {
                            alignItems:'flex-end',
                            width:'60%'
                        }
                    }>
                        <TouchableOpacity style={menuManage.resetSearch}
                            onPress={() => this._resetSearchResult()}
                            >
                            <Text style={{ color : '#fff', fontWeight:'bold' }}>검색결과 초기화</Text>
                        </TouchableOpacity>
                    </View>
                    {/* search bar */}
                    <View style={menuManage.searchBar}>
                        <TextInput
                            style={menuManage.searchBarTextInput}
                            onChangeText={(text) => this.setState({ searchItem: text })}
                            value={this.state.searchItem}
                            returnKeyType='search'
                            placeholder='검색어를 입력해주세요...'
                        />
                        <TouchableOpacity
                            onPress={() => this._searchItem(this.state.searchItem)}
                        >
                            <Image source={require('../../../../image/search-outline.png')}
                                capInsets={{ left: 5, right: 5, bottom: 5, top: 5 }}
                                style={menuManage.searchBarIcon}
                                resizeMode='stretch'
                            />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>


                <ScrollView 
                    ref={ref => (this.scrollView = ref)}
                    >
                    {/* Wrapper ROWS */}
                    <View style={menuManage.mainWrapper}>
                        <>
                            {/* drink column */}
                            <FlatList
                                data={this.state.drinkMenu}
                                keyExtractor={(item, index) => item.key}
                                numColumns={4}
                                renderItem={
                                    ({ item, index }) => {
                                        var categoryIndex = index;
                                        var categoryMenu = item;
                                        return (
                                            <View style={menuManage.categoryWrapper}>
                                                <Text style={menuManage.categoryWrapperTitle}>{categoryMenu.category_name}</Text>
                                                <FlatList
                                                    data={categoryMenu.menu}
                                                    style={menuManage.categoryFlatList}
                                                    keyExtractor={(item, index) => item.key}
                                                    numColumns={3}
                                                    renderItem={({ item, index }) => {
                                                        var subItem = item;
                                                        var subIndex = index;

                                                        return (
                                                            <TouchableOpacity style={[menuManage.categoryFlatlistItems,{
                                                                backgroundColor : subItem.name === this.state.searchResult ? '#eaaf9d' : '#eee'
                                                            }]}
                                                                onPress={() => this._setCurrentItem(subItem, subIndex, categoryMenu.category_name, categoryIndex, 'categories_drink')}
                                                            >
                                                                <Text style={[menuManage.categoryFlatlistItemsTitle,{
                                                                    color : subItem.name === this.state.searchResult ? '#fff' : '#000'
                                                                }]}>{subItem.name}</Text>
                                                            </TouchableOpacity>
                                                        )
                                                    }}
                                                />
                                            </View>
                                        )
                                    }
                                }
                            />
                        </>
                        {/* dessert column */}
                        <>
                            <FlatList
                                data={this.state.dessertMenu}
                                keyExtractor={(item, index) => item.key}
                                numColumns={1}
                                renderItem={
                                    ({ item, index }) => {
                                        var categoryIndex = index;
                                        return (
                                            <View style={menuManage.categoryWrapper}>
                                                <Text style={menuManage.categoryWrapperTitle}>{item.category_name}</Text>
                                                <FlatList
                                                    data={item.menu}
                                                    style={menuManage.categoryFlatList}
                                                    keyExtractor={(item, index) => item.key}
                                                    numColumns={3}
                                                    renderItem={({ info, index }) => {
                                                        return (
                                                            <TouchableOpacity style={[menuManage.categoryFlatlistItems,{
                                                                backgroundColor : item.menu[index].name === this.state.searchResult ? '#eaaf9d' : '#eee'
                                                            }]}
                                                                onPress={() => this._setCurrentItem(item.menu[index], item.category_name, categoryIndex, 'categories_bakery')}
                                                            >
                                                                <Text style={[menuManage.categoryFlatlistItemsTitle,{
                                                                    color : item.menu[index].name === this.state.searchResult ? '#fff' : '#000'
                                                                }]}>{item.menu[index].name}</Text>
                                                            </TouchableOpacity>
                                                        )
                                                    }}
                                                />
                                            </View>
                                        )
                                    }
                                }
                            />
                        </>
                    </View>
                </ScrollView>
            </View>
        );
    }
}