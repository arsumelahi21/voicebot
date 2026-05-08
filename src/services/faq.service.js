class FAQService {
  getFAQs() {
    return {
      opening_hours: {
        monday: "Closed",
        tuesday: "12:00 – 22:00",
        wednesday: "10:00 – 22:00",
        thursday: "10:00 – 22:00",
        friday: "12:00 – 00:00",
        saturday: "10:30 – 00:00",
        sunday: "10:30 – 00:00",
      },

      walk_ins:
        "Walk-ins are welcome based on availability.",

      cuisine:
        "We serve traditional Portuguese cuisine.",

      max_party_size:
        "Maximum booking size is 10 guests.",

      booking_interval:
        "Reservations are available every 30 minutes.",
    };
  }
}

export default new FAQService();