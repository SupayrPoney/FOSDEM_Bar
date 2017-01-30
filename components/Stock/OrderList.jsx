import React from 'react';
import Product from '../shared/Product.jsx';

export default class OrderList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: this.props.products
		}
	}

	add_product(product) {
		let products = this.state.products;
		products.push(product)
		this.setState({
			products: products
		})
	}

	onClick(product) {
		this.props.session.call('order.finish', [product])
	}

	render() {
		let products = this.state.products.map((prod) => 
			<div key={prod.id}>
				<Product product={prod.product} quantity={prod.quantity} />
				<input type="checkbox" checked={prod.finished} onClick={() => this.onClick(prod)} />
			</div>)
		return 	<div>
					<h2>{this.props.bar}</h2>
					<div id="products">
						{products}
					</div>
				</div>
	}
}