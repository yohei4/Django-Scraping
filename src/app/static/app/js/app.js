"use strict";

$(function () {
    $('.save-btn').one('click', function () {
        var btn = $(this);

        //ボタンのvalue値を取得
        var btn_val = $(this).val();

        //.image-itemの全てを取得
        var image_items = document.querySelectorAll('.image-item');

        //POST送信するための変数指定
        var img_url;

        //.iamge_itemを繰り返し処理
        image_items.forEach(el => {
            //.iamge_itemのidとボタンのvalueを比較
            if(el.id === btn_val){
                var img = getLastChildEl(el, 1);
                img_url = img.src;
            }
        });
        
        // ajaxに送信する用のデータ
        var data = {
            "keyword": $('input[name="keyword"]').val(),
            "url" : img_url
        };

        //Ajax通信を開始する
        cmnPost(album_url, data, 'json')
        .done(function() {
            btn.toggleClass('active');
            btn.disabled = true;
        });
    });
    
    $('.delete-btn').on('click', function () {
        //POST送信するための変数指定
        var img_url, img_id, img_title;

        var btn = $(this);
        //ボタンのvalue値を取得
        var btn_val = $(this).val();
        //.image-itemの全てを取得
        var image_items = document.querySelectorAll('.image-item');

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

        // ajaxに送信する用のデータ
        var data = { 
            "title": img_title,
            "url" : img_url,
            "id": img_id,
        };

        //Ajax通信を開始する
        cmnPost(delete_url, data, 'text')
        .done(function() {
            btn.parents('.image-item').remove();
        });
    })
});