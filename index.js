const express = require("express");
const app = express();
require("dotenv").config();
const axios = require("axios");

//middleware
const cors = require("cors");
app.use(cors());
const body_parser = require("body-parser");
app.use(body_parser.json());

//route instatnce
const router = express.Router();

//mongodb-connect
const mongoose = require("mongoose");
const db_pass = process.env.DB_PASS;
const uri = `mongodb+srv://ashifcse1723:${db_pass}@impresarioglobal.m795mmr.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri)
    .then(() => {
        console.log("connection established succesfully:")
    })
    .catch((error) => {
        console.log("error caught.", error)
    })

//store News-Blog data in mongoDB from an api
const NewsBlog = require('./models/NewsBlog');
router.get("/news-blog-fetch", async (req, res) => {
    try {
        const apiKey = process.env.NEWS_API;
        const countryCodes = 'in,us';
        const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${countryCodes}`;

        const response = await axios.get(url);
        const news_Blog_Data = await response.data.results;

        news_Blog_Data.forEach(async (news) => {
            const news_blog = new NewsBlog({
                title : news.title,
                content : news.content,
                description : news.description, 
                category : news.category,
                image_url : news.image_url,
                link : news.link,
            })
            await news_blog.save();
        })
        res.json({ message: 'News fetched and stored successfully.' });
    } catch (error) {   
        console.error('Error fetching news-Blog.', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
//route to read-data
router.get("/news-blog", async (req, res)=>{
    try{
        const news_blog_data = await NewsBlog.find({});
        res.json(news_blog_data);
    }catch(error){
        console.log("error in fetching news-blog-data from mongodb.", error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})
//post route
router.post("/create-article", async (req, res) => {
    const { title, content, description, image_url, link } = req.body;

    try {
        const newNews = new NewsBlog({
            title,
            content,
            description,
            image_url,
            link,
        });

        await newNews.save();
        console.log(newNews)
        res.json({ message: 'News added successfully', newNews });
    } catch (error) {
        console.error('Error adding news:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// update route
router.put("/create-article/:id", async (req, res) => {
    const newsId = req.params.id;
    const { title, content, description, image_url, link } = req.body;

    try {
        const updatedNews = await NewsBlog.findByIdAndUpdate(
            newsId,
            {
                title,
                content,
                description,
                image_url,
                link,
            },
            { new: true }
        );

        if (!updatedNews) {
            return res.status(404).json({ error: 'News not found' });
        }

        res.json({ message: 'News updated successfully', updatedNews });
    } catch (error) {
        console.error('Error updating news:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//delete point
router.delete("/delete-post/:id", async (req, res) => {
    const newsId = req.params.id;

    try {
        const deletedNews = await NewsBlog.findByIdAndDelete(newsId);

        if (!deletedNews) {
            return res.status(404).json({ error: 'News not found' });
        }

        res.json({ message: 'News deleted successfully', deletedNews });
    } catch (error) {
        console.error('Error deleting news:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//sign-up Route
const User = require('./models/User');
const bcrypt = require("bcrypt");
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(200).json({ user: "Sign-up succesfull" })

    } catch (error) {
        console.log("error caught while sign-up.", error);
        res.status(500).json({ error: "error while sign-up." })
    }
})

//log-in Route
const secret_key = "2ub3h2vygcsc8s83njbjs";
const jwt = require('jsonwebtoken');

router.post("/log-in", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "email and password are required." });
        }

        const user = await User.findOne({ email });
        // console.log("user", user)
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(401).json({ error: "please login with correct password" })
        }

        const user_name = await user.username;
        // console.log("user_name", user_name)
        //generating the jwt token upon succesfull signin
        const token = jwt.sign({ email }, secret_key, { expiresIn: "1h" });
        res.status(200).json({ token, user_name })
    } catch (error) {
        console.log("error while log-in.", error)
    }
})

//server
app.use("/api", router);
const port = process.env.PORT || 8070;
app.listen(port, () => {
    console.log("server-running at port:", port);
})
