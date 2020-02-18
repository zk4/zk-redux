import React from "react";
import PropTypes from "prop-types";
// import {bindActionCreators} from  "./zk-redux"
// 与下面的 connect 一样的声明方式
// export function connect(
//   mapStateToProps = state => state,
//   mapDispatchToProps = {}
// ) {
//   return function(WrapComponent) {
//     return class ConnectComponent extends React.Component {};
//   };
// }
// 与上面的写法一致

export const connect = (
	mapStateToProps = state => state,
	mapDispatchToProps = {}
) => WrapComponent => {
	return class ConnectComponent extends React.Component {
		static contextTypes = {
			store: PropTypes.object
		};
		constructor(props, context) {
			super(props, context);
			this.state = {
				props: {}
			};
		}
		componentDidMount() {
			const {store} = this.context;
			store.subscribe(() => this.update());
			this.update();
		}
		update() {
			const {store} = this.context;

			const stateProps = mapStateToProps(store.getState());

			// convert action payload to dispath(action)
			const dispatchProps = bindActionCreators(
				mapDispatchToProps,
				store.dispatch
			);

			// put init value &
			// wrapped action method in state 
			this.setState({
				props: {
					...this.state.props,
					...stateProps,
					...dispatchProps
				}
			});
		}
		render() {
			return <WrapComponent {...this.state.props} />;
		}
	};
};

// convert  function func(..args){}  ====>  (...args)=> dispatch(func(...args))
function bindActionCreators(mapDispatchToProps, dispatch) {
	return Object.keys(mapDispatchToProps).reduce((acum, v) => {
		acum[v] = (...args) => dispatch(mapDispatchToProps[v](...args));
		return acum;
	}, {});
}

export class Provider extends React.Component {
	static childContextTypes = {
		store: PropTypes.object
	};

	// could retrieve context by this.context from child
	// https://reactjs.org/docs/legacy-context.html
	getChildContext() {
		return {
			store: this.store
		};
	}

	constructor(props, context) {
		super(props, context);
		this.store = props.store;
	}

	render() {
		return this.props.children;
	}
}
