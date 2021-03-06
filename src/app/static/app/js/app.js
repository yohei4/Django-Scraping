"use strict";
// 画像配列
let thumbs = [];

$(function () {

    // サムネイル関係
    const thumbnailsList = new Swiper('.thumbnails-list', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 10,
        slideToClickedSlide: true,
    });
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        centeredSlides: true,
    });
    swiper.controller.control = thumbnailsList;
    thumbnailsList.controller.control = swiper;

    // チェックボックス
    $('.image-checkbox').change(function (e) {
        if($(e.target).prop('checked')) {
            const obj = {
                'src': $(e.target).parent().find('.image').children('img').attr('src'),
                'img-id': $(e.target).val()
            };
            thumbs.push(obj);
            addSlide(obj);
        } else {
            thumbs.forEach(function (elememt, index) {
                if (($(e.target).val() == elememt['img-id']))
                {
                    thumbs.splice(index, 1);
                    $('.thumbnails-list').children('.swiper-wrapper').children().each(function (i, el) {
                        if ($(e.target).val() == $(el).data('img-id')) {
                            swiper.removeSlide(index);
                            thumbnailsList.removeSlide(index);
                        }
                    });
                }
            });
        }
    });

    // 複数選択
    $('.select-table').selectable({
        filter: '.image-outer',
        selected: function(e, ui) {
            if ($(ui.selected).children('.image-checkbox').prop('checked')) {
                $(ui.selected).children('.image-checkbox').prop('checked', false).trigger("change");
            } else {
                $(ui.selected).children('.image-checkbox').prop('checked', true).trigger("change");
            }
        }
    });

    // 一括保存ボタン
    $('.images-btn__save').on('click', function() {
        cmnPost(
            all_save_url,
            {
                "keyword" : $('input[name="keyword"]').val(),
                "thumbs": JSON.stringify(thumbs),
            },
            'json',
            this
        ).done(function(data) {
            if (data.result == 0) {
                allDestory();
            }
        });
    });

    // 一括削除ボタン
    $('.images-btn__delete').on('click', function() {
        cmnPost(
            all_delete_url,
            {
                "thumbs": JSON.stringify(thumbs),
            },
            'json',
            this
        ).done(function(data) {
            if (data.result == 0) {
                thumbs.forEach(el => {
                    $('.image-item[data-img-id="' + el['img-id'] + '"]').remove();
                });
                allDestory();
            }
        });
    });

    // リセットボタン
    $('.images-btn__reset').on('click', function() {
        allDestory();
    });

    // 保存ボタン
    $('.save-btn').on('click', function () {
        cmnPost(
            save_url,
            {
                "keyword": $('input[name="keyword"]').val(),
                "url" : $(this).parent().children('.image').children('img').attr('src')
            },
            'json',
            this
        ).done(function() {
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


    function addSlide(val) {
        const slides = '<li class="swiper-slide" data-img-id=' + val['img-id'] + '><img src="' + val['src'] + '" width="" height="" /></li>';
        swiper.appendSlide(slides);
        thumbnailsList.appendSlide(slides);
    }

    function allDestory() {
        thumbs = new Array();
        swiper.removeAllSlides();
        thumbnailsList.removeAllSlides();
        $('.image-checkbox').prop('checked', false);
    }

});