import React from 'react';
import Product from '../shared/Product.jsx';

export default class OrderList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: this.props.orders
		}
	}

	add_order(order) {
		let orders = []
		let exists = false
		this.setState({
			orders: this.state.orders.map((o) => {
						if (o.id == order.id) {
							o.finished = order.finished
							exists = true
						}
						return o
					})
		})
		if (!exists) {
			this.setState({
				orders: [order].concat(this.state.orders)
			})
		}
	}

	onClick(order) {
		this.props.session.call('order.finish', [order])
	}

	renderProduct(order) {
		return 	<tr key={order.id}>
					<td>{order.product}</td>
					<td><b>{order.quantity}</b></td>
					<td><input type="checkbox" checked={order.finished} onClick={() => this.onClick(order)} /></td>
				</tr>
	}

	render() {
		let finished = this.state.orders.filter((order) => order.finished)
		let pending = this.state.orders.filter((order) => !order.finished)
		let orders = pending.concat(finished).map((order) => this.renderProduct(order))
		return 	<div>
					<h2>{this.props.bar}</h2>
					<table className="table table-striped">
						{orders}
					</table>
				</div>
	}
}