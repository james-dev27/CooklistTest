import React, {useRef, useState} from 'react';
import axios from 'axios';
import {View, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import CookieManager from '@react-native-cookies/cookies';
import {getCookieFromObject} from '../utils/cookies';

const BASE_URL = 'https://www.walmart.com';

interface LoginWebViewProps {
  onLoginSuccess: (cookies: any) => void;
}

const LoginWebView: React.FC<LoginWebViewProps> = ({onLoginSuccess}) => {
  const webViewRef = useRef<WebView>(null);
  const [uri, setUri] = useState(`${BASE_URL}/account/login`);

  const checkLoginStatus = async () => {
    const cookies = await CookieManager.get(BASE_URL, true);
    if (cookies) {
      try {
        const res = await axios.get(
          `${BASE_URL}/orchestra/cph/graphql/PurchaseHistory/49e138569076e06ed6ac99870449b1e1d954e97948959f61ec413c1d6ff3b97a`,
          {
            withCredentials: true,
            headers: {
              Cookie: getCookieFromObject(cookies),
            },
          },
        );

        if (res.data.errors && res.data.errors.length > 0) {
          setUri(`${BASE_URL}/account/login`);
        } else {
          console.log('# LOGGED IN #', cookies.auth.value);
          setUri(`${BASE_URL}/orders`);
          console.log('# ORDER LIST #');
        }
      } catch (err) {
        console.error(err);
      }

      onLoginSuccess(cookies);
    }
  };

  return (
    <View style={styles.container}>
      <WebView ref={webViewRef} source={{uri}} onLoadEnd={checkLoginStatus} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginWebView;
