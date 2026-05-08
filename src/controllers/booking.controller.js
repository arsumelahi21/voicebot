import availabilityService from "../services/availability.service.js";
import bookingService from "../services/booking.service.js";

export const checkAvailability = (
  req,
  res
) => {
  const { date, time } = req.body;

  const result =
    availabilityService.checkAvailability(
      date,
      time
    );

  return res.json(result);
};

export const createBooking = (
  req,
  res
) => {

  try {
  const result =
    bookingService.createBooking(
      req.body
    );

  return res.json(result);
  }catch (error) {
  return res.status(500).json({
    success: false,
    error: "Failed to create booking",
  });
}
};

export const getBookings = (
  req,
  res
) => {

   try {
    const bookings =
      bookingService.getBookings();

    return res.json(bookings);
   }catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error:
        "Failed to fetch bookings",
    });
  }
};