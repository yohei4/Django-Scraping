import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faEnvelope, faEye, faKey } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function Login() {
    return (
        // <Link className="App-link" to="/app">
        <main id="login-page">
            <div className="login-page__inner">
                <div className="screen-title__wrap">
                    <h1 className="title">ログイン画面</h1>
                </div>
                <div className="create-account__wrap">
                    <div className="form-title">
                        <h2>メールアドレスでログイン</h2>
                    </div>
                    <form action="" id="login" method="post">
                        <div className="email-outer">
                            <div className="input-wrap">
                                <FontAwesomeIcon icon={faEnvelope} />
                                {/* <input id="email" name="email" type="email" placeholder="メールアドレス"> */}
                            </div>
                        </div>
                        <div className="password-outer">
                            <div className="input-wrap">
                                <FontAwesomeIcon icon={faKey} />
                                {/* {{ form.password }} */}
                                {/* <input id="password" name="password" type="password" placeholder="パスワード"> */}
                                <button id="password-view__btn"><FontAwesomeIcon icon={faEye} /></button>
                            </div>
                        </div>
                        {/* {% if form.errors %}
                            {% for error in form.non_field_errors %} */}
                                {/* <p className="error">※{{ error }}</p> */}
                            {/* {% endfor %}
                        {% endif %} */}
                        <div className="ac-login_button">
                            <button type="submit" form="login">
                                <span>ログインする</span>
                            </button>
                        </div>
                    </form>
                    <div className="login-page__move">
                        <p>新規アカウントの作成は<a href="">こちら</a></p>
                    </div>
                    {/* <h1>{{ sample }}</h1> */}
                </div>
            </div>
        </main>
        // </Link>
    );
}

export default Login;