const express = require('express');
const bodyParser = require('body-parser');
//const cors = require('cors');
const app = express();

var currentUser;

/*var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
*/

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//app.use(bodyParser.json());

app.listen(3100, () => {
  console.log('Server Started!');
});

app.route('/api/bookstore').get((request, response) => {
  response.send(BOOKSTORE);
});

app.route('/api/bookstore').post((request, response) => {
  let bookstore = request.body;

  const firstId = BOOKSTORE ? Math.max.apply(null, BOOKSTORE.map(courseIterator => courseIterator.id)) + 1 : 1;
  bookstore.id = firstId;
  BOOKSTORE.push(bookstore);
  

  response.status(201).send(bookstore);
});

app.route('/api/bookstore/:id').put((request, response) => {
  const courseId = +request.params['id'];
  const bookstore = request.body;

  const index = BOOKSTORE.findIndex(courseIterator => courseIterator.id === courseId);
  BOOKSTORE[index] = bookstore;

  response.status(200).send(bookstore);
});

app.route('/api/bookstore/:id').get((request, response) => {
  const courseId = +request.params['id'];

  response.status(200).send(BOOKSTORE.find(courseIterator => courseIterator.id === courseId));
});

app.route('/api/bookstore/:id').delete((request, response)=> {
  const courseId = +request.params['id'];
  BOOKSTORE = BOOKSTORE.filter(courseIterator => courseIterator.id !== courseId);
  
  response.status(204).send({});
});

var BOOKSTORE = [
    {
        id: 1,
		name: "Book1",
		price: 24,
		quantity: 1,
		category: "action",
		img: "img1"
    },
    {
       id: 2,
		name: "Book2",
		price: 25,
		quantity: 2,
		category: "action",
		img: "img2"
    },
    {
       id: 3,
		name: "Book3",
		price: 26,
		quantity: 3,
		category: "action",
		img: "img3"
    }
];
