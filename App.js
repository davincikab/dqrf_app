import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import Block from './src/components/Block';
import Typography from './src/components/Text';
import { theme } from './src/constants';

import Navigator from './src/navigation';
import deviceStorage from './src/utils/deviceStorage';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jwt:'',
      user:{},
      loading:true
    }

    this.loadJWT = this.loadJWT.bind(this);
  }

  newJWT = (token, user) => {
    console.log("Updating the token: " + user);

    this.setState({ 
      jwt:token,
      user
    });

  }

  async loadJWT () {
    let jwt = await deviceStorage.loadJWT('id_token');
    let user = await deviceStorage.loadUser('id_user');
    
    this.setState({
      jwt,
      user,
      loading:false
    });
  }

  componentDidMount() {
    this.loadJWT();
  }

  render() {
    const { jwt, user, loading } = this.state;

    if(loading) {
      return (
        <Block style={styles.container}>
          <ActivityIndicator size="small" color={theme.colors.black} />
          <Typography >Loading ... </Typography>
        </Block>
      );
    }

    return (
      <Navigator jwt={jwt} user={user} newJWT={this.newJWT} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center'
  },
});
