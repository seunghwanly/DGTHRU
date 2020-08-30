// import { getBasketLength } from './DatabaseRef';
// //redux 연습해보기

// //actions/types.js
// const types = {
//     READ_BASKET_LENGTH : 'READ_BASKET_LENGTH'
// };

// //actions/functions.js
// const readBasketLength = (shopInfo) => {
//     return {
//         type : types.READ_BASKET_LENGTH,
//         value : getBasketLength(shopInfo)
//     }
// }

// //actions/index.js
// export const ActionCreators = Object.assign({},
//     readBasketLength
// );

// //reducers/getBasketLength.js
// const count = 0;
// export default (state = count, action) => {
//     if(action.type === types.READ_BASKET_LENGTH) {
//         return action.value;
//     }
// }