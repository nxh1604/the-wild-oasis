import Button from "../../ui/Button";

function CheckoutButton({ bookingId }: { bookingId: number | string }) {
  return (
    <Button variation="primary" size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
