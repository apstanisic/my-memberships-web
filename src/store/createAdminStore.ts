import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { routerMiddleware, connectRouter } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";
import {
  adminReducer,
  adminSaga,
  defaultI18nProvider,
  USER_LOGOUT
} from "react-admin";

export default ({ authProvider, dataProvider, history }: any) => {
  //   const reducer = combineReducers({
  //     admin: adminReducer,
  //     router: connectRouter(history)
  //   });
  const reducers = {
    admin: adminReducer,
    router: connectRouter(history)
  };
  // const resettableAppReducer = (state, action) =>
  //   reducer(action.type !== USER_LOGOUT ? state : undefined, action);

  const saga = function* rootSaga() {
    yield all(
      [
        adminSaga(dataProvider, authProvider)
        // add your own sagas here
      ].map(fork)
    );
  };
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = compose;

  //   const store = createStore(
  //     resettableAppReducer,
  //     {
  //       /* set your initial state here */
  //     },
  const enchancers = composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history)
      // add your own middlewares here
    )
    // add your own enhancers here
  );
  return {
    reducers,
    enchancers,
    init() {
      sagaMiddleware.run(saga);
    }
  };
  //   );
  //   sagaMiddleware.run(saga);
};
