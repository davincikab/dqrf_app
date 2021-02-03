import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
      user
    });
  }

  componentDidMount() {
    this.loadJWT();
  }

  render() {
    const { jwt, user } = this.state;

    return (
      <Navigator jwt={jwt} user={user} newJWT={this.newJWT} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dd0000'
  },
});
