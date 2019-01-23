import 'bootcss';
import '../css/newsList.stylus';
import './newList/header'
import { newsList } from '../sever/sever';
import '../util/swiper';
let timer;
let bottom = 0;
const init = () => {
    newsRoll();
    getData();
    initEvent();
}
const initEvent = () => {
    $(".loadmore").on("click", onLoadmoreClick);
    $(".return-top").on("click", onReturnTopClick);
}
window.onscroll = function() {
    let scrollH = document.documentElement.scrollTop;
    let clientH = window.innerHeight;
    if (scrollH < clientH) {
        $(".return-top").css("display", "none")
    } else {
        $(".return-top").css("display", "block")
    }
    if (scrollH > 200) {
        $("nav").css("background", "rgba(248,248,248,.5)")
    } else {
        $("nav").css("background", "rgba(248,248,248,)")
    }
}
const run = () => {
    let windowPosition = document.documentElement.scrollTop;
    windowPosition -= 10;
    if (windowPosition > 0) {
        window.scrollTo(0, windowPosition)
    } else {
        clearInterval(timer);
    }
}
const goTop = () => {
    timer = setInterval(run, 1);
}

const onReturnTopClick = function() {
    goTop();
}


const onLoadmoreClick = function() {
    let height = $(".det-news").height();
    if (height >= 1980) {
        confirm("没有更多了");
        return
    }
    height += 540
    bottom -= 540;
    $(".det-news").animate({
        "height": `${height}`
    })
    $(".loadmore").animate({
        "bottom": `${bottom}`
    })

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
const renderNewsList = (res) => {

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
const randerBannerImg = (res) => {
    let dataArr = [];
    let arr1 = [];
    let arr2 = [];


    $.each(res.data, function(index, item) {
        if (item.imageUrls && dataArr.length < 4) {
            dataArr.push(item);
        }
    });
    if (dataArr.length == 4) {
        dataArr.forEach((item, index) => {
            arr1.push(`<li style="background-image:url(${item.imageUrls[0]})" index="${index}"><div class="masker2">${item.title}</div></li>`);
            arr2.push(`<li style="background-image:url(${item.imageUrls[0]})" index="${index}"><div class="masker">查看详情</div></li>`)
        });
        $("#banner-img").html(arr1.join(""));
        $("#img-list").html(arr2.join(""));
    }
}

const randerDetNews = (res) => {
    let arr = [];
    console.log(res.data);

    $.each(res.data, function(index, item) {
        arr.push(
            `<li>
            <img src="${item.imageUrls ?item.imageUrls[0]:'undefined'}" alt="">
            <div class="news-desc">
            <h3>${item.title}</h3>
            <span>${item.posterScreenName}</span>
            <span>${item.publishDateStr}</span>
            <p>${item.content}</p>
            <span class="read-more">查看详情>></span>
            </div>
            </li>`);
    })
    $("#det-news-list").html(arr.join(""));
}
async function getData() {
    let res = await newsList();
    if (res == null) {
        getData();
    } else {
        randerDetNews(res);
        renderNewsList(res);
        randerBannerImg(res);
    }
}
init();