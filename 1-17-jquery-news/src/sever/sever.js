function ajax({ type = 'get', url = '', data = {}, dataType = 'json' }) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: type,
            url: url,
            data: data,
            dataType: dataType,
            success: function(res) {
                resolve(res);
            }
        });
    })
}

export const newsTitle = () => ajax({
    url: "api/news_classify.php"
});
export const newsList = () => ajax({
    url: "api/news_list.php"
});