import React, { Component } from 'react';
import io from 'socket.io-client'

import './Feed.css';
import api from '../services/api.js';

import more from '../assets/more.svg';
import comment from '../assets/comment.svg';
import like from '../assets/like.svg';
import send from '../assets/send.svg';

class Feed extends Component {
    state = {
        feed: [],
    }

    async componentDidMount() {
        this.registerToSocket();

        const response = await api.get('posts');

        this.setState({ feed: response.data});
    }

    registerToSocket = () => {
        const socket = io('http://localhost:3333');

        socket.on('post', newpost => {
            this.setState({feed: [newpost, ...this.state.feed] });
        })

        socket.on('like', likedpost => {
            this.setState({
                feed: this.state.feed.map(post =>
                    post._id === likedpost._id ? likedpost : post
                )
            });
        })
    }

    handleLike = id => {
        api.post(`/posts/${id}/like`);
    }

    render(){
        return (
            <section id="post-list">
                {this.state.feed.map(post => (
                    <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <span>{post.autor}</span>
                            <span className="localizacao">{post.localizacao}</span>
                        </div>

                        <img src={more} alt="Mais" />
                    </header>
                    
                    <img src={`http://localhost:3333/files/${post.imagem}`} alt="" />

                    <footer>
                        <div className="actions">
                            <button type="button" onClick={() => this.handleLike(post._id)}>
                                <img src={like} alt="" />   
                            </button>
                            
                            <img src={comment} alt="" />
                            <img src={send} alt="" />
                        </div>

                        <strong>{post.likes} curtidas</strong>

                        <p>
                            {post.descricao}
                            <span>{post.hashtags}</span>
                        </p>
                    </footer>
                </article>
                ))}
            </section>
        );
    }
}

export default Feed;