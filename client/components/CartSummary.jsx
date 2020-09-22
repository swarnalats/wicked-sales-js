import React from 'react';
import CartSummaryItem from './CartSummaryItem';

function CartSummary(props) {
  console.log('PROPS', props.cartState.length);
  let summaryTotal = 0;
  for (var i = 0; i < props.cartState.length; i++) {
    summaryTotal = (props.cartState[i].price / 100) + summaryTotal;
  }
  return (
    <div className={'container'}>
      <h6 className={'backToCatalogButton'} ><button onClick={ e => { props.viewMethod('catalog', {}); }}>Back to Catalog</button></h6>
      <h1>Cart Summary</h1>
      {
        props.cartState.map(item => (
          <CartSummaryItem key={item.cartItemId} item={item} />
        ))
      }
      <h1>Total: {summaryTotal} </h1>
    </div>
  );
}

export default CartSummary;
