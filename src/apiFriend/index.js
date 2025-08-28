import { showMessage } from 'react-native-flash-message';
import store from '../redux/Store';

getCommonHeaders = () => {
  let commonHeaders = {
    // Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Cache-Control': 'no-cache',
  };

  return commonHeaders;
};

export async function ApiRequest(endUrl, method, headers, body) {


  try {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions =
      method == 'GET'
        ? {
          method: method,
          // headers: myHeaders,
        }
        : {
          method: method,
          headers: myHeaders,
          body: body,
        };
    return fetch(endUrl, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => console.log('error', error));
  } catch (e) {
    showMessage({
      message: e,
      type: "danger",
    })
  }
}
