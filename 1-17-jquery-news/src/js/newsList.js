import 'bootcss';
import '../css/newsList.stylus';
import './newList/header'
import { newsList } from '../sever/sever';
import '../util/swiper'

const init = () => {

    renderNewsList();
    newsRoll();
    randerBannerImg();
    randerDetNews();

}

const renderNewsList = async() => {
    let res = await newsList();
    let arr = [];
    res.data.forEach(item => {
        arr.push(
            `<li><span>${item.posterScreenName }</span>
                <span id = "text"style = "width: 170px;" >${item.title}</span> 
                <span> ${item.publishDateStr.substr(11,18)} </span></li>`
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
    let data = res.data;
    let dataArr = [];
    let arr1 = [];
    let arr2 = [];
    if (!res) {
        res = await newsList();
    }
    $.each(data, function(index, item) {
        if (item.imageUrls && dataArr.length < 4) {
            dataArr.push(item);
        }
    });


    if (dataArr.length == 4) {
        dataArr.forEach((item, index) => {
            arr1.push(`<li style="background-image:url(${item.imageUrls[0]})" index="${index}"></li>`);
            arr2.push(`<li style="background-image:url(${item.imageUrls[0]})" index="${index}"><div class="masker">查看详情</div></li>`)
        });
        $("#banner-img").html(arr1.join(""));
        $("#img-list").html(arr2.join(""));
    }




}
const randerDetNews = async() => {
    let res = await newsList();
    let arr = [];
    console.log(res);

    $.each(res.data, function(index, item) {

        arr.push(
            `<li>
                    <img src="${item.imageUrls[0] || 'undefined'}" alt="">
                    <div class="news-desc">
                        <h3>${item.title||'undefined'}</h3>
                        <span>${item.posterScreenName||'undefined'}</span>
                        <span>${item.publishDateStr||'undefined'}</span>
                        <p>undefinde</p>
                   </div>
            </li>`);
        console.log(arr.join(""));



        $("#det-news-list").html(arr.join(""));


    })
}


init();