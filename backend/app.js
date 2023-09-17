const bodyParser = require("body-parser");
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
var session = require('express-session')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Questpaper API documentation ',
      version: '1.0.0',
    },
  },
  apis: ['app.js', './routes/usersroute.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

console.log(openapiSpecification)


//fileupload package
var cors = require('cors')

// parse application/json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true,
}
));
app.options('*', cors());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(session({
  key: "user_id",
  path: '/',
  secret: 'stealth',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    expires: 60 * 60 * 1000
   }
}))
//importing my routes
const usersroute = require("./routes/usersroute");
const adminsroute = require("./routes/adminsroute");
const teachersroute = require("./routes/teachersroute");

app.use(morgan('dev'));



//ici je pointe vers le fichier ou mes routes sont definies

//users route
app.use("/api/user", usersroute);

//  //admins route
// app.use('/api/admin', adminsroute)

//  //teachers route

//  app.use('/api/admin', teachersroute)

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.json({
    error: {
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on ${PORT}...`));
