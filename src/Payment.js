import React, {useState, useEffect} from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, PaymentRequestButtonElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer';
import CurrencyFormat from 'react-currency-format';
import axios from './axios';
import { db } from './firebase';

function Payment() {
    const [{basket,user}, dispatch] = useStateValue();
    const navigate=useNavigate();

    const stripe=useStripe();
    const elements=useElements();

    const [succeded, setSucceded]=useState(false);
    const [processing, setProcessing]=useState("");
    const [error, setError]=useState(null);
    const [disabled, setDisabled]=useState(true);
    const [clientSecret, setClientSecret]=useState(true);

    useEffect(()=>{
        //generate the special stripe secret which allows us to charge the customer
        const getClientSecret=async()=>{
            const response=await axios({
                method: 'post',
                //stripe expects total in currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket)*100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    },[basket])

    console.log("THE SECRET IS >>> ",clientSecret)

    const handleSubmit=async(event)=>{
        //do all stripe stuffs here
        event.preventDefault();
        setProcessing(true);

        const payload=await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) =>{
            //paymentIntent=payment confirmation

            setSucceded(true);
            setError(null);
            setProcessing(false);
            dispatch({
                type: 'EMPTY_BASKET'
            })

            navigate('/orders', { replace: true })
        })
    }
    const handleChange=event=>{
        //listen for changes in the cardelement
        //and display any errors as the custormer their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }
    
  return (
    <div className='payment'>
        <div className='payment__container'>
            <div className='payment__container'>
                <h1>checkout (<Link to="/checkout">{basket.length} items</Link>)</h1>
            </div>
            {/* Delivery address - Payment page */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user.email}</p>
                    <p>123 React Lane</p>
                    <p>Los Angeles, CA</p>
                </div>
            </div>
            {/* Review Item - Payment page */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='payment__items'>
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
            {/* Payment method - Payment page */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__details'>
                    {/* Stripe */}
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className='payment__pricecontainer'>
                            <CurrencyFormat
                                renderText={(value) => (
                                    <>
                                    <h3>Order total: {value}</h3>
                                    </>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <button disabled={processing || disabled || succeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                        </div>
                        {/* Errors */}
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment;