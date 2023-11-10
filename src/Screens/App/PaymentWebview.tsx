import React from 'react';
import {SafeAreaView, View} from 'react-native';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import {WebView} from 'react-native-webview';

const PaymentWebview = ({navigation, route}: Props) => {
  return (
    <>
      <SafeAreaView>
        <ScreenHeader
          header={'על PAYME'}
          showBackButton={true}
          isHeaderBold={false}
        />
        <View style={{height: '100%', width: '100%'}}>
          <WebView
            source={{
              uri: route?.params?.url,
            }}
            originWhitelist={['*']}
            style={{height: '100%', width: '100%'}}
            showsVerticalScrollIndicator={false}
            onMessage={e => console.log(e)}
            onNavigationStateChange={webViewState => {
              console.log(
                'webViewState -> ',
                JSON.stringify(webViewState, null, 2),
              );
              if (webViewState.url?.includes('payme_status=success')) {
                navigation.navigate('CreateRequestScreen', {
                  hasCreditCardDetails: true,
                });
              }
              //   let url = webViewState.url;
              //   let allUrl = url.split('/');
              //   if (allUrl[7] === 'step-three') {
              //     console.log(allUrl[7], '...INNNNNN..');
              //     navigation.navigate('RequestDetailScreen', {
              //       para: route?.params?.para,
              //     });
              //   }
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default PaymentWebview;
