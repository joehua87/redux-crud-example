import createQueryConstants from '../create-query-constants';
import expect from 'expect';

describe('Create Query Constants', () => {
  const constants = createQueryConstants('post');
  const {
    LOAD_ENTITIES_START,
    LOAD_ENTITIES_SUCCESS,
    LOAD_ENTITIES_FAIL,

    LOAD_MORE_START,
    LOAD_MORE_SUCCESS,
    LOAD_MORE_FAIL,

    LOAD_DETAIL_START,
    LOAD_DETAIL_SUCCESS,
    LOAD_DETAIL_FAIL,
    CLOSE_DETAIL,

    SHOW_FILTER_GUIDE_START,
    SHOW_FILTER_GUIDE_SUCCESS,
    SHOW_FILTER_GUIDE_FAIL,
    CLOSE_FILTER_GUIDE,

    DISMISS_NOTIFICATION,
  } = constants;

  it('Load', () => {
    expect(LOAD_ENTITIES_START).toEqual('post/LOAD_ENTITIES_START');
    expect(LOAD_ENTITIES_SUCCESS).toEqual('post/LOAD_ENTITIES_SUCCESS');
    expect(LOAD_ENTITIES_FAIL).toEqual('post/LOAD_ENTITIES_FAIL');
  });

  it('Load more', () => {
    expect(LOAD_MORE_START).toEqual('post/LOAD_MORE_START');
    expect(LOAD_MORE_SUCCESS).toEqual('post/LOAD_MORE_SUCCESS');
    expect(LOAD_MORE_FAIL).toEqual('post/LOAD_MORE_FAIL');
  });

  it('Load detail', () => {
    expect(LOAD_DETAIL_START).toEqual('post/LOAD_DETAIL_START');
    expect(LOAD_DETAIL_SUCCESS).toEqual('post/LOAD_DETAIL_SUCCESS');
    expect(LOAD_DETAIL_FAIL).toEqual('post/LOAD_DETAIL_FAIL');
    expect(CLOSE_DETAIL).toEqual('post/CLOSE_DETAIL');
  });

  it('Show filter', () => {
    expect(SHOW_FILTER_GUIDE_START).toEqual('post/SHOW_FILTER_GUIDE_START');
    expect(SHOW_FILTER_GUIDE_SUCCESS).toEqual('post/SHOW_FILTER_GUIDE_SUCCESS');
    expect(SHOW_FILTER_GUIDE_FAIL).toEqual('post/SHOW_FILTER_GUIDE_FAIL');
    expect(CLOSE_FILTER_GUIDE).toEqual('post/CLOSE_FILTER_GUIDE');
  });

  it('Misc', () => {
    expect(DISMISS_NOTIFICATION).toEqual('post/DISMISS_NOTIFICATION');
  });
});
