import React from 'react';

function ProductListItem(props) {
  return (
    <div className={'card'} >
      <div className={'card-body'}>
        <h5 > {props.product.name}</h5>
        <img src={props.product.image} className={'card-img-top'} />
        <p>{props.product.price}</p>
        <p>{props.product.shortDescription}</p>
      </div>
    </div>
  );
}

export default ProductListItem;
