import { createAction } from 'redux-actions';
import createQueryConstants from './create-query-constants';

export const defaultInitialState = {
  isLoading: false,
  isLoadingFilterGuide: false,
  isLoadingDetail: false,
  isLoadingMore: false,
  entities: [],
  count: 0,
  page: 1,
  selected: null,
  isShowDetail: false,
  filterFields: [],
  isShowFilterGuide: false,
  error: null,
};

export default function createActions(moduleName) {
  const {
    LOAD_ENTITIES_START,
    LOAD_MORE_START,
    LOAD_DETAIL_START,
    CLOSE_DETAIL,
    SHOW_FILTER_GUIDE_START,
    DISMISS_NOTIFICATION,
    CLOSE_FILTER_GUIDE,
  } = createQueryConstants(moduleName);

  return {
    loadEntities: createAction(LOAD_ENTITIES_START),
    loadMore: createAction(LOAD_MORE_START),
    loadDetail: createAction(LOAD_DETAIL_START),
    closeDetail: createAction(CLOSE_DETAIL),
    showFilterGuide: createAction(SHOW_FILTER_GUIDE_START),
    closeFilterGuide: createAction(CLOSE_FILTER_GUIDE),
    dismissNotification: createAction(DISMISS_NOTIFICATION),
  };
}
