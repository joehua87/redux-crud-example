import createRequestSaga from './create-request-saga';

export default function createQuerySaga({
  constants,
  endpoint,
  selectState,
  listProjection,
  detailProjection,
}) {
  const {
    LOAD_ENTITIES_START,
    LOAD_ENTITIES_SUCCESS,
    LOAD_ENTITIES_FAIL,
    LOAD_DETAIL_START,
    LOAD_DETAIL_SUCCESS,
    LOAD_DETAIL_FAIL,
    LOAD_MORE_START,
    LOAD_MORE_SUCCESS,
    LOAD_MORE_FAIL,
    SHOW_FILTER_GUIDE_START,
    SHOW_FILTER_GUIDE_SUCCESS,
    SHOW_FILTER_GUIDE_FAIL,
  } = constants;

// All sagas to be loaded

  const loadEntitiesSaga = createRequestSaga({
    types: [LOAD_ENTITIES_START, LOAD_ENTITIES_SUCCESS, LOAD_ENTITIES_FAIL],
    method: 'get',
    url: `${endpoint}/query`,
    params: ({ payload }) => ({
      filter: {
        ...payload,
      },
      projection: listProjection,
    }),
  });

  const loadMoreSaga = createRequestSaga({
    types: [LOAD_MORE_START, LOAD_MORE_SUCCESS, LOAD_MORE_FAIL],
    method: 'get',
    url: `${endpoint}/query`,
    selectState, // Need use state to get current page, limit
    params: ({ payload: { filter, page, limit, sort, projection } }) => ({
      filter,
      page,
      limit,
      sort,
      projection,
    }),
  });

  const loadDetailSaga = createRequestSaga({
    types: [LOAD_DETAIL_START, LOAD_DETAIL_SUCCESS, LOAD_DETAIL_FAIL],
    method: 'get',
    url: ({ payload }) => `${endpoint}/id/${payload}`,
    params: {
      projection: detailProjection,
    },
  });

  const showFilterGuideSaga = createRequestSaga({
    types: [SHOW_FILTER_GUIDE_START, SHOW_FILTER_GUIDE_SUCCESS, SHOW_FILTER_GUIDE_FAIL],
    method: 'get',
    url: `${endpoint}/get-config`,
  });

  // Return object for easier testing each function
  return {
    loadEntitiesSaga,
    loadMoreSaga,
    loadDetailSaga,
    showFilterGuideSaga,
    list: [
      loadEntitiesSaga,
      loadMoreSaga,
      loadDetailSaga,
      showFilterGuideSaga,
    ],
  };
}
