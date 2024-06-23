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
