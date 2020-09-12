# Develop Story
- Blog Service : <https://www.develop-story.com/>  
- Updated : 2020.09.12  

![image](https://github.com/SimDaeSoo/develop-story/blob/master/.assets/001.png?raw=true)  
Blog Service for develop history, diary  
this service used `next.js`, `strapi`, `docker`, `circleci`, `toast-ui-editor2.0`, `aws-ecs`, and more... 

## Before development mode Run
please remove `/strapi/config/plugin.js` because developmode does't using `aws-s3`  

## How To Run
### Mac OSX & Linux
```shell
# Develop Mode
# just typping docker-compose up! then service be running
$ docker-compose up --build
$ docker-compose run strapi bash -c "yarn cli setProvider" # for google provider
```  

### Windows
```shell
# Develop Mode
# please change shell file type 'CRLF' to 'LF'
# show this - https://blog.thecraftingstrider.net/posts/tech/2019.09/vscode-line-endings-and-bash-script/ 
$ docker-compose up
$ docker-compose run strapi bash -c "yarn cli setProvider" # for google provider
```

## Tools & Environments...
### Docker
![image](https://github.com/SimDaeSoo/develop-story/blob/master/.assets/002.png?raw=true) 

### Node.js Image v12.x.x LTS
![image](https://github.com/SimDaeSoo/develop-story/blob/master/.assets/003.png?raw=true) 

### Next.js v9.5.2 
![image](https://github.com/SimDaeSoo/develop-story/blob/master/.assets/004.png?raw=true) 

### StrAPI (v3.1.4)
![image](https://github.com/SimDaeSoo/develop-story/blob/master/.assets/005.png?raw=true) 

### AWS (ECS, S3, Route53, ALB, EC2, more...)
![image](https://github.com/SimDaeSoo/develop-story/blob/master/.assets/006.png?raw=true) 

### CircleCI (Build & Deploy)
![image](https://github.com/SimDaeSoo/develop-story/blob/master/.assets/007.png?raw=true) 

## Development Documents
- Docker - <https://www.docker.com/>  
- NginX - <https://www.nginx.com/>  
- StrAPI - <https://strapi.io/>  
- Next.js - <https://nextjs.org/>  
