import time
import urllib.parse
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

class ScarpingImage():
    search_num: int = 0
    timeout: float = 0.5
    safe: bool = False
    driver: webdriver.Chrome | None = None
    url: str | None = None

    _options: Options = None
    _width: int = 0
    _height: int = 0

    @property
    def options(self):
        if self._options is None:
            self._options = Options()
            self._options.add_argument("--headless")
            self._options.add_argument("--no-sandbox")
            self._options.add_argument("--disable-gpu")
            self._options.add_argument(f"--window-size={self._width},{self._height}")
            self._options.add_argument("--disable-extensions")
            self._options.add_argument("--disable-dev-shm-usage")
        return self._options

    def __init__(self, search_num=10, timeout=0.5, width=1920, height=1080, safe=True):
        self.search_num = search_num
        self.timeout = timeout
        self._width = width
        self._height = height
        self.safe = safe
        self.url = ''
        self.driver = None
        self._options = None

    def start_driver(self):
        if self.driver is None:
            self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=self.options)

    def stop_driver(self):
        if self.driver:
            self.driver.quit()
            self.driver = None
    
    def exec(self, word, page=1):
        """スクレイピング実行

        Extended description of function.

        Args:
            word (str): スクレイピング時のキーワード

        Returns:
            result: bool
        """
        # 変数定義
        images_links = set()
        try :
            self.start_driver()

            # URL生成
            query_params = {
                "q": word,
                "source": "lnms",
                "tbm": "isch",
                "num": self.search_num,
                "safe": "on" if self.safe else "off",
                "start": (page - 1) * self.search_num,
            }
            self.url = f"https://www.google.com/search?{urllib.parse.urlencode(query_params)}"

            # 指定のURLでブラウザ(Chrome)へアクセス
            self.driver.get(self.url)

            # 適当に下までスクロールしてる
            for _ in range(2):
                self.driver.execute_script(f"window.scrollTo(0, document.body.scrollHeight)")
                time.sleep(self.timeout) #サーバーの負荷を軽減するためのもの

            # 画像を取得
            images = self.driver.find_elements(by=By.XPATH, value="//g-img/img")
            for image in images:
                src = image.get_attribute("src")
                if not(src is None):
                    if(bool(len(src) <= 100)):
                        images_links.add(src)

            # 処理が終了した場合、Trueを返す
            result = True
        except Exception as e:
            result = False
        finally :
            self.stop_driver()

        return result, list(images_links)
