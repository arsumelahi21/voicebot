import aiService from "../services/ai.service.js";

import sessionService from "../services/session.service.js";

import bookingStateService from "../services/booking-state.service.js";

import bookingService from "../services/booking.service.js";

import { extractBookingDetails } from "../utils/booking-parser.js";

import { isBookingIntent } from "../utils/intent-detector.js";

export const chat = async (
  req,
  res
) => {
  try {
    const { message, sessionId } =
      req.body;

    if (!message || !sessionId) {
      return res.status(400).json({
        error:
          "message and sessionId required",
      });
    }

    // Detect booking intent
    const bookingIntent =
      isBookingIntent(message);

    // Extract booking details
    const extracted =
      extractBookingDetails(message);

    // Update structured booking state
    const updatedState =
      bookingStateService.updateState(
        sessionId,
        extracted
      );

    // Save user message
    sessionService.addMessage(
      sessionId,
      {
        role: "user",
        content: message,
      }
    );

    /*
     |--------------------------------------------------------------------------
     | BOOKING FLOW
     |--------------------------------------------------------------------------
     */
    if (bookingIntent) {
      // Check missing fields
      const missingFields =
        bookingStateService.getMissingFields(
          updatedState
        );

      // Ask for missing fields
      if (missingFields.length > 0) {
        const reply = `Please provide the following information: ${missingFields.join(
          ", "
        )}`;

        sessionService.addMessage(
          sessionId,
          {
            role: "assistant",
            content: reply,
          }
        );

        return res.json({
          reply,
          bookingState: updatedState,
        });
      }

      // Create booking
      const bookingResult =
        bookingService.createBooking(
          updatedState
        );

      // Successful booking
      if (bookingResult.success) {
        const booking =
          bookingResult.booking;

        const reply = `Your reservation has been confirmed for ${booking.name} on ${booking.date} at ${booking.time} for ${booking.partySize} guests at Tasca do Miradouro.`;

        sessionService.addMessage(
          sessionId,
          {
            role: "assistant",
            content: reply,
          }
        );

        // Clear state after completion
        bookingStateService.clearState(
          sessionId
        );

        return res.json({
          reply,
          booking,
        });
      }

      // Failed booking
      const reply =
        bookingResult.alternative
          ? `Unfortunately that slot is unavailable. The next available slot is ${bookingResult.alternative.time} on ${bookingResult.alternative.date}.`
          : bookingResult.reason;

      sessionService.addMessage(
        sessionId,
        {
          role: "assistant",
          content: reply,
        }
      );

      return res.json({
        reply,
      });
    }

    /*
     |--------------------------------------------------------------------------
     | GENERAL AI FLOW
     |--------------------------------------------------------------------------
     */

    const messages =
      sessionService.getMessages(
        sessionId
      );

    const response =
      await aiService.chat(messages);

    // Save assistant reply
    sessionService.addMessage(
      sessionId,
      {
        role: "assistant",
        content: response.reply,
      }
    );

    return res.json(response);
  } catch (error) {
    console.error(error);

    return res.status(
      error.status || 500
    ).json({
      success: false,
      error: error.message,
    });
  }
};