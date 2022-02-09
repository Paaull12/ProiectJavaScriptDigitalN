const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose
     .connect("mongodb+srv://andreido11:andreido11@cluster0.uto2v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
     { useNewUrlParser: true, useUnifiedTopology: true, })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000)