require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// ROUTES:
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');


// MIDDLEWARES
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));


// MONGO_DB CONNECTION
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
.then(console.log("Connected to MongoDB Server"))
.catch(err=>console.log(err));


// FILEUPLOAD - Using MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
})

const upload = multer({storage: storage});

app.post('/blogapi/upload', upload.single('file'), (req, res) => {
    res.status(200).json("file has been uploaded successfully!!!")
});

// Routes
app.use("/blogapi/auth", authRoute);
app.use("/blogapi/users", userRoute);
app.use("/blogapi/posts", postRoute);
app.use("/blogapi/category", categoryRoute);



app.use('/', (req, res) => {
    res.send("this is my url")
    console.log("this is my url")
})





const PORT = 4651;
app.listen(PORT, () => console.log(`Blog running at port ${PORT}`));