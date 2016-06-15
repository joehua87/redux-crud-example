import { take, call, put, race, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import { createAction } from 'redux-actions';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic2NvcGVzIjpbInJlYWQiLCJ3cml0ZSJdLCJpYXQiOjE0NTg0Nzg3OTR9.HmLv92mqAmRheYDDmKQScBqYDbkwgxf-RDHrBCs4mxE'; // eslint-disable-line

/**
 *
 * @param types
 * @param method
 * @param url
 * @param params
 * @param data
 * @param selectState
 * @returns {Function}
 */
export default function createRequestSaga({ types, method, url, params, data, selectState }) {
  return function*() {
    const [START, SUCCESS, FAIL] = types;
    const success = createAction(SUCCESS);
    const fail = createAction(FAIL);

    let state = null;
    if (selectState) {
      state = yield select((x) => x.toJS());
    }

    while (true) {
      const watcher = yield race({
        loadEntities: take(START),
        stop: take(LOCATION_CHANGE), // stop watching if user leaves page
      });

      if (watcher.stop) break;

      let finalUrl;
      if (typeof url === 'string') {
        finalUrl = url;
      } else if (typeof url === 'function') {
        finalUrl = url({ payload: watcher.loadEntities.payload, state });
      } else {
        throw new Error('url must be a string or function');
      }

      let finalParams;
      if (typeof params === 'function') {
        finalParams = params({ payload: watcher.loadEntities.payload, state });
      }

      let finalData;
      if (typeof data === 'function') {
        finalData = data({ payload: watcher.loadEntities.payload, state });
      }

      // Should race here, between waiting for request & location changed
      const response = yield call(request, finalUrl, {
        method,
        headers: { Authorization: `bearer ${token}` }, // TODO Remove up
        params: finalParams,
        data: finalData,
      });

      // We return an object in a specific format, see utils/request.js for more information
      if (response.err === undefined || response.err === null) {
        yield put(success(response.data));
      } else {
        console.log(response.err.response); // eslint-disable-line no-console
        yield put(fail(response.err));
      }
    }
  };
}
