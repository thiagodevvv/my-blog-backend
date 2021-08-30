const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true , useNewUrlParser: true })

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
        
    },
    description: {
        type: String,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model("posts", PostSchema)