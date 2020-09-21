import React from 'react';
function Header(props) {
  return (
    <div className={'container back'}>
      <div className={'headerStyle row'}>
        <h4 className={'col-md-6'}>{props.title}</h4>
        <h4 className={'col-md-6'} style={{ textAlign: 'right' }}>
          <span ><i style={{ textAlign: 'right' }} className={'fas fa-shopping-cart'}></i> </span>
          <span>{props.cartCount} Items </span>
        </h4>
      </div>
    </div>
  );
}

export default Header;
