<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Epayco Test: Daniel Morao Nishimura

This is the repository for the Epayco test Backend project, to run the repo:

1. Clone the project
2. Install the dependencies using

```
npm install
```

3. clone the file `.env-example` and rename it to `.env` using the provided vairables values
4. Create and start the containers with

```
docker-compose build

docker-compose up
```

5. Whenever you make a payment Check for the emails in the SMTP server on your browser at [http://localhost:1080](http://localhost:1080)

6. You can use the file `Epayco.postman_collection.json` to import it in Postman and test the endpoints
