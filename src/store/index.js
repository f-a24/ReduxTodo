import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import tasksReducer from '../reducers/tasks';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const loggerSetting = {
  predicate: (getState, action) => action.type !== 'HIGH_FREQUENCY_ACTION'
};

const logger = createLogger(loggerSetting);

/* 自作middleware
 * Actionが実行されるたびにローカルストレージに保存する
 */
const storageMiddleware = store => next => action => {
  const result = next(action);
  window.localStorage.setItem('app-state', JSON.stringify(store.getState()));
  return result;
};

const savedState = JSON.parse(localStorage.getItem('app-state'));
export default function createStore(history) {
  console.log(savedState);
  return reduxCreateStore(
    combineReducers({
      tasks: tasksReducer,
      router: routerReducer
    }),
    savedState ? savedState : tasksReducer({task: '', tasks: []}, {type: 'INIT'}),
    applyMiddleware(routerMiddleware(history), logger, storageMiddleware, thunk)
  );
}