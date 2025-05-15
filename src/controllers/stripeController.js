import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
    appInfo: {
        name: 'stripe-samples/checkout-one-time-payments',
        version: '0.0.1',
        url: 'https://github.com/stripe-samples/checkout-one-time-payments',
    },
});


export const getCheckoutSessionStripe = async (req, res) => {
    try {
        const { totalAmount, quantity } = req.body;

        if (!totalAmount || !quantity) {
            return res.status(400).json({ message: 'Missing totalAmount or quantity' });
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Custom Product',
                        },
                        unit_amount: Math.round(totalAmount * 100), // Stripe expects amount in cents
                    },
                    quantity: quantity,
                },
            ],
            success_url: `http://localhost:3000/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000/api/stripe/canceled.html`,
        });

        res.status(201).json({
            message: 'Please follow the link below to complete the checkout ann payment process.',
            data: session
        });

    } catch (error) {
        console.error('Stripe Checkout Session Error:', error);
        return res.status(500).json({
            message: 'Failed to create checkout session',
            error: error.message
        });
    }
};


// Fetch the Checkout Session to display the JSON result on the success page
export const getStripeSession = async (req, res) => {
    try {
        const { sessionId } = req.query;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        //res.send(session);
        res.status(201).json({
            message: 'Stripe Checkout Completed Successfully.',
            data: session
        });
    } catch (error) {
        console.error('Stripe Checkout Session Error:', error);
        return res.status(500).json({
            message: 'Failed to create checkout session',
            error: error.message
        });
    }
};


