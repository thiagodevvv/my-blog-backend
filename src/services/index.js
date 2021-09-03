const db = require('../database/db')
const Post = require('../models/Post')
const ObjectId = require('mongodb').ObjectID;

async function getPosts(req,res) {
    try {
        const conn = await db.connection
        const posts = await conn.collection('posts').find({}).toArray()
        return res.status(200).send(posts)
    }catch(err) {
        if(err) console.log(`Erro ao pegar posts::: ${err}`)
    }
}

async function createPost(req,res) {
    try {
        const post = {
            title: `${req.body.title}`,
            description: `${req.body.description}`,
            likes: 0,
            comments: [],
            tags: req.body.tags,
            author: req.body.author    
        }
        const data = await Post.create(post)
        if(data._id) return res.status(200).send(data)

    }catch(err) {
        if(err) console.log(`Error: ${err}`)
    }
}

async function addComment(req,res) {
    if(!req.body.comment && !req.body.id) {
        return res.status(400).send('Sem dados para adicionar comentário')
    }

    const idpost = req.body.idpost
    const iduser = req.body.iduser
    const comment = req.body.comment
    const conn = await db.connection
    try {
        const response = await conn.collection('comments').insertOne({idpost, iduser, comment})
        console.log(response)
        if(response.insertedCount > 0){
            return res.status(200).send("Comentário adicionado")
        }
    }catch(err) {
        console.log(`Erro ao adicionar comentário:::: ${err}`)
    }
}

async function deleteComment(req,res) {
        const iduser = req.params.iduser
        const comment = req.params.comment
        console.log(iduser)
        console.log(comment)
    try {
        const conn = await db.connection
        const response =  await conn.collection('comments').findOneAndDelete({iduser: iduser, comment: comment})
        if(response.lastErrorObject.n > 0) {
            return res.status(200).send("Ok deletado")
        }else {
            return res.status(400).send("Id do usuário que comentou ou comentário não existe")
        }
    }catch(err) {
        if(err) console.log(`Erro ao deletar comentário:::: ${err}`)
    }
}

module.exports = {
    getPosts,
    createPost,
    addComment,
    deleteComment
}