import React from 'react';
import './Checkout.css';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';
import CheckoutProduct from'./CheckoutProduct';

function Checkout() {
  const [{basket,user}]=useStateValue();
  return (
    <div className='checkout'>
        {/* div for left side of checkout page */}
        <div className='checkout__left'>
            <img 
            className='checkout__ad' 
            src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg' 
            alt=''/>
            <div>
                <h3>Hello, {!user ? "Guest" : user.email}</h3>
                <h2 className='checkout__title'>Your Shopping Basket</h2>
                {/* display the basket items here */}
                {basket.map(item=>(
                  <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                     />
                  ))}
            </div>
        </div>
        {/* div for right side of checkout page */}
        <div className='checkout__right'>
            <Subtotal />
        </div>
    </div>
  )
}

export default Checkout;