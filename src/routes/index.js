const router = require('express').Router()
const Post = require('../models/Post')
const axios = require('axios')
const path = require('path')
const mongoose = require('mongoose')



router.get('/', async (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})
router.get('/posts', async (req,res) => {
        res.sendFile(path.join(__dirname, '/public/posts.html'))
})

router.get('/guest', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/guest.html'))
})
router.get('/auth', async(req,res) => {
   res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID_GITHUB}`)  
})

router.get('/oauth-callback', async ({query: {code}},res) => {
    const opts = { 
        headers: { accept: 'application/json' }, 
    }
    const body =  {
        client_id: process.env.CLIENT_ID_GITHUB,
        client_secret: process.env.CLIENT_SECRET_GITHUB,
        code,
    }
    const {data: token} = await axios.post('https://github.com/login/oauth/access_token',body,opts)
    if(token) {
        res.redirect('/posts')
    }

})

router.get('/allposts', async (req,res) => {
    try {
        await mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true , useNewUrlParser: true })
        const conn = await mongoose.connection
        const posts = await conn.collection('posts').find({}).toArray()
        return res.status(200).send(posts)
    }catch(err) {
        if(err) console.log(`Erro ao pegar posts::: ${err}`)
    }
})
router.post('/create', async (req,res) => {
    try {
        const post = {
            title: `${req.body.title}`,
            description: `${req.body.description}`,
            likes: 0,
            comments: []    
        }
        const data = await Post.create(post)
        if(data._id) return res.status(200).send(data)
    }catch(err) {
        if(err) console.log(`Error: ${err}`)
    }
})

module.exports = router