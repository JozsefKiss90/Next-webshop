const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req:any, res:any) {
  const { item } = req.body;

  const redirectURL ='http://localhost:3000'

  let transformedItem: {
    price_data: {
        currency: string;
        product_data: {
            images: any[];
            name: any;
        };
        unit_amount: number;
    };
    description: string;
    quantity: any;
}

   transformedItem  = {
    price_data: {
      currency: 'usd',
      product_data: {
        images: [item.img],
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    description: 'description',
    quantity: item.quantity,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [transformedItem],
    mode: 'payment',
    success_url: redirectURL ,
    cancel_url: redirectURL,
    metadata: {
      images: item.image,
    },
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;