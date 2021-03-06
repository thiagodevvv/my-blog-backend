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

async function deletePost(req,res) {
    const post = req.params.id
    try {
        const conn = await db.connection
        const response = await conn.collection('posts').findOneAndDelete({_id: new ObjectId(post)})
        return res.status(200).send("Ok post deletado")
    }catch(err) {
        console.log(`Erro ao deletar post::::${err}`)
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

async function addLike(req,res) {
    const idpost = req.params.idpost
    try {
        const conn = await db.connection
        const {likes} = await conn.collection('posts').findOne({_id: new ObjectId(idpost)})
        const response = await conn.collection('posts').findOneAndUpdate({_id: new ObjectId(idpost)}, {$set: {
            likes: likes + 1
        }})
        if(response.lastErrorObject.updatedExisting > 0) {
            return res.status(200).send("Like adicionado")
        }
    }catch(err) {
        if(err) console.log(`Erro ao dar o Like:::: ${err}`)
    }
}


async function removeLike(req,res) {
    const idpost = req.params.idpost
    try {
        const conn = await db.connection
        const {likes} = await conn.collection('posts').findOne({_id: new ObjectId(idpost)})
        const response = await conn.collection('posts').findOneAndUpdate({_id: new ObjectId(idpost)}, {$set: {
            likes: likes - 1
        }})
        if(response.lastErrorObject.updatedExisting > 0) {
            return res.status(200).send("Like removido")
        }
    }catch(err) {
        if(err) return res.status(400).send(err)
    }
}



module.exports = {
    getPosts,
    createPost,
    addComment,
    deleteComment,
    addLike,
    removeLike,
    deletePost
}