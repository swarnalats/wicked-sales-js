import React from 'react';

function ProductListItem(props) {
  return (
    <div className={'card col-md-3 card-space'} >
      <div className={'card-body'} onClick={ e => { props.click('details', props.product.productId); } }>   {/* props.product.productId */}
        <div > <img className={'imageArea'} src={props.product.image} /></div>
        <h3>{props.product.name}</h3>
        <h4>{'$'}{props.product.price / 100}<span></span></h4>
        <p>{props.product.shortDescription}</p>
      </div>
    </div>
  );
}

export default ProductListItem;
