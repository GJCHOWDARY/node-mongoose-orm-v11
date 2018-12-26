const http = require('http'),
      express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      app = express();

// const db = require(path.resolve('util')).dbConfig;
// const mongoConnect = require('./util/db').mongoConnect;
const User = require('./models/user');


app.set('view engine','ejs');
// TODO: views/template path
app.set('views','views')
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public') ))

app.use((req, res, next) => {
  User.findById('5c23d8e42618960e4951e6e6')
    .then(user => {
      req.user = user;
      console.log(req.user,"ffff");
      next();
    })
    .catch(err => console.log(err));
});

const helpers = require('./util/helpers');

const admin = require('./routes/admin'),
      user = require('./routes/user'),
      customer = require('./routes/customer'),
      product = require('./routes/product'),
      test = require('./routes/test'),
      index = require('./routes/index'),
      shopRoutes = require('./routes/shop');

      app.use('/',index);
      app.use('/users',user);
      app.use('/admin',admin);
      app.use('/customer',customer);
      app.use('/product',product);
      app.use('/test',test);
      app.use(shopRoutes);


//  mongoConnect(client => {
//   app.listen(3000);
// });
mongoose.connect('mongodb+srv://chowdary:kRJMXOMYERaHOJj2@cluster0-h8j8p.mongodb.net/chowdary-mongoose?retryWrites=true', { useNewUrlParser: true })
.then(result => {
  console.log("Connected to Mongoose");
  User.findOne().then(user => {
    if (!user) {
    const user = new User({
     name: 'Honey',
     email: 'Honey@gmail.com',
     cart: {items: []}
      });
     user.save();
    }
  })
  app.listen(3000);
})
.catch(err => {
  console.log(err);
})
