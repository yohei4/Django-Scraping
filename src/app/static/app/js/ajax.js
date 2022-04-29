"use strict";

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

const csrftoken = getCookie('csrftoken');

$(function () {
    $('.save-btn').one('click', function () {
        var btn = $(this);
        //ボタンのvalue値を取得
        var btn_val = $(this).val();
        //.image-itemの全てを取得
        var image_items = document.querySelectorAll('.image-item');
        //POST送信するための変数指定
        var img_url;
        var img_title;
        //.iamge_itemを繰り返し処理
        image_items.forEach(el => {
            //.iamge_itemのidとボタンのvalueを比較
            if(el.id === btn_val){
                var img = getLastChildEl(el, 1);
                var p = getLastChildEl(el, 3);
                img_url = img.src;
                img_title = p.textContent;
            }
        });
        //Ajax通信を開始する
        $.ajax({
            type: "POST",
            url: 'http://localhost:8000/app/album/',
            data: { 
                "title": img_title,
                "url" : img_url,
            },
            dataType: "text",
            crossDomain: false, // obviates need for sameOrigin test
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type)) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            },
            success: function() {
                btn.toggleClass('active');
                btn.disabled = true;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                console.log('失敗');
                console.log("XMLHttpRequest : " + XMLHttpRequest.status);
                console.log("textStatus     : " + textStatus);
                console.log("errorThrown    : " + errorThrown.message);
            }
        })
    });
    $('.delete-btn').on('click', function () {
        var btn = $(this);
        //ボタンのvalue値を取得
        var btn_val = $(this).val();
        //.image-itemの全てを取得
        var image_items = document.querySelectorAll('.image-item');
        //POST送信するための変数指定
        var img_url;
        var img_id;
        var img_title;
        //.iamge_itemを繰り返し処理
        image_items.forEach(el => {
            //.iamge_itemのidとボタンのvalueを比較
            if(el.id === btn_val){
                var img = getLastChildEl(el, 1);
                var p = getLastChildEl(el, 3);
                img_url = img.src;
                img_id = img.id;
                img_title = p.textContent;
            }
        });
        //Ajax通信を開始する
        $.ajax({
            type: "POST",
            url: 'http://localhost:8000/app/album/delete/',
            data: { 
                "title": img_title,
                "url" : img_url,
                "id": img_id,
            },
            dataType: "text",
            crossDomain: false, // obviates need for sameOrigin test
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type)) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            },
            success: function() {
                btn.parents('li').remove();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                console.log('失敗');
                console.log("XMLHttpRequest : " + XMLHttpRequest.status);
                console.log("textStatus     : " + textStatus);
                console.log("errorThrown    : " + errorThrown.message);
            }
        })
    })
});

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