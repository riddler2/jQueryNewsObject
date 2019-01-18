var leftBtn = document.querySelector('.body-swiper>.left');
var rightBtn = document.querySelector('.body-swiper>.right');
var content = document.querySelectorAll('.body-swiper>ul>li');
var ul = document.querySelector('.body-swiper>ul');
var wp = document.querySelector('.body-swiper');
var sliderNav = document.querySelectorAll('.body-swiper>ol>li');
var width = wp.offsetWidth;
var num = 0;
var timer, timer1;

// 左键点击
leftBtn.onclick = function() {
    if (timer) {
        return;
    }
    num = -width;
    ul.style.marginLeft = -width + 'px';
    ul.insertBefore(document.querySelector('.body-swiper>ul>li:last-child'), document.querySelector('.body-swiper>ul>li:first-child'));
    timer = setInterval(function() {
        num += 10;
        if (num >= 0) {
            clearInterval(timer);
            timer = undefined;
            getActiveStatus();
            return;
        }
        ul.style.marginLeft = num + 10 + 'px';

    }, 10);
}

// 右点击
rightBtn.onclick = function() {
    if (timer) {
        return;
    }
    timer = setInterval(function() {
        num += 10;
        ul.style.marginLeft = -num + 'px';
        if (num > width) {
            clearInterval(timer);
            ul.appendChild(document.querySelector('.body-swiper>ul>li:first-child'));
            ul.style.marginLeft = 0 + 'px';
            num = 0;
            timer = undefined;
            getActiveStatus();
        }
    }, 10);
}

//底部导航
sliderNav.forEach(function(btn, index) {
    btn.onclick = function() {
        clearInterval(timer);
        var newIndex = index,
            oldIndex = document.querySelector('.body-swiper>ul>li:first-child').getAttribute('index'),
            tmpItem;
        tmpItem = document.querySelector('.body-swiper>ul>li:first-child').cloneNode(true);

        this.parentNode.querySelectorAll('li').forEach(function(ele) {
            ele.className = '';
        })
        this.className = 'on';

        if (newIndex > oldIndex) {
            for (var i = 0; i < newIndex - oldIndex; i++) {
                ul.appendChild(document.querySelector('.body-swiper>ul>li:first-child'));
            }
            ul.insertBefore(tmpItem, document.querySelector('.body-swiper>ul>li:first-child'));

            timer = setInterval(function() {
                num += 10;
                if (num > width) {
                    clearInterval(timer);
                    num = 0;
                    document.querySelector('.body-swiper>ul>li:first-child').remove();
                    ul.style.marginLeft = 0;
                    timer = undefined;
                    return;
                }
                ul.style.marginLeft = -num + 'px';

            }, 10);
        } else if (newIndex < oldIndex) {
            for (var i = 0; i < oldIndex - newIndex; i++) {
                ul.insertBefore(document.querySelector('.body-swiper>ul>li:last-child'), document.querySelector('.body-swiper>ul>li:first-child'));
            }
            document.querySelector('.body-swiper>ul>li:first-child').after(tmpItem);

            ul.style.marginLeft = -width + 'px';
            num = -width;
            timer = setInterval(function() {
                num += 10;
                if (num >= 0) {
                    clearInterval(timer);
                    document.querySelector('.body-swiper>ul>li:first-child').nextElementSibling.remove();
                    timer = undefined;
                    return;
                }
                ul.style.marginLeft = num + 'px';
            }, 10);
        }
    }
});

// 获得点击状态
function getActiveStatus() {
    var currIndex = document.querySelector('.body-swiper>ul>li:first-child').getAttribute('index');
    sliderNav.forEach(function(ele, index) {
        if (currIndex == index) {
            ele.className = 'on'
        } else {
            ele.className = '';
        }
    })
}
// 获得颜色
content.forEach(function(ele, index) {
    ele.setAttribute('index', index);
    ele.style.backgroundColor = `hsl(${Math.random() * 360},50%,50%)`;
})


// 定时轮播
function run() {
    timer1 = setInterval(function() {
        rightBtn.click();
    }, 2000);
}
run();