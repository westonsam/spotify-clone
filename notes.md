Note to self:

During Stripe development, Stripe webhook and Project must be running to ensure databse and stripe are in sync

<!-- Run the commands: -->
stripe listen --forward-to localhost:3000/api/webhooks
npm run dev

<!-- Can test with: -->
stripe trigger payment_intent.succeeded