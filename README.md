# Scraping_app

"Scraping_app" is an application that you can experience scraping.
 
# DEMO
 
You can learn how to using Django and mod-wsgi,apache2,docker.
 
# Requirement
 
* Docker version 20.10.6
 
# Usage
 
```bash
git clone git@github.com:yohei4/Django-Scraping.git
cd examples
```

# Installation
 
## Developer 
1. Install [Docker](https://www.docker.com/products/docker-desktop)

2. Install extensions in VS Code
    - Extensions
        - Remote Container
        - Remote Development

3. Start Remote Container

4. Execute the following command
    - Extensions
        - cd src/
        - mkdir static
        - python manege.py collectstatic

## User
1. Install [Docker](https://www.docker.com/products/docker-desktop)

2. Command input from top to bottom
    - bash
        - docker-compose build
        - docker-compose up -d
    - In the container
        - docker exec -it app /bin/bash 
        - cd /var/www/html/Personal_development
        - python manage.py migrate
    - Start Apache2
        - sudo /etc/init.d/apache2 start
 
# Author
 
* yohei takabayashi
 
# License
 
"Scraping_app" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).
 
"Scraping_app" is Confidential.
