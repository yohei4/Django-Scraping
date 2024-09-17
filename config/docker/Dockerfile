FROM python:3

# ENV PYTHONUNBUFFERED 1
# ENV PYTHONDONTWRITEBYTECODE 1

# RUN mkdir /app
# ADD config/docker/requirements.txt /app
# WORKDIR /app
# RUN pip install -r requirements.txt

# Change host user.
# ARG UID=1000
# ARG GID=1000
# ARG USER=yohei
# ARG GROUP=yohei
# ARG PASS=yohei
# RUN groupadd -g $GID $GROUP && \
#     useradd -m -s /bin/bash -u $UID -g $GID -G sudo $USER && \
#     echo $USER:$PASS | chpasswd && \
#     echo "$USER ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
# USER ${USER}:${GROUP}
# WORKDIR /home/${USER}