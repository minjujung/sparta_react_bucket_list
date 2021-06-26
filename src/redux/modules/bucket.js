// buckets.js
import {firestore} from "../../firebase";

const bucket_db = firestore.collection("bucket")

// Actions
const LOAD   = "bucket/LOAD"
const CREATE = "bucket/CREATE"
const DELETE = "bucket/DELETE"
const UPDATE = "bucket/UPDATE"
const SPINNER = "bucket/SPINNER"
//IntialState
const initialState = {
    // list: []
    list: [
        {text: "영화관 가기", completed: false },
        {text: "매일 책읽기", completed: false },
        {text: "수영 배우기", completed: false }
    ],
    is_loaded: false
};


// Action Creators
export const loadBucket = (bucket) => {
    return {type: LOAD, bucket}
}

export const createBucket = (bucket) => {
    return {type: CREATE, bucket}
}

export const deleteBucket = (index) => {
    return {type: DELETE, index}
}

export const updateBucket = (index) => {
    return {type: UPDATE, index}
}

export const changeSpinner = (loaded) => {
    return {type: SPINNER, loaded}
}

//firebase랑 통신하는 함수
export const loadBucketFB = () => {
    return function(dispatch) {
        bucket_db.get().then(docs => {
            let bucket_data = [];
            docs.forEach((doc) => {
              if(doc.exists) {
                bucket_data = [...bucket_data, {id: doc.id, ...doc.data()}]
              }
            });
            dispatch(loadBucket(bucket_data));
          });
    }
}

export const addBucketFB = (bucket) => {
    return function (dispatch) {
        let bucket_data = {text: bucket, completed: false};

        dispatch(changeSpinner(false));

        bucket_db.add(bucket_data).then(docRef => {
            bucket_data = {...bucket_data, id: docRef.id};
            dispatch(createBucket(bucket_data));
            dispatch(changeSpinner(true));
        })
    }
}

export const updateBucketFB = (index) => {
    return function(dispatch, getState) {
        const old_data = getState().bucket.list[index];
        
        let new_data = {...old_data, completed: true};

        //만약 id값이 없으면 밑에것 실행하지 말고 함수 나가기
        //id 값이 없는 data를 굳이 firebase꺼 까지 수정하려고 하면 에러 발생
        if(!new_data.id) {
            return;
        }

        dispatch(changeSpinner(false));

        bucket_db.doc(new_data.id).update(new_data).then(docRef => {
            dispatch(updateBucket(index))
            dispatch(changeSpinner(true));
        }).catch(error => {
            console.log(error)
        })
    }
}

export const deleteBucketFB = (index) => {
    return function(dispatch, getState) {
        const old_data = getState().bucket.list[index]

        if(!old_data.id) {
            return;
        }

        bucket_db.doc(old_data.id).delete().then(docRef => {
            dispatch(deleteBucket(index))
        }).catch(error => {
            console.log(error)
        })
    }
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    // 파이어 베이스로 부터 받아온 data 가 있으면 그걸 화면에 그려주고
    //아니면 기존에 있는 스테이트를 그려준다
    case "bucket/LOAD": {
        if(action.bucket.length > 0) {
            return {list: action.bucket, is_loaded: true};
        }
        return state;
    }

    case "bucket/CREATE": {
        const new_bucket_list = [...state.list, action.bucket]
        return {list: new_bucket_list}
    }

    case "bucket/DELETE": {
        const new_bucket_list = state.list.filter((l, idx) => idx !== action.index )
        return {list: new_bucket_list}
    }

    case "bucket/UPDATE": {
        const new_bucket_list = state.list.map((l, idx) => {
            if(idx === action.index) {
                return {...l, completed: true};
            } else {
                return l;
            }
        })
        return {list: new_bucket_list};
    }

    case "bucket/SPINNER": {
        return {...state, is_loaded: action.loaded}
    }
    default: return state;
  }
}


