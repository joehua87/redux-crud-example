import axios from 'axios';
import qs from 'qs';

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return axios(url, {
    contentType: 'application/json; charset=utf-8',
    responseType: 'json',
    paramsSerializer: (param) => qs.stringify(param, { encode: false }),
    ...options,
  })
    .then(checkStatus)
    .then((data) => (data))
    .catch((err) => ({ err }));
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response  A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
