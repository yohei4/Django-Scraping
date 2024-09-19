FROM python:3.12.2

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# update and upgrade and chache clear.
RUN set -x && \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get clean

# install package.
RUN set -x && \
    apt-get install -y sudo \
    vim \
    wget \
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

# setting locale japanese.
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

# python library install.
RUN mkdir ./app
ADD backend/config/docker/requirements.txt ./app
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools
RUN pip install -r ./app/requirements.txt