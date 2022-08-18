import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faKey } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { Form } from '@/components/Login/Form/';

export default function Login() {
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
                    <Form />
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
