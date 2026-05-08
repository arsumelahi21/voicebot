export const isBookingIntent = (
  text
) => {
  const bookingKeywords = [
    "book",
    "booking",
    "reservation",
    "reserve",
    "table",
    "guests",
    "people",
    "party",
    "mesa",
    "reserva",
  ];

  const lower =
    text.toLowerCase();

  return bookingKeywords.some(
    (keyword) =>
      lower.includes(keyword)
  );
};