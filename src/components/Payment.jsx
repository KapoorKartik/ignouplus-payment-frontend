import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import MyForm from './Form';

const Payment = () => {

    const navigate = useNavigate();

    const verifyPayment = async (resData)=>{
        
        const {data} = await axios.post('http://localhost/phonepay/verify_payment.php', resData);
        // console.log('{data} from pay verify:', {data})
        if (data === 'Successful'){
            alert("Payment Sucess")
            navigate("/thanks")            
        }else {
            alert("Payment Failed")
        }
    }

    const handleSubmit = async (formData) => {

        try {
            const {data} = await axios.post('http://localhost/phonepay/razorpay_redirect.php', formData);
            console.log('data:', data)


            if (data.success) {
                // Razorpay initialization and form display
                const options = {
                    key: 'rzp_live_Mve4wgbJgNAKwD',
                    amount: data.amount,
                    currency: 'INR',
                    name: 'Pi Web Tech',
                    description: 'Payment Description bla bla bla',
                    image: 'https://cdn.razorpay.com/logos/NIebO22WUklO0B_large.png',
                    order_id: data.orderId,
                    handler: function (response) {
                        // Handle payment success
                        console.log('response kk:', response)
                        verifyPayment(response)
                        // navigate("/thanks")
                    },
                    prefill: {
                        email: data.email,
                        contact: data.mobileNumber
                    },
                    notes: {
                        address: 'Your Address'
                    },
                    // theme: {
                    //     color: '#F37254'
                    // }
                };
                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                console.error('Error:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        // Load Razorpay checkout script dynamically
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // useEffect(()=> console.log('fd changed', formData),[formData])

    // const updateState = (data) => {
    //     setFormData({...formData , ...data})
    // }

    return (
     
        <>
  <div class="bg-white p-3 border  shadow-lg m-2" style={{borderRadius : "20px"}}>

        <Link to="/"> <button type="button" class="btn btn-outline-primary my-2">
        <svg viewBox="0 0 1024 1024"  height='30px' width='30px' xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="#000000" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g></svg>
            Payment Details</button></Link>
        <MyForm handleSubmit={handleSubmit}/>
        </div>
        </>
    );
};

export default Payment;
