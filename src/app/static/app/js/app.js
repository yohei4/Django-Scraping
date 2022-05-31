"use strict";

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

    // 画像配列
    const thumbs = [];
    const watchedThumbs = watchThumbs(thumbs, onChange);

    $('.image-checkbox').change(function (e) {
        if($(e.target).prop('checked')) {
            watchedThumbs.push({
                'src': $(e.target).parent().find('.image').children('img').attr('src'),
                'img-id': $(e.target).val()
            });
        } else {
            thumbs.forEach(function (elememt, index) {
                if (($(e.target).val() == elememt['img-id']))
                {
                    delete watchedThumbs[index];
                }
            });
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

    /**
     * 配列オブジェクトの動作を監視します
     * @param {Array} array 監視したい配列
     */
    function watchThumbs(array, onChange) {
        // 戻り値として Proxy オブジェクトを返す
        let deletedArray = null;

        return new Proxy(array, {
            // プロパティ削除時の動作をカスタマイズ
            deleteProperty: (target, property) => {
                deletedArray = [...array];

                $('.thumbnails-list').children('.swiper-wrapper').children().each(function (i, el) {
                    if (target[property]['img-id'] == $(el).data('img-id')) {
                        swiper.removeSlide(property);
                        thumbnailsList.removeSlide(property);
                    }
                });

                const result = Reflect.deleteProperty(target, property);
                return result;
            },

            // プロパティ設定時の動作をカスタマイズ
            set: (target, property, val, receiver) => {
                const oldArray = [...array];
                const result = Reflect.set(target, property, val, receiver);
                if (deletedArray) {
                    onChange(deletedArray, target);
                    deletedArray = null;
                } else if (property !== 'length') {
                    // その他：追加や変更の検知

                    onChange(oldArray, target);
                }
                return result;
            }
        });
    }

    function addSlide() {

    }
});

// 変更時に実行したい関数を定義
function onChange(v1, v2) {
    console.log(v1);
    console.log(' =>', v2);
    console.log('');
};