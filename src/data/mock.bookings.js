const blockedTimes = [
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

export const MOCK_BOOKINGS = [
  ...blockedTimes.map((time) => ({
    date: "2024-06-07",
    time,
    blocked: true,
  })),

  ...blockedTimes.map((time) => ({
    date: "2025-06-07",
    time,
    blocked: true,
  })),

  ...blockedTimes.map((time) => ({
    date: "2026-06-07",
    time,
    blocked: true,
  })),
];