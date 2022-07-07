import urllib.parse
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import chromedriver_binary
from album.models import UserImage
import time

# 定数定義
SEARCH_NUM  = "20"
TIMEOUT     = .5

# オプション設定
options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument("--disable-gpu")
options.add_argument("--window-size=800,600")
options.add_argument("--disable-extensions")
options.add_argument("--disable-dev-shm-usage")
# options.add_argument('--proxy-server="direct://"')
# options.add_argument("--proxy-bypass-list=*")
# options.add_argument("--start-maximized")

class ScarpingImage():

    # クラス変数(オプション設定)
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=800,600")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-dev-shm-usage")
    options.binary_location = "/usr/local/bin/chromedriver"
    # options.add_argument('--proxy-server="direct://"')
    # options.add_argument("--proxy-bypass-list=*")
    # options.add_argument("--start-maximized")

    def __init__(self, search_num="20", timeout=0.5, options=options):
        self.search_num = search_num
        self.timeout = timeout
        self.options = options
        self.driver: webdriver.Chrome = webdriver.Chrome(options=options)
    
    @classmethod
    def exec(self, params, word, pk):
        """スクレイピング実行

        Extended description of function.

        Args:
            word (str): スクレイピング時のキーワード
            pk (str): ユーザーID

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

            images = self.driver.find_elements_by_xpath('//a[@class="wXeWr islib nfEiy"]/div/img')

            for image in images:
                src = self.check_saved_image(image.get_attribute("src"), pk)
                if not(src is None):
                    if(bool(len(src) <= 200)):
                        images_links.append(src)
            
            params['word'] = word
            params['link_list'] = images_links

            # 処理が終了した場合、Trueを返す
            result = True
        except :
            result = False

        self.driver.quit()

        return result
    
    @classmethod
    def check_saved_image(src, pk):
        models = UserImage
        objects = models.objects.filter(pk=pk)
        url = None
        if(bool(objects.count() != 0)):
            for object in objects:
                if(bool(object.link != src)):
                    url = src
                else:
                    url = None
                    break
        else:
            url = src
        return url
        

def scraping_images(word, pk):

    # DRIVER_PATH = "/usr/local/bin/chromedriver" #chromedriverの場所
    driver = webdriver.Chrome(options=options)

    word_quote = urllib.parse.quote(word)

    url = "https://www.google.com/search?q=" + word_quote + "&source=lnms&tbm=isch&num=" + SEARCH_NUM

    driver.get(url) #指定のURLでブラウザ（Chrome)へアクセス

    #適当に下までスクロールしてる--
    for t in range(10):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(TIMEOUT) #サーバーの負荷を軽減するためのもの

    images = driver.find_elements_by_xpath('//a[@class="wXeWr islib nfEiy"]/div/img')

    images_links = []

    for image in images:
        src = check_saved_image(image.get_attribute("src"), pk)
        if not(src is None):
            if(bool(len(src) <= 200)):
                images_links.append(src)

    driver.quit()
    
    return word, images_links

#保存してある画像か判定
def check_saved_image(src, pk):
    models = UserImage
    objects = models.objects.filter(pk=pk)
    url = None
    if(bool(objects.count() != 0)):
        for object in objects:
            if(bool(object.link != src)):
                url = src
            else:
                url = None
                break
    else:
        url = src
    return url

if __name__ == "__main__":
    scraping = ScarpingImage()
    images = scraping.exec("本田翼")
