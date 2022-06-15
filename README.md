# Node REST API Starter


Ref: 
Swagger docs: https://swagger.io/docs/specification/basic-structure/


Will update soon..




---

NOTE: Don't forget to switch node version 14.17.4
```
docker build . -t <your username>/node-web-app
```

```
docker run -itdp 3000:3000 --env-file .env.prod <username>/todo-api
```


```
docker run -itd --env-file .env.prod --network=host <username>/todo-api
```
