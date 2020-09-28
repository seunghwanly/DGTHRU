import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Modal,
    FlatList
} from 'react-native';
import { menuManage, modalItem } from './styles'
import MenuModal from './MenuModal';
import database from '@react-native-firebase/database';

export default class MenuManagement extends React.Component {

    _menuDatabse;

    constructor(props) {
        super(props);

        this.state = {
            drinkMenu: [],
            dessertMenu: [],
            currentItem : null,
            currentType : 'drink',
            currentCategory : null,
            currentCategoryIndex : 0,
            modalVisible : false
        }

        this._menuDatabse = database().ref('menu/' + this.props.shopname);
    }

    componentDidMount() {
        this._fetchData();
    }
    
    shouldComponentUpdate(nextState) {
        return nextState.currentItem !== this.state.currentItem;
    }

    _setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    _setCurrentItem = (item, group, index, type) => {
        this.setState({ 
            currentItem : item, 
            currentCategory : group,
            currentCategoryIndex : index,
            currentType : type
        });
        this._setModalVisible(true);
    }

    _fetchData = () => {
        this._menuDatabse
            .once('value', snapshot => {
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


    render() {

        return (
            <View style={menuManage.mainBackground} >
                <MenuModal 
                    data={this.state.currentItem}
                    category={this.state.currentCategory}
                    categoryIndex={this.state.currentCategoryIndex}
                    categoryType={this.state.currentType}
                    shopname={this.props.shopname}
                    modalVisible={this.state.modalVisible}
                    onPress={() => this._setModalVisible(!this.state.modalVisible)}
                />
                <ScrollView>
                    <KeyboardAvoidingView
                        keyboardVerticalOffset={30}
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                        >
                        {/* search bar */}
                        <View style={menuManage.searchBar}>
                            <TextInput
                                placeholder='검색어를 입력해주세요...'
                            />
                            <Text>ICON</Text>
                        </View>
                        {/* Wrapper ROWS */}
                        <View style={menuManage.mainWrapper}>
                            <>
                                {/* drink column */}
                                <FlatList
                                    data={this.state.drinkMenu}
                                    keyExtractor={(item, index) => item.key}
                                    numColumns={3}
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
                                                                <TouchableOpacity style={menuManage.categoryFlatlistItems}
                                                                    onPress={() => this._setCurrentItem(subItem, categoryMenu.category_name, categoryIndex, 'categories_drink')}
                                                                >
                                                                    <Text style={menuManage.categoryFlatlistItemsTitle}>{subItem.name}</Text>
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
                                    numColumns={2}
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
                                                                <TouchableOpacity style={menuManage.categoryFlatlistItems}
                                                                    onPress={() => this._setCurrentItem(item.menu[index], item.category_name, categoryIndex, 'categories_bakery')}
                                                                >
                                                                    <Text style={menuManage.categoryFlatlistItemsTitle}>{item.menu[index].name}</Text>
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
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }
}