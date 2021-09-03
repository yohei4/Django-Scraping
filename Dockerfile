FROM ubuntu:18.04

ENV PYTHONIOENCODING utf-8
ENV PYTHONUNBUFFERED 1
ENV LANG="en_US.utf8"
ENV LC_ALL="en_US.UTF-8"
ENV LC_LANG="en_US.UTF-8"

WORKDIR /var/www/app

RUN set -x && \
    apt-get update && \
    apt-get upgrade -y

#パッケージのダウンロード
RUN set -x && \
    apt-get install -y sudo \
    vim \
    wget \
    git \
    init \ 
    systemd \
    python3 \
    python3-pip \
    apache2 \
    apache2-dev \
    libapache2-mod-wsgi-py3 \
    gcc \
    libmariadb-dev \
    unzip \
    language-pack-ja

#pythonのバージョン切替(デフォルトだと2.7系が使われているため)
RUN sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.6 1

RUN localedef -f UTF-8 -i en_US en_US.UTF-8

# google-chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add && \
echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list && \
apt-get update && \
apt-get install -y google-chrome-stable


# インストールしたChromeとPythonのchromedriver-binaryのバージョンが合わない場合があるので、
# google-chromeのバージョン情報から バージョンの近いものを pip installする
RUN google-chrome --version | perl -pe 's/([^0-9]+)([0-9]+\.[0-9]+).+/$2/g' > chrome-version
RUN pip3 install chromedriver-binary~=`cat chrome-version` && rm chrome-version

#requtirements.txtに書かれているモジュールをインストール
ADD requirements.txt /var/www/app/
RUN pip3 install -r requirements.txt

#apacheの設定
ADD apache2/wsgi.conf /etc/apache2/sites-available/
ADD apache2/envvars /etc/apache2/envvars
RUN sudo a2ensite wsgi
RUN sudo a2enmod wsgi
RUN sudo a2dissite 000-default.conf
RUN echo "ServerName localhost" | tee /etc/apache2/conf-available/fqdn.conf
RUN a2enconf fqdn
WORKDIR /

CMD apachectl -D FOREGROUND
# CMD /sbin/init
# RUN sudo /etc/init.d/apache2 start