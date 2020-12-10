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
      loading:true
    }

    this.loadJWT = this.loadJWT.bind(this);
  }

  newJWT = (token) => {
    console.log("Updating the token: " + token);

    this.setState({ 
      jwt:token
    });

  }

  async loadJWT () {
    let jwt = await deviceStorage.loadJWT('id_token');
    
    this.setState({
      jwt
    });
  }

  componentDidMount() {
    this.loadJWT();
  }

  render() {
    const { jwt } = this.state;

    return (
      <Navigator jwt={jwt} newJWT={this.newJWT} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dd0000'
  },
});
