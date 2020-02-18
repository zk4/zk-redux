export function applyMiddleWare(...middlewares) {
	return (createStore, reducer) => {
		const store = createStore(reducer);
		let dispatch = store.dispatch;

		const midApi = {
			getState: store.getState,
			dispatch: (...a) => dispatch(...a)
			// 这个 dispatch 会延迟绑定到下在同的 dispatch
		};


		const middlewareChain = middlewares.map(middleware => middleware(midApi));
		dispatch = compose(...middlewareChain)(store.dispatch);

		// 上面与下面代码等价
		// let _thunk = thunk(midApi);
		// let _zkArray = zkArray(midApi);
		// dispatch = _thunk(_zkArray(store.dispatch));
		// zkarray  的 next 就是  store.dispatch
		// thunk    的 next 就是  zkarray
		// dispatch 这个名字是不能变的，需要覆盖 store 里的 dispatch
		// 在调用时，_thunk(_zkArray(store.dispatch))(action) 首先进入 thunk,然后 zkarray
		// 为什么这里不能使用其他的变量 比如 let a= compose(....
		// 因为       dispatch: (...a) => dispatch(...a),会闭包. dispatch 会在最后才绑定

		return {
			...store,

			dispatch
		};
	};
}

export function compose(...funcs) {
	if (funcs.length === 0) return arg => arg;
	return funcs.reduce((ret, func) => (...args) => ret(func(...args)));
}
export function createStore(reducer, enhancer) {
	if (enhancer) {
		return enhancer(createStore, reducer);
	}
	let currentState = {};
	let listeners = [];

	function getState() {
		return currentState;
	}

	function subscribe(listener) {
		listeners.push(listener);
	}

	function dispatch(action) {
		currentState = reducer(currentState, action);
		listeners.forEach(l => l());
		return action;
	}
	dispatch({type: "@zk/init-zk@redux@"});
	return {getState, subscribe, dispatch};
}
