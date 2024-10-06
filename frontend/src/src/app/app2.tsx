import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@app/routes/Routes';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import '@assets/style.scss';
import fjGallery from 'flickr-justified-gallery';
import LightGallery, { LightGalleryProps } from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);

const a = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeDPP9pGm0sKxZeOKtNkkLk9PvmgIL3wMhQA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-GJv0tbuqxtG6KNvuE1lACDsiexHsBlXNWQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRneV1fFTpzC6_gM07NYDe622Rik0rQXRnCiQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX_R36SRv67y0BCiXKdDmT93pb2JkvPpNdGA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVp6n5KX_NJRt8f9ORossmVsgurXXkWx1EMA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDYPi4ffxBNH0Hx4JAq1CMopBmX_gDif8WCQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYKQNxlY7Lh4RMg_nCqzIzl3qG8d_h0QGapA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcbbhBD_fqhgkNymBFIvKJ-lRteCbZy9npdg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP_q8eSKhQS3bj8_6b5WopGEU5nXZ6Yhdqcg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaUH6dnDHKxDSB3Pbe2YeE5M4_l74_ga29XA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJxyZc2qN1FYpeV-YU7onhy8gydIubLh_L_g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKC2AtZK-cmhVJRqa-4As1_QA2ooy8Epn_Ug&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMc3P9ObUB7rSQsNbfCEnYCF1Zo9q5hBu09g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7x77DxE4euQP3lIZdo8s75p99Bmh5uTmRAg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbTUXlPyOqrsDyYIkDrK96bPvAR8z8WJwA0A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2mvFIZlUZMerFlQZISCy1pmeR0sRvLzBZ6Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxg3gpiaYe1hLhOZgz5dSDoyLkxF63Vw1OLw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST8hlZQMx0bZliVFihU4fiV1TDWEWT3KKcjg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuE8fQmWgd_Meq6oLrC3oadBdLKa2WLweFgg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdeVq7UueODkd-YuoCEosegBeuTkrA7B8b5Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg_O72HuYpRJ_mb0Z1dPSxqjw-30ACEiREHQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUXfNHYI7EDUsfjzj51wQaxNlpjxiWg1of0A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgA5Bf09PGyPpr0NRYvH5Zuyg2HV52RKaOiQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzRnP_1w_Zaxo-DwpP2SeCdz88Tk0GS22MJA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdMCtkvtuknf01wDgKtqJ8z0fiUWxXtlVrgg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Ls-SY5P0t307IedvA-uvi7hGiWXMAAho3A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZYYtieoxi7untqs7piwZ3BlBzVpoEcA1ZOA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRonyACduZ7NpGr8wy-__pcxIPPTXj86MpnjQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp4fdomu22NsxMh5-p3GpkpT9q6zgmjoXmug&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXbxLoFv90mHYZfi7zEdKur1kKrKO7V3EGRw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpS6C3hgwWCgg0yDQhFYnacw3XIazE68eZqQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReaJqDMwt1IjiGezCGJaejDBgN6aMqhMyp-w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmCqqb3JqvWuOVxvkgi1RNi3zhTJw2fyeZIg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqVOulgKov577Q1RLG98XSTkjhWJHS4NQIQg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVClqCxIuW6Bgxe3dW-ee62tAGQCf5v0UZLw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHbFSnEmOr5hCVFXNV9z-uzBvQiFuaV6q4lQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKX8Rv1WWuqDW08kZ7ThDZSAlGKX-7_t1QCA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMyXcemMutCgRrch4eYfai0d78q4PcsyDAbQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9RtIWrKwKQGy2CiZreFTeW7lP6_iEEt8Tmg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdi7oCE7DANexIFZ3wf4JSwsikTH5Yci3JsA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNIGEfF2kqSI2b48JjyAGN9byvUvpxbwclXg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsUUuH4tbQkx7bvQXxxrDORM6Bc5lm8z5GnQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQgj0Lx-1KisZR7yKawCY51tstlhP5zNU5bQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe4XuXOxRMRFmInB7lPLy6H5b52F7PWg055Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTflpoqf9tnFXNUm_UQEX5VF5W2GHrwsmkxhw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzVhjz5TDOqLY8vhn7GSsHLMEwo6YsqnhxyQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwheHyA33BIblgie8_ICt0ECsJDlX8iFgFUw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAll23_ENcZtYCBAwRWTmqrV4GchDrn4m8BA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDsEg0IQSSCcFl8tuKFR3BV_H8AUWyJIviUA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDkxpy_s041PYVbUymCjeRDFVOtSjbXARCAA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRo4OgSrxbKg06gclMFHIYVR4xAAz4rg21bg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCvJHAgtaJaO9L2lP53x6tRxhAIUwlkzsQkw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnq2EIR_-JUBFHy3whu_4VwqcEmgKcInCkAA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpWZzNzbezV3KnqUOR6QCiIrTAFFGjF247tQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ63Va7EEVxQWayHqNuz3FT1Cqt4dq6ab8npA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZxCLL9Lm8mkQGhiuiO277anEgJCMTfVQNBg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDFU1q_-M0yXp_Dyr19PWNt7Ewo1BJMRK2FA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShyNJjdtBfxT87xh42IwtzjSVeUkWryAIQ2w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMS0vo0qN70o_YGh8vs2DeZVx2iB03VH3VZg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSks3pKcoWGuB2m3q6QpRzyLakfGG2M2aKgqw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD_pmCUxBMCNgj1VG81XaRvmrt7NjC_0Kz8g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjv13fMXeKKrO-tseeoDwTZRDY_JvJM8-axA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqBHb1EQYZ2DrVC8JppXOwMqI0OYcy5AuMZA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw9UD2KJZh0J0JsxPLMCMNjlhTJwdkNynjtw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuQvnaWO_oTXJiZfE-a_PCQ0odNZ88IMqFQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRohGLChAiyhM0CuFKv2DEcsUc2t30Oe8xupQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2x16FS1VwIxwu7fW2PIabOOstBMCrgZArRQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyms85QF-PF12_WTq4EGU4sL2m62NoeuquUw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFYzjj2tQm-9TTv8YgntiQvYsISrOKfEGb_A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyb12zgxiabG_MGY8mWiTKQp1Ca66eN_Yl_A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREe7FmboZgi6SwlR3vLPUc2IN4FW_l4K_cyg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk9ZFL4RuaE1aj-pmm_RmTm2I_L4bONvymuA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn0unHC0MyTvdplvLa3upGY3lX8E6ht4iR2A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMeJg1bCPOdoKrpCzhh2k0bjwO7BYf25mNTQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5TA1p69cK_qPIAaelfpMpJBtEfM8vqf9f0g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVNokcMfDCuqUG61XRtg0bNCaMs4HTMhc6Rw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQifrShryjd1ItB56oLOM-qtryV30RGowGHWQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZQEPlf10ghf8c_y0ZZIPkaUvxWBd7RSLGAQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfLMoaupCRJB-j0iIrFaWbA2ELqoplWkhzsw&s",
    "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpVW8UMd3Sp4N8pAwIKyCkv4lDxfkr00Ro8A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMRPQIP1ed42ON6syNpYqqsossQQ2uXcUrGQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoyEY5sd87DctGLcks0sJsIRufXmS05eo2vg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq-KN48tNioqiH892PfCKCY2qcsrDvgt6XIA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIoKs8LYq8g9aYHDHWrvbTxcQNX9B5jv0Lxw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyI5Feu65Aze70a04XhJPpiOxrwuzYNZXhlw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToNRWu5hHrbfQqZCenNh1MPoWf_WfuGBRzOw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPq4OIbcBODpq7t4SDGPllxaAlebEyOz0XZg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSFFCMZueSMKLYJH96mqRtHJHv7KTULTc_oA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP47-EexxS2RYPjhXp9_1jY7038scLmpkI2A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXQr_EgotLF9u3mUsLYQRrUmwTs2PDNazjYg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTYK56TyE3lf0J_hXdBb8APwqPCXmlkR14Vg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnd97zyAoo9p_rw-ybAaINDMBqzRvtb3aAYQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7eTlGWyVbQc8CHKdL84kPvwiaZSQAr640uw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLY4ZQg3e4-gWwrZtNVpE8i_KbW5WXjdR2Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8CRd-f5KRPXXcm3Ia6-jwlye8Rf0xrLRDeQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAn-U-aEyoIbM4gl-sQfZUaufgDa3SrWfINA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8izS259JboDDFUMQSD50j8DOSQIUQVLW9QA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxFuOjtTd5KU_MrCKjfcOaH-WYpZnR6KhZDw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdubkXPSY_safpKYovGbj3J0rXpQlQEEkCkA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReXlTFRjzmRAmQkFHqDzk4NvCESkfzh3OjqQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo_qG8gASROCrWYRC_wTf0WvniXJo2pahV0Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf7Mr5TWQXp7XSpvKFxDZgB1u6Hqfj5PdIBw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2Qg6DeLrdtU66XGav0yV41W-FBBGFyiDhFg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPId3E0QNqlCXkDwqZwQPSjc-P4Pk5JW-KhA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6RI5zJYoQki82YPQrUAy4cwJGaY3jBpVhcQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKQGW9DirRLQs6LLabl0IjQdyteNPQ7_qsyQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9CyLy0egztMxtHZnhQ5qTafwLay-bn_qYQA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfhe_jSVETgk3T7aMCBBLZzpfJnlx9ft8dVw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2qYfIoPqyF47mjd0_yeH2r802qMgdan-hhg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPuiLObfVh16NtjpOAlfN37Y1PWAG2pY7S1Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ar-NwhPT9j48O5bv4nYljZpanDeaCok06g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtl39fzZgNkVwL_UGKvW2aaGAix96-v-w5Jg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsETm-I4jxnqgfI8dSjeMQBWyYeGq-yU5cgQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWSTKc3h_2BpSJvU7xTn_RoAQwxbRJbhbzcw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNAumYiZCfXRz_rUbNqJsRP38aSuQVkpaHQg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo_5P6HFM0DlbrqV5LXN_yb9M7eZXxvoVBNQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkkPmmP6MdE1ktGbhMCBNBFVhaM8DvPLMakQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAzpw04-FQupEI0bsziDIAg7OaIoaCnWgDFA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReAWfkUUF3ggPRkjGNKnmzZZEPvTd82Du3Lg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtfEXc8hdjL0w8oBz10E2kmtbaQ36S577ZhA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlZhvKfz87D2ALu6xB7-J1zL5SEkn4sHhFQA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgouZkxMsBnYGSCinHL5UCxrXLNvvf9npXqA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkTJuyav7-6qMjW96ehDJ8z_-lj6-FVM1Xsg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSHUsybun8LbIHHxAIfQNYA5JiiYr0hhPunA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiAPJu1AMsOI6KQeDEkHEisHOqduPMqfVffA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-gVDAnlnXvbLVblAzOLY2xpxQSWBfFhVJDA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwchKlorhQvC9sc2Kp1EutlV0hsUh7njwetw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTsVwGo9rb8KjYjt75DFWwQQn7IygN00NT3g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJrSUMwuyzTw3eBQR5mnSf0WXhn0tCHa0FWA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYL7AVlT97KAye9dCgUe7xbWwCiv1Hc__0Jw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCtyQ0GKiS63upTQFEpGnu7FuNvOrMW9tWZQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrSKgBIS5xqGD7wIbBTXmIPHbWJiDJPhCxwg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHiYXcQ4bOrsIsSKdVHPtbW79AMVNyXFRBUg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_MjEj9LMEK-cZih0jzvDEIL9xPAQkzf0ZWQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPwEhtd93qlmOdIjbM8bhuwpfU-N8-LESFzA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRtYWgqdhBlKBgc--Htfrsn0vyj3h7NcNLFw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTVENOfsoAvX0azuC1tpyXOdRoEIZM8FRYQg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWWdV8uAWo6R93oBhAfg_CChXYgM0h_b3u7g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv_XTW_TXjy5BUlnapthXlWd8pqWD5Hyk5uQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMALnKneyj3H-0z4X1wyHu4gjNrbzEHzvHKw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9V_E37b9xdKTce-Al3JbE6uz96yfYuLMFFg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCIGj1FxOEbCjyYY7MN3y5yZD2xP-kdeb6Mg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkCLvKHc_dp8i5Abr6Bxeo1s1y6rLEp50C3A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgFoitzgqdf6vT4C16M04PZIk7Gf9pz9jXEQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyfSzyc8v5aQ8yaUzaqNUmKPKWyItQwq-IRw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDhT9BJM_Dhihls40L-ndH6CPenyx74efORw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGhDIEV4pN8f_8WAaDlWMt8d0Jxiy27UABwQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU10xfgo9kMqbRJbgv_UVKM9f34Nu1F3V7EA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsEd3dIoVlCdfQgi-IzsEmet7gQ_x5Ijg7Nw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToFQWxZVO8PSKTIJjE_ctkVd2Rl7KLsHJ21w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREGYAG8X70sNDp0AM5baw_5ki2mmRzguGHaQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUMpzjhbunR4wSlNAbJ_R4JfHf9I5Qt7Xl3Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwltSjuAXku539f6psBnF__ned6BXrRFL1jw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaZ8_h7DiCED2XH530cUGoyBow1pzxR1vtrQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKul9CUAVERECIr0jMr2BySGlMmskOD2pI7A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMH23Ehv53RLAnuCG5lwxsSOKlOeDwxGIvHw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO6gfBcYXwn6yBoOpNMq5-4Kh4l3n02SlcTA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT--3qYS7Vqa6e8DAvKtwMyKQyvP-Wnfht2PA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQocZxyhhjph3WCsF-IcflhQjOYzyhclo5ELg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdDmnPDh4J3z-KjjC0VyoOOaS9iBgWURsMkg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb18dBO-Hd2rtfcbjiBv6UWVhpuZY41Legyg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_mbT_epZvFnyCTNy6VHhG_FN1pa7E_R0zdg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7KUafNh4ctjYmt8uZvyY8lpKR3gb9LcDHhQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7FnlTZxycfVHh90VISj9Ei7zSUyBxZ9pxhA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb1RGI8jBc0RxALf4R8QgZugKMT8aK55aR6A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpPDFqy2OQuS00lYwRisLKtaXKa7h8PMiTSw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL7jaRpDeGyiCICBEFni-sFgOEMTY7b9lEXA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOkl_dOy2BSvgU8vxnMYG1K6JE_FNfUBp8VQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwBPCNF7gKPatkqtJIaRmoZSm3-xzdzvBNrg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxibvQRW3joN5bIUPB8OeQmreiLUxy1LAz5Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDYvfitlroiYS9nZy2Zot5llLR9_UIIbuUSg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDbfQ3QdUcrf3nwtgYgbVTNSXDBqrByPk95Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqsH2yqwFCDuK-S-f98xGxWNVyTsd6zE4HEw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpQjQW2FUtYtbfD48JikxVSoYyo6_36sATlg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4E6dsf3w8ng4z-CjIu9SGH-cFEjE0DuWf6w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXHZN-QqazUvvF186KBaNCJTzL2q7gTQQVcQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuCopB1SDT9RVD-YJ5gpGyS9BAnzL66JA7_Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST8apigs-xTvEu5t0uGsLBO_jd-L3HJXda4g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStSkbNv3Lxd6zuiDzzUPPVAwRMOnwH3rYtiA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGTjHinMrDOenRoTw-BHcSmiVbx5aVj7GQrA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFJrgRRYU2HnU2Uj9IqpsV3SgDT3_5CtsCUw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfoDVIAj4MBlp1NysmFmRGM6aFgXErt-flUw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR28w_s0O9MPRw9elhCllyi0epZR2CRW8kbQA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI-mHYuiNTKQLDkFjcZ2cJ1ZSCBEru8i3Uuw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFfVSlhlhuLxw0mdidQgE9YPgObTJSgaLLsA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe3FHWqX0616N4UoRaSjDAo43muiwgdkwHIA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8HRqs-Qjd6xj-_WRMBUioB8pxJLwo9Wy65A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiuTm_CxO4SsMf4kluvE31dtk-hbtzDr26vw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCD0IBiYo5KiWZ9iQg0AhRQhzhKCZdaZJXvg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUgc91z3G6-GyMKEJrHEa5GFFxclOWAvwssg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxqfYSxM55ugwZCKB7E_Bx110buaLNmjZgGA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6G8V_ovL6wz0HYHkcJfwoDAJbAseFbRuufQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_1idXg2nVGy4D84Cq0dgCVTZjs95kL1FL3Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1EqM1KYtoWUPFbR_TE0a4u40rhLgjRV1E0w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuSHLgot9r-X4LYSyxBdeplWIjZEE6eLEGeQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5fs5qxJixLk4ZHJogBIqD7Vn5mt2KwdDFCg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeYr2VITnlWpSgsghBKIpt5AALzhAKCmoMXw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTswrklgyPH2aCzxGBFWw2sKx4TUJUfWG2aag&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqk1kfAz8gPtDgTsqkxkrTkiLp9-hHbcEIuw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhRPrCDpKrg8XC8I1RmB0EYI-GLcEXwrfzlg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4QT8ad18cR0WcRK0SmUVI73lXHOHSV8GJtw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvQLNAorrdv4smCndGUQAy_5dDa5dEx1Tu0w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAlxiwyoFhAKi8FXuIEV46vNYmkSg1jrkhlg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvVnX8Asx_HEAuSTYZTOmevaVAI1wpwdzN4g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5NI9XDm8t9RCQrTN4uXBGigMFP9W9Ti4uWQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTopxQtdJeS2pm4vtP4dmQ37WBMgdrnG39Atg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW0tzfp7KG_psIXka_PCE2AV9E3Eqvc6YCig&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx8LSZz8agzUOnUsOpDpbVKRzZrOy98GCA1w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREBkl6nHRP5c8VyVpkcxxnTlGFSEKQ8BZu3g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzhKMnaOp1-PuFUdGawY4A0mf38bA-yM9pIQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnd6Y4yh1FKpvAE93_3CxhmFNwFhI6ViFa6w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7mhbv3niCUux7zxOj8svq29cQ-Dsn9D9Qsw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF791irpAETEWA39P-soOff5U88pXKChYqfQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJZ9Ry4sVk7Jwx5llaSXot0081jrXL3gG1rA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBrCIpzzconmCt4t3xg9JkJMVvgwJ8N8JH2w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvWkV6aOotz66lDDCt4wYyHUtFJVKrGAl6oA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMv8B4W0WrUo7ZpW4lBb20NzDzC4TSiHfqzQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2QRHW5g7K1rVeyXTM6QK4TN56eO287W9wCw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_yyM2I0HQmsYmiVx5Cq-6JMQ3rt0UeH8FKg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtQS_XSr_2ykaWB_-fjGptguos2wLsMx8EnA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIVFZPsgNdHp5kMyt5Lbt1p9QG2o8_PYbQKA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs9QF-bEE_AtoNjcs2dB7vkNlYfPDSTcK1HA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNNXm79BljALiJj-ZM8ZMmvg-mMNNbRKB4MA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT183k-6tooNtPdouv2O4d7rks8p596jxr8fw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsZnihMLEHk_oOheycGRddQuONVpYqJ7gi7g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvo8LXBdjeBfbVb3o9iivJTLVdXg8PrfNluA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXVNUJhqhCbFUHS10rljhL_p9VKkT9jE-u-Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBkXUfsGtNauXvLhd5Egezb4HRDvvnlyYtRA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxDv1slyhl-JsDB8XOY2oghUMzBkwjr47cpQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ49f6vcXfLnGrj8V8ezJRog0dsoOc-CwVCzg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbifiHWp7tUn9O8tZTA_Bz-jDySJQ6Oc89Tg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzy1LkEtkcpE2couLbDkatlhqt31nKrNWH-g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIBtLYwXsLwGZ6wlEtyXdbGjebiPtl8vcCEA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwldGJlt4CrcKhxldIBFOPLPsfj8Xi_D1g9g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZoUpJ0P0BpuRMa-1zEmR7kbRSZvk_PP9wig&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6gmeoXD6YX_E6WxhM7MWNUBJh5zCRNXBKNA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOjWEJRhw007NqlMaTdClCAyQ_B2wygAQQvw&s"
];

const App = () => {
    const [images, setImages] = useState<string[]>([]);
    const [complete, setComolete] = useState<boolean>(false);

    useEffect(() => {

        if (images.length > 0) {
            // Images have been rendered, so initialize fjGallery
            fjGallery(document.querySelectorAll('.gallery'), {
                itemSelector: '.gallery__item',
                rowHeight: 150,
                lastRow: 'start',
                gutter: 20,
                rowHeightTolerance: 0.1,
                calculateItemsHeight: false,
            });
            setComolete(true); // Set the gallery as complete
        }

    }, [images]);

    return (
        <>
            <button onClick={() => setImages(a)}>aaaaa</button>
            <LightGallery
                plugins={[lgZoom, lgThumbnail]}
                mode="lg-fade"
                pager={false}
                thumbnail={true}
                galleryId={'nature'}
                autoplayFirstVideo={false}
                elementClassNames={'gallery'}
                mobileSettings={{
                    controls: false,
                    showCloseIcon: false,
                    download: false,
                    rotate: false,
                }}
            >
                {
                    images.map((src, i) => {
                        // if(images.length === i + 1) {
                        //     setComolete(true);
                        // }

                        return (
                            <a
                                key={i}
                                className="gallery__item"
                                data-src={src}
                            >
                                <img
                                    className="img-responsive"
                                    src={src}
                                    style={{width: '100%'}}
                                />
                            </a>
                        )
                    })
                }
            </LightGallery>
        </>
    );
}

root.render(
    <App />
);
