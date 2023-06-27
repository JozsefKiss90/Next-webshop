import { buffer } from 'micro'
import Stripe from "stripe";
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export const config = {
  api: {
    bodyParser: false,
  },
}

const webHookHandlers = {
  'checkout.session.completed': (data) => {
    console.log('Checkout completed successfully', data);
    // other business logic
  },

  'payment_intent.succeeded': (data) => {
    console.log('Payment succeeded', data);
  },
  'payment_intent.payment_failed': (data) => {
    console.log('Payment Failed', data);
  }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const webhookHandler = async (req, res) => {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']

    let event

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret)
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }
    res.json({ received: true })
    if (webHookHandlers[event.type]) {
      webHookHandlers[event.type](event.data.object);
    }
    
  }
}

export default webhookHandler;
