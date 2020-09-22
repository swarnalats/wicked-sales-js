import React from 'react';
import CartSummaryItem from './CartSummaryItem';

function CartSummary(props) {
  console.log('Props', props);
  return (
    <div className={'container'}>
      <h6 className={'backToCatalogButton'} ><button onClick={ e => { props.viewMethod('catalog', {}); }}>Back to Catalog</button></h6>
      <h1>Cart Summary</h1>
      {
        props.cartState.map(item => (
          <CartSummaryItem key={item.productId} item={item} />
        ))
      }
    </div>
  );
}

export default CartSummary;
