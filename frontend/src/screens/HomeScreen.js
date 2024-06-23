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
