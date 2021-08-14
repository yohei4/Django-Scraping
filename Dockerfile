FROM ubuntu:18.04

ENV PYTHONUNBUFFERED 1
ENV LANG="en_US.utf8"
ENV LC_ALL="en_US.UTF-8"
ENV LC_LANG="en_US.UTF-8"

RUN mkdir /home/django/
WORKDIR /home/django/

RUN set -x && \
    apt update && \
    apt upgrade -y

#パッケージのダウンロード
RUN set -x && \
    apt-get install -y sudo \
    vim \
    wget \
    python3 \
    python3-pip \
    init \ 
    systemd \
    apache2 \
    apache2-dev \
    libapache2-mod-wsgi \
    gcc \
    libmariadb-dev \
    unzip \
    language-pack-ja

RUN localedef -f UTF-8 -i en_US en_US.UTF-8

# google-chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add && \
echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list && \
apt-get update && \
apt-get install -y google-chrome-stable

#pythonのバージョン切替(デフォルトだと2.7系が使われているため)
RUN sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.6 1

#
# インストールしたChromeとPythonのchromedriver-binaryのバージョンが合わない場合があるので、
# google-chromeのバージョン情報から バージョンの近いものを pip installする
#
RUN google-chrome --version | perl -pe 's/([^0-9]+)([0-9]+\.[0-9]+).+/$2/g' > chrome-version
RUN pip3 install chromedriver-binary~=`cat chrome-version` && rm chrome-version

#requtirements.txtに書かれているモジュールをインストール
ADD requirements.txt /home/django/
RUN pip3 install -r requirements.txt

#apacheの設定
ADD wsgi.conf /etc/apache2/sites-available/
RUN sudo a2ensite wsgi
RUN echo "ServerName localhost" | tee /etc/apache2/conf-available/fqdn.conf
RUN a2enconf fqdn

CMD /sbin/init
# RUN sudo /etc/init.d/apache2 start