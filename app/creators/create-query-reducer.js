import { fromJS } from 'immutable';

export const initialState = fromJS({
  isLoading: false,
  isLoadingFilterGuide: false,
  isLoadingDetail: false,
  isLoadingMore: false,
  isEdit: false,
  isRemove: false,
  entities: fromJS([]),
  query: {
    count: 0,
    page: 1,
  },
  hasMore: false,
  selected: null,
  isShowDetail: false,
  filterFields: [],
  isShowFilterGuide: false,
  error: null,
});

export default function createReducer(constants) {
  const {
    LOAD_ENTITIES_START, LOAD_ENTITIES_SUCCESS, LOAD_ENTITIES_FAIL,
    LOAD_MORE_START, LOAD_MORE_SUCCESS, LOAD_MORE_FAIL,
    LOAD_DETAIL_START, LOAD_DETAIL_SUCCESS, LOAD_DETAIL_FAIL, CLOSE_DETAIL,
    SHOW_FILTER_GUIDE_START, SHOW_FILTER_GUIDE_SUCCESS, SHOW_FILTER_GUIDE_FAIL,
    CLOSE_FILTER_GUIDE,
    DISMISS_NOTIFICATION,
  } = constants;

  return (state = initialState, action = {}) => {
    const { entities, ...query } = action.payload || {};

    switch (action.type) {
      case LOAD_ENTITIES_START:
        return state
          .set('isLoading', true);

      case LOAD_ENTITIES_SUCCESS:
        return state
          .set('isLoading', false)
          .set('entities', fromJS(entities))
          .set('query', query)
          .set('hasMore', query.count > (query.page + 1) * query.limit)
          .set('error', null);

      case LOAD_ENTITIES_FAIL:
        return state
          .set('isLoading', false)
          .set('error', action.payload);

      case LOAD_MORE_START:
        return state
          .set('isLoadingMore', true)
          .set('error', action.payload);

      case LOAD_MORE_SUCCESS:
        return state
          .set('isLoadingMore', false)
          .set('entities', fromJS([...state.get('entities').toJS(), ...entities])) // TODO Refactor
          .set('query', query)
          .set('hasMore', query.count > (query.page + 1) * query.limit)
          .set('error', null);

      case LOAD_MORE_FAIL:
        return state
          .set('isLoadingMore', false)
          .set('error', action.payload)
          .set('selected', null)
          .set('isEdit', false);

      case LOAD_DETAIL_START:
        return state
          .set('isLoadingDetail', true)
          .set('isShowDetail', true);

      case LOAD_DETAIL_SUCCESS:
        return state
          .set('isLoadingDetail', false)
          .set('selected', action.payload)
          .set('error', null);

      case LOAD_DETAIL_FAIL:
        return state
          .set('isLoadingDetail', false)
          .set('selected', null)
          .set('isShowDetail', false)
          .set('selected', null)
          .set('error', action.payload);

      case CLOSE_DETAIL:
        return state
          .set('selected', null)
          .set('isShowDetail', false);

      case SHOW_FILTER_GUIDE_START:
        return state
          .set('isLoadingFilterGuide', true);

      case SHOW_FILTER_GUIDE_SUCCESS:
        return state
          .set('filterFields', action.payload.fields)
          .set('isShowFilterGuide', true)
          .set('isLoadingFilterGuide', false);

      case SHOW_FILTER_GUIDE_FAIL:
        return state
          .set('error', action.payload)
          .set('filterFields', [])
          .set('isShowFilterGuide', false)
          .set('isLoadingFilterGuide', false);

      case CLOSE_FILTER_GUIDE:
        return state
          .set('isShowFilterGuide', false);

      case DISMISS_NOTIFICATION:
        return state
          .set('notification', null);
      default:
        return state;
    }
  };
}
