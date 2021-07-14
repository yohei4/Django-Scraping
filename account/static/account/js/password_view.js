window.addEventListener('DOMContentLoaded', function(){

    // (1)パスワード入力欄とボタンのHTMLを取得
    let btn_passview = document.getElementById("password-view__btn");
    let input_pass = document.getElementById("id_password");

    // (2)ボタンのイベントリスナーを設定
    btn_passview.addEventListener("click", (e)=>{
  
      // (3)ボタンの通常の動作をキャンセル（フォーム送信をキャンセル）
      e.preventDefault();
  
      // (4)パスワード入力欄のtype属性を確認
      if( input_pass.type === 'password' ) {
        
        // (5)パスワードを表示する
        input_pass.type = 'text';

        //目のボタンにスラッシュをつける
        btn_passview.classList.add('hide');
  
      } else {

        // (6)パスワードを非表示にする
        input_pass.type = 'password';

        //目のボタンにスラッシュを消す
        btn_passview.classList.remove('hide');
      }
    });
  });