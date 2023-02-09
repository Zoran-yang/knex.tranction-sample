# knex.tranction-sample

1. Clone this repo
2. Run `npm install`
3. Run `npm start`
4. create a database :
   createdb -U postgres test
5. enter the database
   psql -U postgres test
6. create two table :
   CREATE TABLE catalogues (name TEXT,id BIGSERIAL);
   CREATE TABLE books (title TEXT ,catalogue_id BIGINT, id BIGSERIAL);
7. use postman send " get http://localhost:3000/ "
8. get the result
