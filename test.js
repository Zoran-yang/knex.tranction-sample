
import express from "express"
import knex from 'knex'
const app = express();

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'test'
  }
});

app.listen(3000, () => {
    console.log(`Server is working!!!!!!!!!`)
  })

//解析使用者需求
app.use(express.json())

app.get("/", (req, res) => {
    db.transaction(function(trx) {

        const books = [
          {title: 'Canterbury Tales'},
          {title: 'Moby Dick'},
          {title: 'Hamlet'}
        ];
     
        return trx
          .insert({name: 'Old Books'}, 'id')
          .into('catalogues')
          .then(function(ids) {
            books.forEach((book) => book.catalogue_id = ids[0].id);
            return trx('books').insert(books);
          });
      })
      .then(function(inserts) {
        console.log(inserts)
        console.log(inserts.rowCount + ' new books saved.');
        res.json(inserts.rowCount + ' new books saved.')
      })
      .catch(function(error) {
        console.error(error);
      });

    // const books = [
    //     {title: 'Canterbury Tales'},
    //     {title: 'Moby Dick'},
    //     {title: 'Hamlet'}
    // ];

    // db.insert({name: 'Old Books'}, 'id').into('catalogues')
    // .then(function(ids) {
    //     books.forEach((book) => book.catalogue_id = ids[0].id);
    //     return db('books').insert(books);
    //     })
    // .then(function(inserts) {
    //     console.log(inserts.rowCount + ' new books saved.');
    //     res.json(inserts.rowCount + ' new books saved.')
    // })
    // .catch(function(error) {
    //     console.error(error);
    // });
})