import { createStore, combineReducers, applyMiddleware } from 'redux';
import bucket from "./modules/bucket"; 
import { createBrowserHistory } from 'history';
import thunk from "redux-thunk";

export const history = createBrowserHistory();

const middlewares = [thunk];

//applyMiddleware로 미들웨어 사용할 수 있게 선언하고
//16번째 줄에서 store에 넣어준다!
const enhancer = applyMiddleware(...middlewares);

// 지금은 하나지만 나중에 리듀서가 많아지만 하나로 뭉치는 작업
const rootReducer = combineReducers({bucket})

// store에 미들웨어인 thunk넣어준 것
const store = createStore(rootReducer, enhancer);

export default store;