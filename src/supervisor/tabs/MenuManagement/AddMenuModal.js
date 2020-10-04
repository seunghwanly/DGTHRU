import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
} from 'react-native';
import { modalItem } from '../styles';
import CheckBox from '@react-native-community/checkbox';
import { MinusButton, PlusButton } from '../../../client/menu/components/CountButton';
import database from '@react-native-firebase/database';

const addMenu = async (shopname, category, route, newCategoryname, form) => {

    const categoriesX = category === '음료' ? 'categories_drink' : 'categories_bakery';

    await database()
        .ref('menu/' + shopname + '/' + categoriesX)
        .once('value', snapshot => {

            if (route === '+') { // 새로운 카테고리
                const newIndex = snapshot.val().length;
                database()
                    .ref('menu/' + shopname + '/' + categoriesX + '/' + newIndex)
                    .update({
                        category_name: newCategoryname,
                        menu: null
                    })
                    .then(() => {
                        database()
                            .ref('menu/' + shopname + '/' + categoriesX + '/' + newIndex + '/menu/0')
                            .update(form)
                            .then(() => console.log("Updated !"));
                    })

            }
            else {  // 기존 카테고리
                snapshot.forEach((childSnapshot, childSnapshotIndex) => {

                    if (childSnapshot.val().category_name === route) { // found category
                        // console.log('>> length : ' + childSnapshot.val().menu.length);

                        database()
                            .ref('menu/' + shopname + '/' + categoriesX + '/' + childSnapshotIndex + '/menu/' + childSnapshot.val().menu.length)
                            .update(form)
                            .then(() => console.log("Updated !"));
                    }
                })
            }

        });
}

export default AddMenuModal = (props) => {

    const {
        isAddMenu,
        onPress,
        modalVisible,
        shopname,
        drinkData,
        bakeryData
    } = props;

    if (isAddMenu) {

        let form = {
            name: null,
            cost: 0,
            ice_available: false,
            ice_cost: 0,
            only_ice: false,
            option_available: {
                shot: true,
                syrup: true,
                whipping: true
            },
            sold_out: false
        };

        const [newCategoryname, setNewCategoryname] = useState(null);
        const [category, setCategory] = useState(null);
        const [route, setRoute] = useState(null);
        const [name, setName] = useState(null);
        //check box
        const [iceAvailable, setIceAvailable] = useState(false);
        const [onlyHot, setOnlyHot] = useState(false);
        const [bothAvailable, setBothAvailable] = useState(false);
        const [iceCost, setIceCost] = useState(null);
        const [hotCost, setHotCost] = useState(null);
        const [shot, setShot] = useState(true);
        const [syrup, setSyrup] = useState(true);
        const [whipping, setWhipping] = useState(true);

        // text input
        const [subMenuAvailable, setSubMenuAvailable] = useState(false);
        const [subMenu, setSubMenu] = useState([]);
        const [inputData, setInputData] = useState([]);


        const cleanUp = () => {
            setSubMenu([]);
            setInputData([]);
        }

        //function to add TextInput dynamically
        const addTextInput = (index) => {
            setSubMenu(subMenu.concat(
                <TextInput
                    style={modalItem.addSubMenuTextInput}
                    placeholder='세부메뉴를 입력해주세요.'
                    onChangeText={(text) => addValues(text, index)}
                />
            ));
        }

        //function to remove TextInput dynamically
        const removeTextInput = () => {
            setSubMenu(subMenu.filter((value, index) => index !== (subMenu.length - 1)));
            setInputData(inputData.filter((value, index) => index !== (subMenu.length - 1)));
        }

        //function to add text from TextInputs into single array
        const addValues = (text, index) => {
            let dataArray = inputData;
            let checkBool = false;
            if (dataArray.length !== 0) {
                dataArray.forEach(element => {
                    if (element.index === index) {
                        element.text = text;
                        checkBool = true;
                    }
                });
            }
            if (checkBool) {
                setInputData(dataArray);
            }
            else {
                dataArray.push({'index' : index , 'text' : text});
                setInputData(dataArray);
            }
        }

        const isNumber = (input, isHot) => {

            var result = false;

            for (var i = 0; i < input.length; ++i) {
                if (48 <= input[i].charCodeAt(0) && input[i].charCodeAt(0) <= 57) result = true;
                else result = false;
            }

            if (result) {
                if (isHot) setHotCost(Number(input));
                else setIceCost(Number(input));
            }
            else alert('숫자만 입력해주세요 !');
        }

        const autoSetForm = () => {

            // name
            if (name !== null)
                form.name = name;
            else alert('이름을 입력해주세요 :(');

            // ice hot
            if (bothAvailable || (onlyHot === true && iceAvailable === true)) { // 둘다 가능
                if (hotCost !== null && iceCost !== null) {
                    form.cost = hotCost;
                    form.ice_available = true;
                    form.ice_cost = Math.abs(iceCost - hotCost);
                    form.only_ice = false;
                } else {
                    alert('가격정보를 모두 입력해주세요 !');
                }
            }
            else {
                if (onlyHot === true && iceAvailable === false) {   // only hot
                    if (hotCost !== null) {
                        form.cost = hotCost;
                        form.ice_available = false;
                        form.ice_cost = 0;
                        form.only_ice = false;
                    }
                    else alert('금액을 입력해주세요 !');
                }
                else if (onlyHot === false && iceAvailable === true) { // only ice
                    if (iceCost !== null) {
                        form.cost = iceCost;
                        form.ice_available = true;
                        form.ice_cost = 0;
                        form.only_ice = true;
                    }
                    else alert('금액을 입력해주세요 !');
                }
                else if (onlyHot === false && iceAvailable === false)
                    alert('HOT / ICE 선택이 안됐네요 :(');
            }

            // option
            form.option_available.shot = shot;
            form.option_available.syrup = syrup;
            form.option_available.whipping = whipping;

            console.log('> submenu\t' + JSON.stringify(inputData));

            //return addMenu(shopname, category, route, newCategoryname, form);
        }

        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
            >
                <View style={modalItem.modalBackground}>
                    <View style={modalItem.modalSubBackground}>
                        <View style={
                            {
                                flexDirection: 'row',
                                alignItems: 'center'
                            }
                        }>
                            <Text style={
                                {
                                    fontSize: 20,
                                    color: '#182335',
                                    fontWeight: 'bold'
                                }
                            }>새로운</Text>
                            <Text style={
                                {
                                    fontSize: 20,
                                    color: '#eaaf9d',
                                    fontWeight: 'bold'
                                }
                            }> 메뉴 </Text>
                            <Text style={
                                {
                                    fontSize: 20,
                                    color: '#182335',
                                    fontWeight: 'bold'
                                }
                            }>추가하기</Text>
                        </View>
                        <View style={
                            {
                                marginVertical: 20,
                                alignItems: 'center'
                            }
                        }>
                            <View style={modalItem.addMenu}>
                                <FlatList
                                    data={['음료', '디저트']}
                                    keyExtractor={item => item.key}
                                    horizontal={true}
                                    scrollEnabled={false}
                                    contentContainerStyle={
                                        {
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginVertical: 10,
                                            width: '100%'
                                        }
                                    }
                                    renderItem={
                                        ({ item }) => {
                                            const backgroundColor = item.toString()
                                                === category ? '#eaaf9d' : '#f2f2f2';
                                            const color = item.toString()
                                                === category ? '#fff' : '#000'
                                            return (
                                                <TouchableOpacity style={
                                                    {
                                                        borderRadius: 15,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        paddingVertical: 20,
                                                        paddingHorizontal: 30,
                                                        marginHorizontal: 10,
                                                        backgroundColor,
                                                    }
                                                }
                                                    onPress={() => setCategory(item)}
                                                >
                                                    <Text style={{ color, fontWeight: 'bold', fontSize: 20 }}>{item}</Text>
                                                </TouchableOpacity>
                                            )
                                        }
                                    }
                                />

                            </View>
                            <ScrollView
                                contentContainerStyle={
                                    {
                                        height: Dimensions.get('screen').height,
                                        width: Dimensions.get('screen').width * 0.5,
                                        alignItems: 'center'
                                    }
                                }
                            >
                                <KeyboardAvoidingView
                                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                                    keyboardVerticalOffset={50}
                                >

                                    {
                                        category === '음료' ?
                                            <>
                                                <Text style={[modalItem.addMenuLeftText, { width: '100%', marginVertical: 5 }]}>카테고리 선택 및 추가</Text>
                                                <FlatList
                                                    data={drinkData.concat({ category_name: '+' })}
                                                    keyExtractor={item => item.toString()}
                                                    style={{ maxHeight: 140, height:120 }}
                                                    numColumns={5}
                                                    scrollEnabled={false}
                                                    renderItem={
                                                        ({ item }) => {
                                                            const backgroundColor = item.category_name.toString()
                                                                === route ? '#eaaf9d' : '#f2f2f2';
                                                            const color = item.category_name.toString()
                                                                === route ? '#fff' : '#000'

                                                            return (
                                                                <TouchableOpacity style={
                                                                    {
                                                                        borderRadius: 15,
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        paddingVertical: 5,
                                                                        paddingHorizontal: 10,
                                                                        marginHorizontal: 5,
                                                                        marginVertical: 5,
                                                                        backgroundColor,
                                                                    }
                                                                }
                                                                    onPress={() => setRoute(item.category_name)}
                                                                >
                                                                    <Text style={{ color, fontWeight: 'bold', fontSize: 12 }}>{item.category_name}</Text>
                                                                </TouchableOpacity>
                                                            )
                                                        }
                                                    }
                                                />
                                                {
                                                    route === '+' ?
                                                        <View style={modalItem.addMenu}>
                                                            <Text style={modalItem.addMenuLeftText}>추가하실 새로운{'\n'}카테고리 이름 : </Text>
                                                            <TextInput
                                                                style={modalItem.addMenuRightText}
                                                                placeholder='추가하실 카테고리 이름을 입력해주세요...'
                                                                onChangeText={(text) => setNewCategoryname(text)}
                                                            />
                                                        </View>
                                                        :
                                                        <></>
                                                }
                                                <View style={modalItem.addMenu}>
                                                    <Text style={modalItem.addMenuLeftText}>메뉴 이름 : </Text>
                                                    <TextInput
                                                        style={modalItem.addMenuRightText}
                                                        placeholder='이름을 입력해주세요...'
                                                        onChangeText={(text) => setName(text)}
                                                    />
                                                </View>
                                                <View style={modalItem.addMenu}>
                                                    <Text style={modalItem.addMenuLeftText}>가격 정보 : </Text>
                                                    <Text style={modalItem.addMenuRightText}>체크를 하신 뒤에 가격을 입력해주세요.</Text>
                                                </View>
                                                <View style={
                                                    {
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        width: '100%',
                                                    }
                                                }>
                                                    <View style={modalItem.addMenuTypeView}>
                                                        <Text style={modalItem.addMenuTypeText}>HOT 가능</Text>
                                                        {
                                                            Platform.OS === 'ios' ?
                                                                <CheckBox
                                                                    style={{ height: 20, width: 20, }}
                                                                    boxType='square'
                                                                    lineWidth={true}
                                                                    tintColor='#eaaf9d'
                                                                    onCheckColor='#fff'
                                                                    onTintColor='#eaaf9d'
                                                                    onFillColor='#eaaf9d'
                                                                    onAnimationType='bounce'
                                                                    offAnimationType='bounce'
                                                                    value={onlyHot}
                                                                    disabled={false}
                                                                    onChange={() => setOnlyHot(!onlyHot)}
                                                                />
                                                                :
                                                                <CheckBox
                                                                    value={onlyHot}
                                                                    disabled={false}
                                                                    onChange={() => setOnlyHot(!onlyHot)}
                                                                />
                                                        }
                                                        <View style={modalItem.addMenuTypeView}>
                                                            <Text style={modalItem.addMenuTypeText}>HOT 가격 : </Text>
                                                            <TextInput
                                                                style={modalItem.addMenuTypeTextInput}
                                                                keyboardType='numeric'
                                                                placeholder='숫자만'
                                                                onChangeText={(text) => isNumber(text, true)}
                                                                editable={onlyHot}
                                                            />
                                                        </View>
                                                    </View>
                                                    <View style={modalItem.addMenuTypeView}>
                                                        <Text style={modalItem.addMenuTypeText}>ICE 가능</Text>
                                                        {
                                                            Platform.OS === 'ios' ?
                                                                <CheckBox
                                                                    style={{ height: 20, width: 20, }}
                                                                    boxType='square'
                                                                    lineWidth={true}
                                                                    tintColor='#eaaf9d'
                                                                    onCheckColor='#fff'
                                                                    onTintColor='#eaaf9d'
                                                                    onFillColor='#eaaf9d'
                                                                    onAnimationType='bounce'
                                                                    offAnimationType='bounce'
                                                                    value={iceAvailable}
                                                                    disabled={false}
                                                                    onChange={() => setIceAvailable(!iceAvailable)}
                                                                />
                                                                :
                                                                <CheckBox
                                                                    value={iceAvailable}
                                                                    disabled={false}
                                                                    onChange={() => setIceAvailable(!iceAvailable)}
                                                                />
                                                        }
                                                        <View style={modalItem.addMenuTypeView}>
                                                            <Text style={modalItem.addMenuTypeText}>ICE 가격 : </Text>
                                                            <TextInput
                                                                style={modalItem.addMenuTypeTextInput}
                                                                keyboardType='numeric'
                                                                placeholder='숫자만'
                                                                onChangeText={(text) => isNumber(text, false)}
                                                                editable={iceAvailable}
                                                            />
                                                        </View>
                                                    </View>
                                                    <View style={modalItem.addMenuTypeView}>
                                                        <Text style={modalItem.addMenuTypeText}>HOT & ICE 가능</Text>
                                                        {
                                                            Platform.OS === 'ios' ?
                                                                <CheckBox
                                                                    style={{ height: 20, width: 20, }}
                                                                    boxType='square'
                                                                    lineWidth={true}
                                                                    tintColor='#eaaf9d'
                                                                    onCheckColor='#fff'
                                                                    onTintColor='#eaaf9d'
                                                                    onFillColor='#eaaf9d'
                                                                    onAnimationType='bounce'
                                                                    offAnimationType='bounce'
                                                                    value={bothAvailable || (onlyHot === true && iceAvailable === true)}
                                                                    disabled={false}
                                                                    onChange={() => [setBothAvailable(!bothAvailable), setIceAvailable(!bothAvailable), setOnlyHot(!bothAvailable)]}
                                                                />
                                                                :
                                                                <CheckBox
                                                                    value={bothAvailable}
                                                                    disabled={false}
                                                                    onChange={() => [setBothAvailable(!bothAvailable), setIceAvailable(!bothAvailable), setOnlyHot(!bothAvailable)]}
                                                                />
                                                        }

                                                    </View>
                                                </View>


                                                <View style={modalItem.addMenu}>
                                                    <Text style={modalItem.addMenuLeftText}>세부 메뉴 가능 </Text>
                                                    {
                                                        Platform.OS === 'ios' ?
                                                            <CheckBox
                                                                style={{ height: 20, width: 20, }}
                                                                boxType='square'
                                                                lineWidth={true}
                                                                tintColor='#eaaf9d'
                                                                onCheckColor='#fff'
                                                                onTintColor='#eaaf9d'
                                                                onFillColor='#eaaf9d'
                                                                onAnimationType='bounce'
                                                                offAnimationType='bounce'
                                                                value={subMenuAvailable}
                                                                disabled={false}
                                                                onChange={() => [setSubMenuAvailable(!subMenuAvailable), setSubMenu([]), setInputData([])]}
                                                            />
                                                            :
                                                            <CheckBox
                                                                value={subMenuAvailable}
                                                                disabled={false}
                                                                onChange={() => [setSubMenuAvailable(!subMenuAvailable), setSubMenu([]), setInputData([])]}
                                                            />
                                                    }
                                                </View>
                                                {
                                                    subMenuAvailable ?
                                                        <>
                                                            <View style={[modalItem.addMenu, { alignItems: 'flex-start' }]}>
                                                                <Text style={modalItem.addMenuLeftText}>세부메뉴 추가 : </Text>
                                                                <View style={{ flexDirection: 'column' }}>
                                                                    {
                                                                        subMenu.map((value) => {
                                                                            return value
                                                                        })
                                                                    }
                                                                </View>
                                                                <PlusButton style={modalItem.addSubMenuBtn}
                                                                    onPress={() => addTextInput(subMenu.length)}
                                                                />
                                                                <MinusButton
                                                                    style={modalItem.addSubMenuBtn}
                                                                    onPress={() => removeTextInput()}
                                                                />
                                                            </View>
                                                        </>
                                                        :
                                                        <></>
                                                }
                                                <View style={modalItem.addMenu}>
                                                    <Text style={modalItem.addMenuLeftText}>옵션 정보 : </Text>
                                                    <Text style={modalItem.addMenuRightText}>해당되는 옵션을 체크해주세요.</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={modalItem.addMenuTypeView}>
                                                        <Text style={modalItem.addMenuTypeText}>샷추가 가능</Text>
                                                        {
                                                            Platform.OS === 'ios' ?
                                                                <CheckBox
                                                                    style={{ height: 20, width: 20, }}
                                                                    boxType='square'
                                                                    lineWidth={true}
                                                                    tintColor='#eaaf9d'
                                                                    onCheckColor='#fff'
                                                                    onTintColor='#eaaf9d'
                                                                    onFillColor='#eaaf9d'
                                                                    onAnimationType='bounce'
                                                                    offAnimationType='bounce'
                                                                    value={shot}
                                                                    disabled={false}
                                                                    onChange={() => setShot(!shot)}
                                                                />
                                                                :
                                                                <CheckBox
                                                                    value={shot}
                                                                    disabled={false}
                                                                    onChange={() => setShot(!shot)}
                                                                />
                                                        }
                                                    </View>
                                                    <View style={modalItem.addMenuTypeView}>
                                                        <Text style={modalItem.addMenuTypeText}>시럽추가 가능</Text>
                                                        {
                                                            Platform.OS === 'ios' ?
                                                                <CheckBox
                                                                    style={{ height: 20, width: 20, }}
                                                                    boxType='square'
                                                                    lineWidth={true}
                                                                    tintColor='#eaaf9d'
                                                                    onCheckColor='#fff'
                                                                    onTintColor='#eaaf9d'
                                                                    onFillColor='#eaaf9d'
                                                                    onAnimationType='bounce'
                                                                    offAnimationType='bounce'
                                                                    value={syrup}
                                                                    disabled={false}
                                                                    onChange={() => setSyrup(!syrup)}
                                                                />
                                                                :
                                                                <CheckBox
                                                                    value={syrup}
                                                                    disabled={false}
                                                                    onChange={() => setSyrup(!syrup)}
                                                                />
                                                        }
                                                    </View>
                                                    <View style={modalItem.addMenuTypeView}>
                                                        <Text style={modalItem.addMenuTypeText}>크림추가 가능</Text>
                                                        {
                                                            Platform.OS === 'ios' ?
                                                                <CheckBox
                                                                    style={{ height: 20, width: 20, }}
                                                                    boxType='square'
                                                                    lineWidth={true}
                                                                    tintColor='#eaaf9d'
                                                                    onCheckColor='#fff'
                                                                    onTintColor='#eaaf9d'
                                                                    onFillColor='#eaaf9d'
                                                                    onAnimationType='bounce'
                                                                    offAnimationType='bounce'
                                                                    value={whipping}
                                                                    disabled={false}
                                                                    onChange={() => setWhipping(!whipping)}
                                                                />
                                                                :
                                                                <CheckBox
                                                                    value={whipping}
                                                                    disabled={false}
                                                                    onChange={() => setWhipping(!whipping)}
                                                                />
                                                        }
                                                    </View>
                                                </View>
                                            </>
                                            :
                                            <>
                                            </>
                                    }

                                    <View style={modalItem.addMenu}>
                                        <Text style={modalItem.addMenuLeftText}>메뉴 사진 : </Text>
                                        <Text style={modalItem.addMenuRightText}>준비중입니다 :)</Text>
                                    </View>
                                </KeyboardAvoidingView>
                            </ScrollView>
                            <View style={
                                {
                                    marginTop: 20,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }
                            }>
                                <TouchableOpacity
                                    style={modalItem.modalButton}
                                    onPress={onPress}
                                    onPressIn={() => cleanUp()}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>닫기</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={modalItem.modalButton}
                                    onPress={() => autoSetForm()}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>저장하기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>
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