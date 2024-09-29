import time
import urllib.parse
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

# 定数定義
SEARCH_NUM  = "20"
TIMEOUT     = .2

# オプション設定
options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument("--disable-gpu")
options.add_argument("--disable-dev-shm-usage")
# options.add_argument("--disable-extensions")
options.add_argument("--window-size=1920,1080")
# options.add_argument('--proxy-server="direct://"')
# options.add_argument("--proxy-bypass-list=*")
# options.add_argument("--start-maximized")

class ScarpingImage():

    search_num:int = 0
    timeout:float = 0.5
    driver: webdriver.Chrome | None = None

    # クラス変数(オプション設定)
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-dev-shm-usage")
    options.binary_location = "/usr/local/bin/chromedriver"
    # options.add_argument('--proxy-server="direct://"')
    # options.add_argument("--proxy-bypass-list=*")
    # options.add_argument("--start-maximized")

    def __init__(self, search_num=20, timeout=0.5, options=options):
        self.search_num = search_num
        self.timeout = timeout
        self.options = options or self.options
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    
    @classmethod
    def exec(self, word):
        """スクレイピング実行

        Extended description of function.

        Args:
            word (str): スクレイピング時のキーワード

        Returns:
            result: bool
        """
        # 変数定義
        url = ""
        word_quote = ""
        images = []
        images_links = []
        result = False

        try :
            # URL生成
            word_quote = urllib.parse.quote(word)
            url = "https://www.google.com/search?q=" + word_quote + "&source=lnms&tbm=isch&num=" + self.search_num

            # 指定のURLでブラウザ(Chrome)へアクセス
            self.driver.get(url)

            #適当に下までスクロールする
            for t in range(10):
                self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
                #サーバーの負荷を軽減するためのもの
                time.sleep(self.timeout)

            images = self.driver.find_elements(by=By.XPATH, value='//a[@class="wXeWr islib nfEiy"]/div/img')

            for image in images:
                src = image.get_attribute("src")
                if not(src is None):
                    if(bool(len(src) <= 100)):
                        images_links.append(src)

            # 処理が終了した場合、Trueを返す
            result = True
        except :
            result = False

        # self.driver.quit()

        return result, images_links
        

def scraping_images(word):

    # DRIVER_PATH = "/usr/local/bin/chromedriver" #chromedriverの場所
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    word_quote = urllib.parse.quote(word)

    url = "https://www.google.com/search?q=" + word_quote + "&source=lnms&tbm=isch&num=" + SEARCH_NUM

    driver.get(url) #指定のURLでブラウザ（Chrome)へアクセス

    # 適当に下までスクロールしてる
    for t in range(10):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(TIMEOUT) #サーバーの負荷を軽減するためのもの

    images = driver.find_elements(by=By.XPATH, value='//g-img/img')

    images_links = []

    for image in images:
        src = image.get_attribute("src")
        if src is not None and len(src) <= 100:
            images_links.append(src)

    driver.quit()
    
    return word, images_links

if __name__ == "__main__":
    # word, images_links = scraping_images('羽咲みはる')
    # print(word, images_links)
    scraping = ScarpingImage(options=options)
    result, images = scraping.exec("本田翼")
    print(result, images)
