import urllib.parse
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import chromedriver_binary
from album.models import UserImage
import time

SEARCH_NUM  = "20"
TIMEOUT     = .5

options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
# options.add_argument("--disable-gpu")
# options.add_argument("--disable-extensions")
# options.add_argument('--proxy-server="direct://"')
# options.add_argument("--proxy-bypass-list=*")
# options.add_argument("--start-maximized")

# DRIVER_PATH = "/usr/local/bin/chromedriver" #chromedriverの場所
driver = webdriver.Chrome(options=options)

def scraping_images(word, pk): 

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
    images = scraping_images("本田翼")
    print(images)
