import * as chrono from "chrono-node";

export const extractBookingDetails = (
  text
) => {
  const parsed = {};

  const lowerText =
    text.toLowerCase();

  // Parse natural language
  const results =
    chrono.parse(text);

  if (results.length > 0) {
    const result = results[0];

    const date =
      result.start.date();

    // Always extract date
    parsed.date = date
      .toISOString()
      .split("T")[0];

    // ONLY extract time if explicitly mentioned
    const hasExplicitTime =
      /\b\d{1,2}(:\d{2})?\s?(am|pm)?\b/i.test(
        lowerText
      );

    if (hasExplicitTime) {
      parsed.time =
        date.toLocaleTimeString(
          "en-GB",
          {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }
        );
    }
  }

  // Extract party size
  const partyMatch = text.match(
    /(\d+)\s?(people|guests|persons|pessoas)?/i
  );

  if (partyMatch) {
    parsed.partySize = Number(
      partyMatch[1]
    );
  }

  // Extract name
  const nameMatch = text.match(
    /for\s([A-Za-z]+)/i
  );

  if (nameMatch) {
    parsed.name = nameMatch[1];
  }

  return parsed;
};