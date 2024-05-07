import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import LoginWebView from './components/LoginWebView';
import OrderList from './components/OrderList'; // Assuming you have this component

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionCookies, setSessionCookies] = useState({});

  const handleLoginSuccess = (cookies: any) => {
    setIsLoggedIn(true);
    setSessionCookies(cookies);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isLoggedIn ? (
        <LoginWebView onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <Text>User is logged in!</Text>
          <OrderList cookies={sessionCookies} />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
