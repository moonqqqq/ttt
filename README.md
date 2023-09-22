# Rules
1. we use yarn
2. we use prisma

# Folder Structure
Each module will have below files
controller / service / repository / dto

## 1. Controller
Handler for req, res

## 2. Service
Business logic is heare

## 3. Repository
1. Only for database related code. **Not business logic**
2. The functions on repository Shouldn't throw exceptions not to make the limitation usability

## 4. DTO
validation, sanitization, type change, etc..

# Running server
## Docker
Dev
```
docker build -t any-tag-you-want -f Dockerfile.dev . 

docker run -p 3000:3000 -v $(pwd):/app any-tag-you-want
```

## Docker Compose
### DEV/LOCAL
```
// need to install because docker use volume
1. run "yarn install"

2. set ".env.dev" file

3. run "docker compose -f docker-compose-dev.yml up"
```

### PROD
```
1. set ".env.prod" file

2. run "docker compose -f docker-compose-prod.yml up"
```

# TODO
1. database connection
2. cache
3. socialLogin
4. fcm
5. socket


# Thinking
1. Make sure what type of value will be used on each layers
entity, DTO, VO etc..