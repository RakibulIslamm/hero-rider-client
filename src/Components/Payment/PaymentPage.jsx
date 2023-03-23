import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";



const stripePromise = loadStripe('pk_test_51L3apqGfM7t0biYB4EJ3FhP6vBMdlLOjeX6nVSf93agEihMX68uWaMa2YXSnlzsBFyQONnsHSEMY4FvjyQwwrstB00LkmE2hop');

const PaymentPage = () => {
    const [order, setOrder] = useState({});
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:5000/package/${id}`)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [id]);

    const { name, price } = order;
    const navigate = useNavigate();
    // console.log(id)


    return (
        <div className=''>
            <div className='px-[80px] xs:px-4 sm:px-10 w-1/2 mx-auto'>
                <div className='flex justify-center items-center min-h-screen'>
                    <div className='w-full'>
                        <div>
                            <h2 className='text-2xl xs:text-lg xs:w-full font-semibold'>Pay for: {name}</h2>
                            <h2 className='text-lg xs:text-lg xs:w-full font-semibold'>Total Price: ${price}</h2>
                        </div>
                        <div className='w-full mt-10 shadow-lg border p-5 rounded'>
                            <Elements stripe={stripePromise}>
                                <CheckOutForm order={order} />
                            </Elements>
                        </div>
                        <div className="flex justify-center items-center">
                            <button onClick={() => navigate(-1)} className="px-4 py-2 bg-sky-500 text-white mt-4 rounded">Back</button>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;