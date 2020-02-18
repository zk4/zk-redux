const ADD_COUNT = "ADD_COUNT";

export function counter(state = null, action) {
  console.log(state);
  switch (action.type) {
    case ADD_COUNT:
      return state+1;

    default:
      return 10;
  }
}
export function addCount() {
  return { type: ADD_COUNT };
 
}
export function addCount2() {
  return [{ type: ADD_COUNT },{ type: ADD_COUNT }];
 
}
export function addCountAsync() {
  return handle=>{
    setTimeout(()=>{
      handle({ type: ADD_COUNT })
    },1000)
  }
}

export function addCountAsync2() {
  return handle=>{
    setTimeout(()=>{
     
      handle([{ type: ADD_COUNT },{ type: ADD_COUNT }])
    },1000)
  }
}
