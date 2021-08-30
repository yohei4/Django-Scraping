# SCraping_app

"SCraping_app" is an application that you can experience scraping.
 
# DEMO
 
You can learn how to using Django and mod-wsgi,apache2,docker.
 
# Requirement
 
* Docker version 20.10.6
 
# Usage
 
DEMOの実行方法など、"SCraping_app"の基本的な使い方を説明する
 
```bash
git clone git@github.com:yohei4/Django-Scraping.git
cd examples
```

# Installation
 
1. Install docker
https://www.docker.com/products/docker-desktop

2. Command input from top to bottom
 
```bash
docker-compose build
docker-compose up -d
docker exec -it app /bin/bash 
```
```In the container
cd /var/www/app/Personal_development
python manage.py migrate
```
 
# Author
 
* yohei takabayashi
 
# License
 
"SCraping_app" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).
 
"SCraping_app" is Confidential.
