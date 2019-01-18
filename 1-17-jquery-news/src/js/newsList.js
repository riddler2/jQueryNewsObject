import 'bootcss';
import '../css/newsList.stylus';
import './newList/header'
import { newsList } from '../sever/sever';
import '../util/swiper'

const init = () => {
    initEvent();
    renderNewsList();
    newsRoll();
    randerBannerImg();

}
const initEvent = () => {


}
const renderNewsList = async() => {
    let res = await newsList();
    let arr = [];
    res.data.forEach(item => {
        arr.push(
            `<li><span>${item.posterScreenName }</span>
                <span id = "text"style = "width: 180px;" >${item.title}</span> 
                <span> ${item.publishDateStr.substr(11,18)} </span></li >`
        )

    });
    $("#side-news").html(arr.join(""))
}
const newsRoll = () => {
    const doRoll = () => {
        $(".side").animate({
            "marginTop": "0px"
        }, function() {
            $("#side-news")
                .append($("#side-news").find('li:first-child'));
            $(".side")
                .css("margin-top", "40px")
        })
    }

    setInterval(doRoll, 2000);
}
const randerBannerImg = async() => {
    let res = await newsList();
    let dataArr = [];
    let arr = [];
    $.each(res.data, function(index, item) {
        if (item.imageUrls && dataArr.length < 4) {
            dataArr.push(item);
        }
    });
    if (dataArr.length == 4) {
        dataArr.forEach((item, index) => {
            arr.push(`<li style="background-image:url(${item.imageUrls[0]})" index="${index}"></li>`)
        });
    }
    $("#banner-img").html(arr.join(""));
}


init();