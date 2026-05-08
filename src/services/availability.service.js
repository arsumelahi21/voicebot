import dayjs from "dayjs";

import {
  OPENING_HOURS,
  SLOT_INTERVAL_MINUTES,
} from "../data/restaurant.config.js";

import { MOCK_BOOKINGS } from "../data/mock.bookings.js";

import { BOOKINGS } from "../data/bookings.store.js";

import { generateTimeSlots } from "../utils/slot.utils.js";

class AvailabilityService {
  checkAvailability(date, time) {
    const bookingDate = dayjs(date);

    const normalizedDate =
      bookingDate.format("YYYY-MM-DD");

    const normalizedTime = time
  .replace(/\s+/g, "")
  .padEnd(5, "0")
  .slice(0, 5);

    const dayOfWeek =
      bookingDate.day();

    const hours =
      OPENING_HOURS[dayOfWeek];

    // Closed day
    if (!hours) {
      return {
        available: false,
        reason:
          "Restaurant is closed on this day",
      };
    }

    console.log({
    normalizedDate,
    normalizedTime,

  });

    // Generate valid slots
    const validSlots =
      generateTimeSlots(
        hours.open,
        hours.close,
        SLOT_INTERVAL_MINUTES
      );

      console.log(validSlots)

    // Invalid slot
    if (
      !validSlots.includes(
        normalizedTime
      )
    ) {
      return {
        available: false,
        reason:
          "Invalid booking time",
      };
    }

    // Check static blocked bookings
    const blockedMock =
      MOCK_BOOKINGS.find(
        (booking) =>
          booking.date ===
            normalizedDate &&
          booking.time ===
            normalizedTime &&
          booking.blocked
      );

    // Check dynamic live bookings
    const blockedLive =
      BOOKINGS.find(
        (booking) =>
          booking.date ===
            normalizedDate &&
          booking.time ===
            normalizedTime
      );

    if (blockedMock || blockedLive) {
      const alternative =
        this.getNextAvailableSlot(
          normalizedDate,
          normalizedTime
        );

      return {
        available: false,
        reason:
          "Requested slot unavailable",
        alternative,
      };
    }

    return {
      available: true,
    };
  }

  getNextAvailableSlot(date, time) {
  const bookingDate =
    dayjs(date);

  const normalizedDate =
    bookingDate.format(
      "YYYY-MM-DD"
    );

  const normalizedTime =
    time
      .replace(/\s+/g, "")
      .padEnd(5, "0")
      .slice(0, 5);

  const dayOfWeek =
    bookingDate.day();

  const hours =
    OPENING_HOURS[dayOfWeek];

  if (!hours) return null;

  const validSlots =
    generateTimeSlots(
      hours.open,
      hours.close,
      SLOT_INTERVAL_MINUTES
    );

  const requestedIndex =
    validSlots.indexOf(
      normalizedTime
    );

  if (
    requestedIndex === -1
  ) {
    return null;
  }

  // SEARCH FORWARD
  for (
    let i =
      requestedIndex + 1;
    i < validSlots.length;
    i++
  ) {
    const slot =
      validSlots[i];

    const blockedMock =
      MOCK_BOOKINGS.find(
        (booking) =>
          booking.date ===
            normalizedDate &&
          booking.time ===
            slot &&
          booking.blocked
      );

    const blockedLive =
      BOOKINGS.find(
        (booking) =>
          booking.date ===
            normalizedDate &&
          booking.time ===
            slot
      );

    if (
      !blockedMock &&
      !blockedLive
    ) {
      return {
        date:
          normalizedDate,
        time: slot,
      };
    }
  }

  // SEARCH BACKWARD
  for (
    let i =
      requestedIndex - 1;
    i >= 0;
    i--
  ) {
    const slot =
      validSlots[i];

    const blockedMock =
      MOCK_BOOKINGS.find(
        (booking) =>
          booking.date ===
            normalizedDate &&
          booking.time ===
            slot &&
          booking.blocked
      );

    const blockedLive =
      BOOKINGS.find(
        (booking) =>
          booking.date ===
            normalizedDate &&
          booking.time ===
            slot
      );

    if (
      !blockedMock &&
      !blockedLive
    ) {
      return {
        date:
          normalizedDate,
        time: slot,
      };
    }
  }

  return null;
}
}

export default new AvailabilityService();