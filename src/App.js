import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
      firebase.initializeApp({
          apiKey: 'AIzaSyDDZRgvFCWHEDxOHmcU4lg43UQbg4Z2yZw',
          authDomain: 'auth-b92e5.firebaseapp.com',
          databaseURL: 'https://auth-b92e5.firebaseio.com',
          projectId: 'auth-b92e5',
          storageBucket: 'auth-b92e5.appspot.com',
          messagingSenderId: '277068579330'
    });

        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({ loggedIn: true });
          } else {
            this.setState({ loggedIn: false });
          }
        });
      }

      renderContent() {
        switch (this.state.loggedIn) {
          case true:
            return (
              <Button onPress={() => firebase.auth().signOut()}>
                Log Out
              </Button>
            );
          case false:
            return <LoginForm />;
          default:
            return <Spinner size="large" />;
        }
      }

      render() {
        return (
          <View>
            <Header headerText="Authentication App" />
            {this.renderContent()}
          </View>
        );
      }
    }

    export default App;
