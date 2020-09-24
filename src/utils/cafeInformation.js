export const getCafeIcon = name => {
    switch (name) {
        case "main_outdoor":
            return require('../../image/cafe-icon/가온누리.png');
        case "singong_1f":
            return require('../../image/cafe-icon/남산학사.png');
        case "hyehwa_roof":
            return require('../../image/cafe-icon/혜화.png');
        case "economy_outdoor":
            return require('../../image/cafe-icon/그루터기.png');
        case "munhwa_1f":
            return require('../../image/cafe-icon/두리터.png');
    }
}

export const getCafeLocation = name => {
    switch (name) {
        case "main_outdoor":
            return '본관 야외 휴게장소';
        case "singong_1f":
            return '신공학관 1층';
        case "hyehwa_roof":
            return '혜화관 옥상';
        case "economy_outdoor":
            return '경영관 야외'
        case "munhwa_1f":
            return '학술문화관 1층';
    }
}

export const getCafeName = name => {
    switch (name) {
        case "main_outdoor":
            return '가온누리카페';
        case "singong_1f":
            return '남산학사카페';
        case "hyehwa_roof":
            return '혜화디저트카페';
        case "economy_outdoor":
            return '그루터기'
        case "munhwa_1f":
            return '두리터';
    }
}

export const getCafeTelNumber = name => {
    switch (name) {
        case "main_outdoor":
            return '02-2260-8961';
        case "singong_1f":
            return '02-2260-8509';
        case "hyehwa_roof":
            return '02-2260-8966';
        case "economy_outdoor":
            return '02-2260-1478'
        case "munhwa_1f":
            return '02-2260-1478';
    }
}

export const translateCategoryName = name => {
    switch(name) {
        case "Espresso":
            return "에스프레소";
        case "Coffee Beverage":
            return "커피";
        case "Tea":
            return "차";
        case "Latte":
            return "라떼";
        case "Smoothie":
            return "스무디";
        case "Frappucino":
            return "프라푸치노";
        case "Fresh Juice":
            return "생과일주스";
        case "Juice":
            return "주스";
        case "Ade":
            return "에이드";
        default:
            return "뭘까요?";
    }
}