import React from 'react';
import { connect } from 'react-redux';

import { products } from '../products';
import * as CartActions from '../actions';

class ProductList extends React.Component {
  validateQuantity(product, cart, addToCart) {
    const productsInCart = cart.filter((item) => item.name === product.name);

    if (productsInCart.length === product.stockQuantity) return false;

    addToCart(product);
    return true;
  }

  render() {
    const { addToCart, cart } = this.props;

    return (
      <div>
        <h2>Produtos disponíveis</h2>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.name}>
                <td>{product.name}</td>
                <td>R${product.price}</td>
                <td>{product.stockQuantity}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => this.validateQuantity(product, cart, addToCart)}
                  >
                    Adicionar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => dispatch(CartActions.addToCart(product)),
});// para o comp ter acesso essa funçao deve ser defenida como props l.18

const mapStateToProps = (state) => ({
  cart: state.reducer.cart,
})
// sempre q meu state for atualizado o mapStateToProps é chamado

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
