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
Dev
```
docker build -t any-tag-you-want -f Dockerfile.dev . 

docker run -p 3000:3000 -v $(pwd):/app my-nest-app-dev 
```

Prod
```
// TODO
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