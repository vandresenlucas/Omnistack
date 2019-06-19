import React, { Component } from 'react';
import api from '../services/api';

import './New.css';

class New extends Component {
    state = {
        imagem: null,
        autor: '',
        localizacao: '',
        descricao: '',
        hashtags: '',
    };

    handleSubmit = async e =>{
        e.preventDefault();

        const data = new FormData();

        data.append('imagem', this.state.imagem);
        data.append('autor', this.state.autor);
        data.append('localizacao', this.state.localizacao);
        data.append('descricao', this.state.descricao);
        data.append('hashtags', this.state.hashtags);

        await api.post('posts', data);

        this.props.history.push('/');
    }

    handleImageChange = e => {
        this.setState({ imagem: e.target.files[0] });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render(){
        return (
            <form id="new-post" onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.handleImageChange}/>

                <input 
                    type="text"
                    name="autor"
                    placeholder="Autor do post"
                    onChange={this.handleChange}
                    value={this.state.autor}
                />

                <input 
                    type="text"
                    name="localizacao"
                    placeholder="Localizacao do post"
                    onChange={this.handleChange}
                    value={this.state.localizacao}
                />
                
                <input 
                    type="text"
                    name="descricao"
                    placeholder="Descrição do post"
                    onChange={this.handleChange}
                    value={this.state.descricao}
                />

                <input 
                    type="text"
                    name="hashtags"
                    placeholder="Hashtags do post"
                    onChange={this.handleChange}
                    value={this.state.hashtags}
                />

                <button type="submit">Enviar</button>
            </form>
        );
    }
}

export default New;