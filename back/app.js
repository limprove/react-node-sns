const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const postsRouter = require('./routes/posts');
const db = require('./models');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const passportConfig = require('./passport');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
dotenv.config();

db.sequelize
  .sync()
  .then(() => {
    console.log('db connect!');
  })
  .catch(() => {
    console.error;
  });

passportConfig();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('good!');
});

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log(`SESRVER RUNNING AT PORT 3065`);
});
