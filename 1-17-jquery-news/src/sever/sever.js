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

export const newsTitle = (url) => ajax({ url });