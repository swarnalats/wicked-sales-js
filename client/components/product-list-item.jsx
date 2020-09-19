import React from 'react';

function ProductListItem(props) {
  return (
    <div className={'card col-md-3 card-space'} >
      <div className={'card-body'} onClick={ e => { props.click('details', props.product.productId); } }>   {/* props.product.productId */}
        <img src={props.product.image} className={'card-img-top'} />
        <p>{props.product.price}</p>
        <p>{props.product.shortDescription}</p>
      </div>
    </div>
  );
}

export default ProductListItem;
