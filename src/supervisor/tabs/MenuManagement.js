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
import database from '@react-native-firebase/database';

export default class MenuManagement extends React.Component {

    _menuDatabse;

    constructor(props) {
        super(props);

        this.state = {
            drinkMenu: [],
            dessertMenu: [],
            currentItem : null,
            modalVisible : false
        }

        this._menuDatabse = database().ref('menu/' + this.props.shopname);
    }

    componentDidMount() {
        this._fetchData();
    }

    _setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    _setCurrentItem = item => {
        this.setState({ currentItem : item });
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
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={modalItem.modalBackground}>
                        <View style={modalItem.modalSubBackground}>
                            
                            <TouchableOpacity
                                style={modalItem.modalButton}
                                onPress={() => this._setModalVisible(!this.state.modalVisible)}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>닫기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
                                        ({ item }) => {
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
                                                                    onPress={() => this._setCurrentItem(item.menu[index])}
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
                            {/* dessert column */}
                            <>
                                <FlatList
                                    data={this.state.dessertMenu}
                                    keyExtractor={(item, index) => item.key}
                                    numColumns={2}
                                    renderItem={
                                        ({ item }) => {
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
                                                                    onPress={() => this._setCurrentItem(item.menu[index])}
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