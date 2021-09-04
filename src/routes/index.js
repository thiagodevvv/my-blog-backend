const router = require('express').Router()
const axios = require('axios')
const path = require('path')
const {
    getPosts, 
    createPost, 
    addComment, 
    deleteComment,
    addLike,
    removeLike
} = require('../services')
const bcrypt = require('bcrypt')
const saltRounds = 10



router.get('/', async (req,res) => {
    if(!req.cookies.blogtk) {
        res.sendFile(path.join(__dirname, '/public/login.html'))
    }else {
        res.sendFile(path.join(__dirname, '/public/posts.html'))  
    }
    
})
router.get('/posts', async (req,res) => {
        res.sendFile(path.join(__dirname, '/public/posts.html'))
})

router.get('/post', async (req,res) => {
    res.sendFile(path.join(__dirname, '/public/post.html'))
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
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(JSON.stringify(token.access_token), salt)
    
    if(hash) {
        // res.clearCookie('cookiename'); para limpar cookie
        res.cookie('blogtk', hash, { maxAge: 60 * 60 * 24 * 7, httpOnly: true }).redirect('/posts')
    }

})

router.get('/allposts', getPosts)
router.post('/create', createPost)
router.post('/addcomment', addComment)
router.delete('/remove/:comment/:iduser', deleteComment)
router.post('/addlike/:idpost', addLike)
router.delete('/removelike/:idpost', removeLike)

module.exports = router