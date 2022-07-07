/**
 * Cookieを取得
 * @param name 
 * @return cookieValue
 */
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

/**
 * indexで指定した要素の、最終の要素を取得
 * @param el HTML要素
 * @param index 取得したいindex番号
 */
function getLastChildEl(el, index) {
    while(el !== null) {
        var element = el.childNodes.item(index);
        if(element === null) {
            return el;
        } else {
            el = element;
        }
    }
}

/**
 * POST通信用Ajax
 * @param url URL
 * @param data 送信したいデータ
 * @param dataType データ属性
 * @return {jqXHR}
 */
function cmnPost(url, data, dataType, context = undefined) {
    return $.ajax({
        type: "POST",
        url: url,
        data: data,
        dataType: dataType,
        crossDomain: false,
        context: context === undefined ? this : context,
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type)) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    })
    .done(function(data){
        // 正常処理
        console.log(data);
    }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
        console.log('失敗');
        console.log("XMLHttpRequest : " + XMLHttpRequest.status);
        console.log("textStatus     : " + textStatus);
        console.log("errorThrown    : " + errorThrown.message);
    }).always(function() {
        // 後処理
    });
}

async function cmnGet() {
    console.log('aaaaa')
}