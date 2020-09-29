import React, { useState, useEffect, useCallback } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import { modalItem } from './styles';
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
            if(snapshot.val().name === name)
                isRightRef = true;
        }).then(() => {
            if(isRightRef) {

                database().ref(ref).update({
                    name : newName,
                    cost : newCost,
                    sold_out : newSoldOut
                }).then(() => console.log('Updated Menu'));
            }
        })

}

export default MenuModal = (props) => {

    const {
        data,
        dataIndex,
        category,
        categoryIndex,
        categoryType,
        shopname,
        modalVisible,
        onPress
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
                "changed" : false
            },
            "cost": {
                "prev": data.cost,
                "now": cost,
                "changed" : false
            },
            "sold_out": {
                "prev": data.sold_out,
                "now": soldOut,
                "changed" : false
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
                            <View style={{ flexDirection: 'row', alignSelf: 'center', width: '50%', marginTop:50 }}>
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
                </View>
                <TouchableOpacity
                    style={modalItem.modalButton}
                    onPress={onPress}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>닫기</Text>
                </TouchableOpacity>
            </Modal>
        )
    }
}