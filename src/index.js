import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {createStore, applyMiddleWare} from "./zk-redux";
import {counter} from "./counter.redux";
import {Provider} from "./zk-react-redux";
import thunk from "./zk-thunk";
import zkArray from "./zk-array";
import CounterMe from "./CounterMe";

const store = createStore(counter, applyMiddleWare(thunk, zkArray));
ReactDOM.render(
	<Provider store={store}>
		<CounterMe />
		{/* <Page /> */}
	</Provider>,
	document.getElementById("root")
);

