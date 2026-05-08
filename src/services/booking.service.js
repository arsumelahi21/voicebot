
import availabilityService from "./availability.service.js";
import { BOOKINGS } from "../data/bookings.store.js";


class BookingService {
  createBooking(data) {
    const {
      name,
      partySize,
      date,
      time,
    } = data;

    // Max party validation
    if (partySize > 10) {
      return {
        success: false,
        reason:
          "Maximum party size is 10",
      };
    }

    // Check availability
    const availability =
      availabilityService.checkAvailability(
        date,
        time
      );

    if (!availability.available) {
      return {
        success: false,
        ...availability,
      };
    }

    // Prevent duplicate bookings
    const existingBooking = BOOKINGS.find(
      (booking) =>
        booking.name === name &&
        booking.date === date &&
        booking.time === time
    );

    if (existingBooking) {
      return {
        success: false,
        reason:
          "Duplicate booking detected",
      };
    }

    const booking = {
      id: Date.now(),
      name,
      partySize,
      date,
      time,
      createdAt: new Date(),
    };

    BOOKINGS.push(booking);

    return {
        success: true,
        message:
            "Booking confirmed successfully",
        booking,
    };
  }

  getBookings() {
    return BOOKINGS;
  }
}

export default new BookingService();