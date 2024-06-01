import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [mobileNumber, setMobileNumber] = useState('8626866293');
    const [amount, setAmount] = useState('100');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const {data} = await axios.post('http://localhost/phonepay/razorpay_redirect.php', {
                mobileNumber,
                amount : amount * 100,
            });

            // const data = response.data;
            // let data = {
            //     "success": true,
            //     "checkoutUrl": "https://checkout.razorpay.com/v1/checkout.js",
            //     "orderId": "order_OHQJGMbO1H4AdQ",
            //     "amount": 100,
            //     "mobileNumber": "8626866293"
            //   }
            console.log('data:', data)

            if (data.success) {
                // Razorpay initialization and form display
                const options = {
                    key: 'rzp_live_Mve4wgbJgNAKwD',
                    amount: data.amount,
                    currency: 'INR',
                    name: 'Pi Web Tech',
                    description: 'Payment Description bla bla bla',
                    image: 'https://example.com/your_logo.png',
                    order_id: data.orderId,
                    handler: function (response) {
                        // Handle payment success
                        console.log('response kk:', response)
                    },
                    prefill: {
                        email: 'example@example.com',
                        contact: data.mobileNumber
                    },
                    notes: {
                        address: 'Your Address'
                    },
                    theme: {
                        color: '#F37254'
                    }
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

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Mobile Number:</label>
                <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Amount:</label>
                <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default App;
