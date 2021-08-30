const router = require('express').Router()
const Post = require('../models/Post')


router.get('/', async (req,res) => {
    try {
        const data = await Post.find({})
        if(data.length > 0 ) return res.status(200).send(data)
    }catch(err) {
       if(err) console.log(`Erro ao pegar todos posts: ${err}`)
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