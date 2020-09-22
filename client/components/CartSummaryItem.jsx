import React from 'react';

function CartSummaryItem(props) {
  return (
    <div className={'row rowStyle'}>
      <div className={'col-md-6'}>
        <img className={'imageArea'} src={props.item.image} />
      </div >
      <div className={'col-md-6'}>
        <h3> {props.item.name}</h3>
        <h4>{'$'}{props.item.price / 100 }</h4>
        <h6>{props.item.shortDescription}</h6>
      </div>
    </div>
  );
}

export default CartSummaryItem;
