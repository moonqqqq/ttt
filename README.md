# Rules
1. we use yarn

# Running server
```

# dev
docker build -t any-tag-you-want -f Dockerfile.dev . 

docker run -p 3000:3000 -v $(pwd):/app my-nest-app-dev 

# prod
// need to set 
```