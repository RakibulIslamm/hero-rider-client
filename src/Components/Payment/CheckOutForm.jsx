import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const CheckOutForm = ({ order }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const { price, name, _id, img } = order;

    const { user } = useAuth();

    console.log(transactionId);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        const getSecret = async () => {
            try {
                const res = await fetch('http://localhost:5000/create-payment-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        price
                    })
                });
                const data = await res.json();
                setClientSecret(data.clientSecret);
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setLoading(false);
            }
        }
        getSecret();

    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setProcessing(true);

            if (!stripe || !elements || !clientSecret) {
                return;
            }

            const card = elements.getElement(CardElement);

            if (card == null) {
                return;
            }
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card,
            });

            if (error) {
                setCardError(error.message);
                console.log(error.message);
            } else {
                setCardError('')
            }
            const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: card,
                        billing_details: {
                            name: name,
                            email: user?.email,
                        },
                    },
                },
            );

            if (intentError) {
                setCardError(intentError?.message);
                setProcessing(false);
            }
            else {
                setCardError('');
                setTransactionId(paymentIntent.id);

                const bookedPackage = {
                    package: _id,
                    email: user?.email,
                    transactionId: paymentIntent.id
                }

                fetch('http://localhost:5000/booking', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookedPackage)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('Payment Successful');
                        console.log(data);
                        navigate('/profile');
                    })

            }
        }
        finally {
            setProcessing(false);
        }

    };


    return (
        <>
            {cardError && <p className='pb-5 text-red-600 text-sm'>{cardError}</p>}
            {loading ? 'Loading...' : <form className='w-full' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='px-5 py-1 bg-yellow-600 text-white rounded-full mt-4 disabled:cursor-not-allowed' type="submit" disabled={!stripe || !clientSecret}>
                    {processing ? 'Processing...' : 'Pay'}
                </button>
            </form>}
        </>
    );
};

export default CheckOutForm;