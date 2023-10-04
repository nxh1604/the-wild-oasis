import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }: { bookingId: number | string }) {
  const { updateCheckout, loadingUpdate } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      disabled={loadingUpdate}
      onClick={() => updateCheckout({ bookingId })}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
