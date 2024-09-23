FROM python:3.12.2

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Update and upgrade and chache clear.
RUN set -x && \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get clean

# Install package.
RUN set -x && \
    apt-get install -y sudo \
    vim \
    wget \
    gnupg2 \
    git \
    init \
    curl \
    systemd \
    gcc \
    libmariadb-dev \
    unzip \
    locales \
    libjpeg-dev \
    zlib1g-dev \
    openssh-server \
    openssh-client

RUN wget -q -O /etc/apt/trusted.gpg.d/google.gpg https://dl.google.com/linux/linux_signing_key.pub \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E88979FB9B30ACF2 \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install ChromeDriver
RUN CHROMEDRIVER_VERSION=$(wget -qO- https://chromedriver.storage.googleapis.com/LATEST_RELEASE) && \
    wget -N "https://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip" && \
    unzip chromedriver_linux64.zip && \
    mv chromedriver /usr/local/bin/chromedriver && \
    chmod +x /usr/local/bin/chromedriver && \
    rm chromedriver_linux64.zip

# Setting locale japanese.
RUN locale-gen ja_JP.UTF-8

# Change host user.
ARG UID=1000
ARG GID=1000
ARG USER=yohei
ARG GROUP=yohei
ARG PASS=yohei
RUN groupadd -g $GID $GROUP && \
    useradd -m -s /bin/bash -u $UID -g $GID -G sudo $USER && \
    echo $USER:$PASS | chpasswd && \
    echo "$USER ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
USER ${USER}:${GROUP}
WORKDIR /home/${USER}

# Install python library.
RUN mkdir ./app
ADD backend/config/docker/requirements.txt ./app
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools
RUN pip install -r ./app/requirements.txt