FROM ubuntu:18.04

# 変数定義
ENV PYTHONIOENCODING utf-8
ENV PYTHONUNBUFFERED 1
ENV LANG="en_US.utf8"
ENV LC_ALL="en_US.UTF-8"
ENV LC_LANG="en_US.UTF-8"

RUN set -x && \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get clean

# パッケージのダウンロード
RUN set -x && \
    apt-get install -y sudo \
    vim \
    wget \
    git \
    init \
    curl \
    systemd \
    apache2 \
    apache2-dev \
    libapache2-mod-wsgi-py3 \
    gcc \
    libmariadb-dev \
    unzip \
    language-pack-ja \
    libjpeg-dev \
    zlib1g-dev \
    openssh-server \
    openssh-client

RUN sudo apt-get update && \
    sudo apt-get install --no-install-recommends -y build-essential software-properties-common && \
    sudo add-apt-repository -y ppa:deadsnakes/ppa && \
    sudo apt-get install -y python3.7 \
    python3.7-dev \
    python3.7-distutils && \
    sudo apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# pythonのバージョン切替(デフォルトだと2.7系が使われているため)
RUN sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.6 1
RUN sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.7 2

RUN sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.6 1
RUN sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.7 2

RUN sudo update-alternatives --set python /usr/bin/python3.7

RUN localedef -f UTF-8 -i en_US en_US.UTF-8

# Upgrade pip to latest version
RUN curl -s https://bootstrap.pypa.io/get-pip.py -o get-pip.py && \
    python3 get-pip.py --force-reinstall && \
    rm get-pip.py

# google-chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add && \
echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list && \
apt-get update && \
apt-get install -y google-chrome-stable

# インストールしたChromeとPythonのchromedriver-binaryのバージョンが合わない場合があるので、
# google-chromeのバージョン情報から バージョンの近いものを pip installする
RUN google-chrome --version | perl -pe 's/([^0-9]+)(.+)./$2/g' > chrome-version

# chromedriver
RUN wget https://chromedriver.storage.googleapis.com/103.0.5060.53/chromedriver_linux64.zip && \
unzip chromedriver_linux64.zip && \
sudo mv chromedriver /usr/local/bin/ && \
rm chromedriver_linux64.zip

# RUN google-chrome --version | perl -pe 's/([^0-9]+)([0-9]+\.[0-9]+).+/$2/g' > chrome-version
RUN pip3 install chromedriver-binary~=103.0.5060.53
RUN rm chrome-version

# requtirements.txtに書かれているモジュールをインストール
RUN mkdir /var/www/html/opt
ADD config/docker/requirements.txt /var/www/html/opt
WORKDIR /var/www/html/opt
RUN pip3 install --upgrade pip setuptools
RUN pip3 install --upgrade -r requirements.txt

# apacheの設定
ADD config/apache2/wsgi.conf /etc/apache2/sites-available/
# ADD config/apache2/envvars /etc/apache2/envvars/
RUN sudo a2ensite wsgi
RUN sudo a2enmod wsgi
RUN sudo a2dissite 000-default.conf
RUN echo "ServerName localhost" | tee /etc/apache2/conf-available/fqdn.conf
RUN a2enconf fqdn
CMD apachectl -D FOREGROUND

# sshの設定
RUN mkdir ~/.ssh
RUN ssh-keygen -q -t rsa -N '' -f ~/.ssh/id_rsa

# 初期ディレクトリの変更
WORKDIR /var/www/html

# CMD /sbin/init
# RUN sudo /etc/init.d/apache2 start