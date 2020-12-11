const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const cors = require('cors');
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('db connect!');
  })
  .catch(() => {
    console.error;
  });

app.use(
  cors({
    origin: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('good!');
});

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log(`SESRVER RUNNING AT PORT 3065`);
});
