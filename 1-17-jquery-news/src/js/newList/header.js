import { newsTitle } from "../../sever/sever";
import '../../css/header.stylus'


const init = () => {
    initEvent();
    renderList();

}
const initEvent = () => {


}
const renderList = async() => {
    let res = await newsTitle();
    let arr = [];
    res.data.forEach(item => {
        arr.push(`<li>${item}</li>`)
    });

    $("#navlist").html(arr.join(""))


}

init();