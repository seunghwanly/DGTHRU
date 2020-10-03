import React, { useState, useEffect, useCallback } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ScrollView,
    KeyboardAvoidingView,
    Pressable,
    Image
} from 'react-native';
import { modalItem, menuManage } from '../styles';
import database from '@react-native-firebase/database';

const updateDatabase = async (name, inputJSON, ref) => {

    var isRightRef = false;

    var newName = inputJSON.name.changed ? inputJSON.name.now : inputJSON.name.prev;
    var newCost = inputJSON.cost.changed ? inputJSON.cost.now : inputJSON.cost.prev;
    var newSoldOut = inputJSON.sold_out.changed ?
        inputJSON.sold_out.now === '품절' ? true : false
        :
        inputJSON.sold_out.prev === '품절' ? true : false;

    await database()
        .ref(ref)
        .once('value', snapshot => {
            if (snapshot.val().name === name)
                isRightRef = true;
        }).then(() => {
            if (isRightRef) {

                database().ref(ref).update({
                    name: newName,
                    cost: newCost,
                    sold_out: newSoldOut
                }).then(() => console.log('Updated Menu'));
            }
        });
}

export default MenuModal = (props) => {

    const {
        data,
        dataIndex,
        categoryIndex,
        categoryType,
        shopname,
        modalVisible,
        onPress,
        isAddMenu
    } = props;



    if (data !== null) {

        //name
        const [name, setName] = useState(null);
        const [editName, setEditName] = useState(false);
        //cost
        const [cost, setCost] = useState(null);
        const [editCost, setEditCost] = useState(false);
        //sold out
        const [soldOut, setSoldOut] = useState(null);
        const [editSoldOut, setEditSoldOut] = useState(false);


        var forUpdate = {
            "name": {
                "prev": data.name,
                "now": name,
                "changed": false
            },
            "cost": {
                "prev": data.cost,
                "now": cost,
                "changed": false
            },
            "sold_out": {
                "prev": data.sold_out,
                "now": soldOut,
                "changed": false
            }
        };

        const updateRef = 'menu/' + shopname + '/' + categoryType + '/' + categoryIndex + '/menu/' + dataIndex;

        console.log('> ref : ' + updateRef);

        const checkUpdate = () => {

            if (forUpdate.name.now !== forUpdate.name.prev && forUpdate.name.now !== null)
                forUpdate.name.changed = true;
            if (forUpdate.cost.now !== forUpdate.cost.prev && forUpdate.cost.now !== null)
                forUpdate.cost.changed = true;
            if (forUpdate.sold_out.now !== forUpdate.sold_out.prev && forUpdate.sold_out.now !== null)
                forUpdate.sold_out.changed = true;

            updateDatabase(data.name, forUpdate, updateRef);
        }

        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
            >
                <ScrollView contentContainerStyle={modalItem.modalBackground}>
                    <KeyboardAvoidingView style={modalItem.modalSubBackground}
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                    >

                        <View style={
                            {
                                margin: 5,
                                padding: 10,
                            }
                        }>
                            <View style={modalItem.modalSubTitleView}>
                                <Text style={modalItem.modalSubTitleText}>내용</Text>
                                <Text style={[modalItem.modalSubTitleText, { marginHorizontal: 5, color: '#eaaf9d' }]}>수정</Text>
                                <Text style={modalItem.modalSubTitleText}>하기</Text>
                            </View>

                            <View style={modalItem.modalSubItemWrapper}>
                                <Text style={[modalItem.modalSubItemDescText, { width: 60 }]}>이름 : </Text>
                                {
                                    !editName ?
                                        <>
                                            <Text style={modalItem.modalSubItemDescText}>
                                                {
                                                    forUpdate.name.now === null ? forUpdate.name.prev : forUpdate.name.now
                                                }
                                            </Text>
                                            <TouchableOpacity style={modalItem.modalSubUtemDescBtn}
                                                onPress={() => setEditName(true)}
                                            >
                                                <Text style={modalItem.modalSubUtemDescBtnText}>수정하기</Text>
                                            </TouchableOpacity>
                                        </>
                                        :
                                        <>
                                            <TextInput
                                                placeholder='이름을 입력해주세요.'
                                                onChangeText={(text) => setName(text)}
                                                returnKeyType='done'
                                                style={modalItem.modalSubItemDescText}
                                            />
                                            <TouchableOpacity style={[modalItem.modalSubUtemDescBtn, { backgroundColor: 'royalblue' }]}
                                                onPress={() => setEditName(false)}
                                            >
                                                <Text style={modalItem.modalSubUtemDescBtnText}>저장하기</Text>
                                            </TouchableOpacity>
                                        </>
                                }
                            </View>
                            <View style={modalItem.modalSubItemWrapper}>
                                <Text style={[modalItem.modalSubItemDescText, { width: 60 }]}>가격 : </Text>
                                {
                                    !editCost ?
                                        <>
                                            <Text style={modalItem.modalSubItemDescText}>
                                                {
                                                    forUpdate.cost.now === null ? forUpdate.cost.prev : forUpdate.cost.now
                                                }
                                            </Text>
                                            <TouchableOpacity style={modalItem.modalSubUtemDescBtn}
                                                onPress={() => setEditCost(true)}
                                            >
                                                <Text style={modalItem.modalSubUtemDescBtnText}>수정하기</Text>
                                            </TouchableOpacity>
                                        </>
                                        :
                                        <>
                                            <TextInput
                                                placeholder='가격을 입력해주세요.(숫자만)'
                                                onChangeText={(text) => setCost(Number(text))}
                                                keyboardType='numeric'
                                                returnKeyType='done'
                                                style={modalItem.modalSubItemDescText}
                                            />
                                            <TouchableOpacity style={[modalItem.modalSubUtemDescBtn, { backgroundColor: 'royalblue' }]}
                                                onPress={() => setEditCost(false)}
                                            >
                                                <Text style={modalItem.modalSubUtemDescBtnText}>저장하기</Text>
                                            </TouchableOpacity>
                                        </>
                                }
                            </View>
                            <View style={modalItem.modalSubItemWrapper}>
                                <Text style={[modalItem.modalSubItemDescText, { width: 60 }]}>품절여부 : </Text>
                                {
                                    !editSoldOut ?
                                        <>
                                            <Text style={modalItem.modalSubItemDescText}>
                                                {
                                                    forUpdate.sold_out.now === null ?
                                                        !forUpdate.sold_out.prev ?
                                                            '판매중' : '품절'
                                                        :
                                                        !forUpdate.sold_out.now ?
                                                            '판매중' : '품절'
                                                }</Text>
                                            <TouchableOpacity style={modalItem.modalSubUtemDescBtn}
                                                onPress={() => setEditSoldOut(true)}
                                            >
                                                <Text style={modalItem.modalSubUtemDescBtnText}>수정하기</Text>
                                            </TouchableOpacity>
                                        </>
                                        :
                                        <>
                                            <FlatList
                                                data={['판매중', '품절']}
                                                keyExtractor={item => item.key}
                                                style={{ maxWidth: 200 }}
                                                horizontal={true}
                                                scrollEnabled={false}
                                                renderItem={({ item, index }) => {
                                                    const backgroundColor = item.toString()
                                                        === soldOut ?
                                                        '#EEAF9D' : '#F2F2F2';

                                                    const color = item.toString()
                                                        === soldOut ?
                                                        'white' : 'black';
                                                    return (
                                                        <TouchableOpacity
                                                            style={[modalItem.flatlistItemBtn, { backgroundColor }]}
                                                            onPress={() => setSoldOut(item)}
                                                        >
                                                            <Text style={[{ fontSize: 12, textAlign: 'center' }, color]}>{item}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                }}
                                            />
                                            <TouchableOpacity style={[modalItem.modalSubUtemDescBtn, { backgroundColor: 'royalblue' }]}
                                                onPress={() => setEditSoldOut(false)}
                                            >
                                                <Text style={modalItem.modalSubUtemDescBtnText}>저장하기</Text>
                                            </TouchableOpacity>
                                        </>
                                }
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', width: '50%', marginTop: 50 }}>
                                <TouchableOpacity
                                    style={modalItem.modalButton}
                                    onPress={onPress}
                                    onPressIn={() => [setEditName(false), setEditCost(false), setEditSoldOut(false)]}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, textAlign: 'center' }}>닫기</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[modalItem.modalButton, { backgroundColor: 'gold' }]}
                                    onPress={() => {
                                        !editName && !editCost && !editSoldOut ? checkUpdate() : alert('저장하기를 해주세요 !')
                                    }}
                                >
                                    <Text style={{ color: '#182335', fontWeight: 'bold', fontSize: 14, textAlign: 'center' }}>저장하기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </KeyboardAvoidingView>
                </ScrollView>
            </Modal>
        )
    } else {
        if (isAddMenu) {

            const [form, setForm] = useState({
                cost: 0,
                ice_available: false,
                ice_cost: 0,
                name: null,
                only_ice: false,
                option_available: {
                    shot: true,
                    syrup: true,
                    whipping: true
                },
                sold_out: false
            });

            const [iceAvailable, setIceAvailable] = useState(false);
            const [iceCost, setIceCost] = useState(0);
            const [hotCost, setHotCost] = useState(0);

            const isNumber = (input, isHot) => {

                var result = false;
               
                for (var i = 0; i < input.length; ++i) {
                    if(48 <= input[i].charCodeAt(0) && input[i].charCodeAt(0) <= 57) result = true;
                    else result = false;
                }

                if (result) {
                    if (isHot) setHotCost(Number(input));
                    else setIceCost(Number(input));
                }
                else alert('숫자만 입력해주세요 !');
            }

            const setSpecifyCost = () => {

            }

            return (
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    >
                    <ScrollView contentContainerStyle={modalItem.modalBackground}>
                        <KeyboardAvoidingView
                            style={modalItem.modalSubBackground}
                            behavior={Platform.OS == "ios" ? "padding" : "height"}
                        >
                            <View style={
                                {
                                    flexDirection:'row',
                                    alignItems:'center'
                                }
                            }>
                                <Text style={
                                    {
                                        fontSize:20,
                                        color:'#182335',
                                        fontWeight:'bold'
                                    }
                                }>새로운</Text>
                                <Text style={
                                    {
                                        fontSize:20,
                                        color:'#eaaf9d',
                                        fontWeight:'bold'
                                    }
                                }> 메뉴 </Text>
                                <Text style={
                                    {
                                        fontSize:20,
                                        color:'#182335',
                                        fontWeight:'bold'
                                    }
                                }>추가하기</Text>
                            </View>
                            <View style={
                                {
                                    marginVertical: 50
                                }
                            }>
                                <View style={modalItem.addMenu}>
                                    <Text style={modalItem.addMenuLeftText}>메뉴 이름 : </Text>
                                    <TextInput
                                        style={modalItem.addMenuRightText}
                                        placeholder='이름을 입력해주세요...'
                                        onChangeText={(text) => setForm({ ['name']: text })}
                                    />
                                </View>
                                <View style={modalItem.addMenu}>
                                    <Text style={modalItem.addMenuLeftText}>HOT 가격 : </Text>
                                    <TextInput
                                        style={modalItem.addMenuRightText}
                                        keyboardType='numeric'
                                        placeholder='HOT 가격을 입력해주세요...(숫자만)'
                                        onChangeText={(text) => isNumber(text, true)}
                                    />
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text>ICE 메뉴 가능 : 가격 입력</Text>
                                    <Pressable
                                        style={ ({ pressed }) => [
                                            menuManage.searchBarIcon,
                                            {
                                                backgroundColor : pressed
                                                ? '#ea5517'
                                                : 'transparent'
                                            }
                                        ]}
                                        onPress={() => setIceAvailable(!iceAvailable)}
                                        >
                                        <Text>✔︎</Text>
                                    </Pressable>
                                </View>
                                {
                                    iceAvailable ?
                                        <View style={modalItem.addMenu}>
                                            <Text style={modalItem.addMenuLeftText}>ICE 가격 : </Text>
                                            <TextInput
                                                style={modalItem.addMenuRightText}
                                                keyboardType='numeric'
                                                placeholder='ICED 가격을 입력해주세요...(숫자만)'
                                                onChangeText={(text) => isNumber(text, false)}
                                            />
                                        </View>
                                        :
                                        <></>
                                }
                            </View>
                            <View style={
                                {
                                    flexDirection:'row',
                                    marginVertical:10
                                }
                            }>
                                <TouchableOpacity
                                    style={modalItem.modalButton}
                                    onPress={onPress}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>닫기</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={modalItem.modalButton}
                                    onPress={() => console.log('>> info : \n' + form.name, hotCost, iceCost)}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>저장하기</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </Modal>
            )
        }
        else {
            return (
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={modalItem.modalBackground}>
                        <View style={modalItem.modalSubBackground}>
                            <Text>ERROR</Text>
                        </View>
                        <TouchableOpacity
                            style={modalItem.modalButton}
                            onPress={onPress}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )
        }
    }
}