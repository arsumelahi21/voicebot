import { BOOKING_STATE } from "../data/booking-state.store.js";

class BookingStateService {
  getState(sessionId) {
    if (!BOOKING_STATE[sessionId]) {
      BOOKING_STATE[sessionId] = {};
    }

    return BOOKING_STATE[sessionId];
  }

  updateState(sessionId, data) {
    if (!BOOKING_STATE[sessionId]) {
      BOOKING_STATE[sessionId] = {};
    }

    BOOKING_STATE[sessionId] = {
      ...BOOKING_STATE[sessionId],
      ...data,
    };

    return BOOKING_STATE[sessionId];
  }

  clearState(sessionId) {
    delete BOOKING_STATE[sessionId];
  }

  isComplete(state) {
    return (
      state.name &&
      state.partySize &&
      state.date &&
      state.time
    );
  }

  getMissingFields(state) {
    const missing = [];

    if (!state.name)
      missing.push("name");

    if (!state.partySize)
      missing.push("party size");

    if (!state.date)
      missing.push("date");

    if (!state.time)
      missing.push("time");

    return missing;
  }
}

export default new BookingStateService();