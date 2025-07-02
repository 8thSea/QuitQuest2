import { StripeProvider } from '@stripe/stripe-react-native';

export const STRIPE_PUBLISHABLE_KEY = 'pk_test_XXXXXXXXXXXXXXXXXXXXXXXX';

export function withStripeProvider(children) {
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>{children}</StripeProvider>
  );
}
