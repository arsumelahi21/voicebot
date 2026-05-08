import dayjs from "dayjs";

export const generateTimeSlots = (
  openTime,
  closeTime,
  intervalMinutes = 30
) => {
  const slots = [];

  let current = dayjs(`2026-01-01 ${openTime}`);
  let end = dayjs(`2026-01-01 ${closeTime}`);

  // Handle midnight crossing
  if (closeTime === "00:00") {
    end = end.add(1, "day");
  }

  while (current.isBefore(end)) {
    slots.push(current.format("HH:mm"));
    current = current.add(intervalMinutes, "minute");
  }

  return slots;
};