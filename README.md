
# 📱 SocialApp - Guia Básico para Aplicativo de Rede Social

Este é um aplicativo de rede social básico desenvolvido com **React Native** para o frontend e **Node.js** com **Express** e **MongoDB** (ou outro BD relacional) para o backend. O **SocialApp** oferece funcionalidades como criação de perfis, feed de posts, upload de fotos e curtidas em posts.

## 📂 Estrutura do Projeto

\`\`\`
social-app/
|-- backend/
|   |-- config/
|   |-- controllers/
|   |-- models/
|   |-- routes/
|   |-- index.js
|-- frontend/
|   |-- src/
|   |-- components/
|   |-- screens/
|   |-- navigation/
|   |-- App.js
|   |-- package.json
|-- README.md
|-- .gitignore
\`\`\`

## 🛠️ Configuração do Ambiente

### Backend (Node.js, Express, MongoDB ou BD Relacional)

#### Instale Node.js e MongoDB

\`\`\`bash
# Instale Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instale MongoDB
sudo apt-get install -y mongodb
sudo systemctl start mongodb
\`\`\`

#### Configure o backend

\`\`\`bash
mkdir backend
cd backend
npm init -y
npm install express mongoose body-parser cors
\`\`\`

#### Crie o servidor Express

\`\`\`javascript
// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost/social_app', { useNewUrlParser: true, useUnifiedTopology: true });

// Sample route
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(5000, () => console.log('Server running on port 5000'));
\`\`\`

#### Configure o banco de dados e crie modelos

\`\`\`javascript
// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  profilePicture: String
});

module.exports = mongoose.model('User', UserSchema);
\`\`\`

\`\`\`javascript
// backend/models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  userId: String,
  content: String,
  imageUrl: String,
  likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Post', PostSchema);
\`\`\`

### Frontend (React Native)

#### Instale React Native CLI e configure o ambiente

\`\`\`bash
npm install -g expo-cli
expo init frontend
\`\`\`

#### Instale dependências

\`\`\`bash
cd frontend
npm install axios react-navigation react-navigation-stack
\`\`\`

#### Crie a navegação básica

\`\`\`javascript
// frontend/src/navigation/AppNavigator.js
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen
});

export default createAppContainer(AppNavigator);
\`\`\`

#### Configure o App.js

\`\`\`javascript
// frontend/src/App.js
import React from 'react';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}
\`\`\`

## 🎯 Implementação das Funcionalidades

### Perfil de Usuário

#### Tela de perfil

\`\`\`javascript
// frontend/src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, Image } from 'react-native';

const ProfileScreen = () => {
  return (
    <View>
      <Image source={{ uri: 'https://example.com/profile.jpg' }} style={{ width: 100, height: 100 }} />
      <Text>Username</Text>
      <Text>Email</Text>
    </View>
  );
}

export default ProfileScreen;
\`\`\`

### Feed de Posts e Comentários

#### Tela de feed

\`\`\`javascript
// frontend/src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <View>
          <Text>{item.content}</Text>
          <Button title="Like" onPress={() => {/* handle like */}} />
        </View>
      )}
    />
  );
}

export default HomeScreen;
\`\`\`

### Upload de Fotos e Curtida em Post

#### Adicione funcionalidade de upload e curtida ao backend

\`\`\`javascript
// backend/routes/posts.js
const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

router.post('/', (req, res) => {
  const newPost = new Post(req.body);
  newPost.save()
    .then(post => res.status(201).json(post))
    .catch(error => res.status(400).json(error));
});

router.get('/', (req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(error => res.status(400).json(error));
});

router.patch('/:id/like', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      post.likes += 1;
      post.save()
        .then(updatedPost => res.json(updatedPost))
        .catch(error => res.status(400).json(error));
    })
    .catch(error => res.status(400).json(error));
});

module.exports = router;
\`\`\`

## 🎥 Vídeo no YouTube


## 📚 Recursos Úteis

- [Documentação do Express](https://expressjs.com/)
- [Documentação do React Native](https://reactnative.dev/)
- [Documentação do Mongoose](https://mongoosejs.com/)
- [Tutorial de React Navigation](https://reactnavigation.org/)
