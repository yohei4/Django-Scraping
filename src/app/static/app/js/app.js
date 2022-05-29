"use strict";
$(function () {
    // サムネイル関係
    var thumbnailsList = new Swiper('.thumbnails-list', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 10,
        slideToClickedSlide: true,
    });
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        centeredSlides: true,
    });
    swiper.controller.control = thumbnailsList;
    thumbnailsList.controller.control = swiper;

    $('.image-checkbox').change(function (e) {
        if($(e.target).prop('checked')) {
            $(e.target).val();
        }
    });

    // 保存ボタン
    $('.save-btn').one('click', function () {
        cmnPost(
            album_url,
            {
                "keyword": $('input[name="keyword"]').val(),
                "url" : $(this).parent().children('.image').children('img').attr('src')
            },
            'json',
            this
        ).done(function() {
            $(this).addClass('active');
            $(this).disabled = true;
        });
    });
    
    // 削除ボタン
    $('.delete-btn').on('click', function () {
        cmnPost(
            delete_url,
            {
                "url" : $(this).parent().children('.image').children('img').attr('src'),
                "id": $(this).parent().children('.image').children('img').attr('id'),
            },
            'json',
            this
        ).done(function() {
            $(this).parents('.image-item').remove();
        });
    });
});