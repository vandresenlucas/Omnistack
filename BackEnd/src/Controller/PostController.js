const Post = require('../Model/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res){
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },

    async store(req, res){
        const { autor, localizacao, descricao, hashtags } = req.body;
        const { filename: imagem } = req.file;

        const [name] = imagem.split('.');
        const filename = `${name}.jpg`;

        await sharp(req.file.path)
            .resize(500)
            .jpeg({quality : 70})
            .toFile(path.resolve(req.file.destination, 'resized', filename)
        )

        fs.unlinkSync(req.file.path);
        
        const post = await Post.create({
            autor,
            localizacao,
            descricao,
            hashtags,
            imagem : filename,
        });

        req.io.emit('post', post);

        return res.json(post);
    }
} 