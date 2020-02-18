import React, {Component} from "react";
import {connect} from "./zk-react-redux";
import {
	addCount2,
	addCountAsync2,
	addCount,
	addCountAsync
} from "./counter.redux";

class CounterMe extends Component {
	render() {
		return (
			<div>
				<div>{this.props.state}</div>
				<button onClick={() => this.props.addCount()}>add me </button>
				<button onClick={() => this.props.addCountAsync()}>add me async </button>
				<button onClick={() => this.props.addCount2()}>add me 2 </button>
				<button onClick={() => this.props.addCountAsync2()}>
					add me async 2{" "}
				</button>
			</div>
		);
	}
}
CounterMe = connect(
	state => ({state}),
	{addCount2, addCountAsync2, addCount, addCountAsync}
)(CounterMe);
export default CounterMe;
