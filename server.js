const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const AuthRouter = require("./routes/auth");
const TodoRouter = require("./routes/todo");

const app = express();

app.use(bodyParser.json()); // Use body-parser middleware for JSON requests
app.use(morgan("dev")); // Use Morgan for request logging
dotenv.config();

// ------meddlewere--------//
app.use(express.json())


// Middleware to request a string
app.use((req, res, next) => {
  console.log("Middleware is running.");
  req.title = "Title middleware";
  next();
});

app.get("/todo", (req, res) => {
  res.status(200).json({ "name": "said", "title": req.title });
});

// app.post("/postTodo", (req, res) => {
//   const { name, color } = req.body;
//   console.log(name);
//   res.status(200).json({ "name": name, "color": color });
// });

// -------Router----------//
app.use("/auth",AuthRouter);
app.use("/todo",TodoRouter);

mongoose.set('strictQuery', true)
const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () =>{
        console.log(`connect to database & listening on port ${PORT}`)
    })
}).catch((error) =>{
    console.log(error.message)
});



// // Close the MongoDB connection when the Node.js process exits
// process.on('SIGINT', () => {
//     mongoose.connection.close(() => {
//       console.log('MongoDB Atlas connection closed');
//       process.exit(0); // Exit the Node.js process
//     });
//   });