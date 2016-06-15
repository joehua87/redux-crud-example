import createQueryConstants from 'creators/create-query-constants.js';

export function loadEntities({ moduleName, state, reducer, data }) {
  const {
    LOAD_ENTITIES_START, LOAD_ENTITIES_SUCCESS,
  } = createQueryConstants(moduleName);

  let nextState = reducer(state, { type: LOAD_ENTITIES_START });
  nextState = reducer(state, { type: LOAD_ENTITIES_SUCCESS, payload: data });
  return nextState;
}
