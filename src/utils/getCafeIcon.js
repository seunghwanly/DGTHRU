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