import { Suspense } from "react";
import { Await, useLoaderData, useParams } from "react-router-dom";
import BookingDetail from "../../features/bookings/BookingDetail";
import { Empty, Spinner } from "../../ui";

const BookingPage = (): JSX.Element => {
  const data = useLoaderData() as {
    booking: IBookingData<number, number>;
  };
  const { bookingId } = useParams();
  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={data.booking}
        errorElement={<Empty resource={`booking #${bookingId}`} />}>
        <BookingDetail />
      </Await>
    </Suspense>
  );
};

export default BookingPage;
