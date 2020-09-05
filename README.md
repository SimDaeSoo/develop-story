# Template
- Updated : 2020.07.28  
Default template of creating basic web service.  

## Dependecies Version
- Docker Compose (v3.8)  
- Base Node.js Image (LTS v12.x.x)
- Next.js (v9.5.0)  
(Update when 0.1.0 version changed)  
- StrAPI (v3.1.4)  
(Update when 0.1.0 version changed)  

## Service Port Info
- 80 Port - NginX Server  
- 1337 Port - StrAPI Server  
- 3000 Port - Next.js Server  
- 3306 Port - MySQL Server  

## How To Run
### Mac OSX & Linux
```shell
# Develop Mode
# just typping docker-compose up! then service be running
$ docker-compose -f docker-compose.yml up --build
$ docker-compose run strapi bash -c "yarn cli setProvider" # for google provider

# Production Mode
$ docker-compose -f docker-compose-prod.yml up --build
$ docker-compose run strapi bash -c "yarn cli setProvider" # for google provider
```  

### Windows
```shell
# Develop Mode
# please change shell file type 'CRLF' to 'LF'
# show this - https://blog.thecraftingstrider.net/posts/tech/2019.09/vscode-line-endings-and-bash-script/ 
$ docker-compose up
$ docker-compose run strapi bash -c "yarn cli setProvider" # for google provider

# Production Mode
$ docker-compose -f docker-compose.yml up --build
$ docker-compose run strapi bash -c "yarn cli setProvider" # for google provider
```

## Development Documents
- Docker - <https://www.docker.com/>  
- NginX - <https://www.nginx.com/>  
- StrAPI - <https://strapi.io/>  
- Next.js - <https://nextjs.org/>  
