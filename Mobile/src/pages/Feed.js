import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client'

import { View, Image, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import camera from '../assets/camera.png';
import more from '../assets/more.png';
import like from '../assets/like.png';
import comment from '../assets/comment.png';
import send from '../assets/send.png';

export default class Feed extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('New')}>
        <Image source={camera} />
      </TouchableOpacity>
    ),
  });
  
  state = {
    feed: [],
  }

  async componentDidMount() {
    this.registerToSocket();
 
    const response = await api.get('posts');

    this.setState({ feed: response.data});
  }

  registerToSocket = () => {
    const socket = io('http://192.168.25.150:3333');

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

  render() {
    return (
      <View>
        <FlatList
          data={this.state.feed}
          keyExtractor={post => post._id}
          renderItem={({ item }) => (
            <View style={styles.feedItem}>

              <View style={styles.feedItemHeader}>
                <View style={styles.userInfo}>
                  <Text style={styles.autor}>{item.autor}</Text>
                  <Text style={styles.localizacao}>{item.localizacao}</Text>
                </View>  

                <Image source={more} />
              </View>  

              <Image style={styles.feedImage} source={{ uri: `http://192.168.25.150:3333/files/${item.imagem}`}} />

              <View style={styles.feedItemFooter}>
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.action} onPress={ () => {this.handleLike(item._id)}}>
                    <Image source={like} />
                  </TouchableOpacity>                  
                  <TouchableOpacity style={styles.action} onPress={ () => {}}>
                    <Image source={comment} />
                  </TouchableOpacity>      
                  <TouchableOpacity style={styles.action} onPress={ () => {}}>
                    <Image source={send} />
                  </TouchableOpacity>      
                </View>

                <Text style={styles.likes}>{item.likes} curtidas</Text>
                <Text style={styles.descricao}>{item.descricao}</Text>
                <Text style={styles.hashtags}>{item.hashtags}</Text>
              </View>             
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  feedItem: {
    marginTop: 20
  },

  feedItemHeader: {
    paddingHorizontal: 15,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  autor: {
    fontSize: 14,
    color: '#000'
  },

  localizacao: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },

  feedImage: {
    width: '100%',
    height: 400,
    marginVertical: 15
  },

  feedItemFooter: {
    paddingHorizontal: 15
  },

  actions: {
    flexDirection: 'row'
  },

  action: {
    marginRight: 8
  },

  likes: {
    marginTop: 15,
    fontWeight: 'bold',
    color: '#000'
  },

  descricao: {
    lineHeight: 18,
    color: '#000'
  },

  hashtags: {
    color: "#7159c1"
  }
});
