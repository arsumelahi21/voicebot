import dayjs from "dayjs";

import { MENU } from "../data/menu.data.js";

class MenuService {
  getRecommendations(
    date,
    time,
    query
  ) {
    const recommendations = [];

    const bookingDate =
      date && dayjs(date).isValid()
        ? dayjs(date)
        : dayjs();

    const normalizedQuery =
      query?.toLowerCase() || "";

    // Detect meal intent
    const isLunchQuery =
      normalizedQuery.includes(
        "lunch"
      );

    const isDinnerQuery =
      normalizedQuery.includes(
        "dinner"
      ) ||
      normalizedQuery.includes(
        "evening"
      );

    // Infer time from query
    if (isLunchQuery) {
      time = "13:00";
    }

    if (isDinnerQuery) {
      time = "19:00";
    }

    const safeTime =
      time || "19:00";

    const hour = Number(
      safeTime.split(":")[0]
    );

    // Meal windows
    const isLunch =
      hour < 15;

    const isEvening =
      hour >= 18;

    // Weekend detection
    const isWeekend =
      normalizedQuery.includes(
        "saturday"
      ) ||
      normalizedQuery.includes(
        "sunday"
      ) ||
      normalizedQuery.includes(
        "weekend"
      ) ||
      bookingDate.day() === 0 ||
      bookingDate.day() === 6;

    // Monthly special detection
    const isMay =
      normalizedQuery.includes(
        "may"
      ) ||
      normalizedQuery.includes(
        "monthly"
      ) ||
      normalizedQuery.includes(
        "special"
      ) ||
      bookingDate.month() === 4;

    // Lunch recommendations
    if (isLunch) {
      recommendations.push(
        ...MENU.items.filter(
          (item) =>
            item.categories?.includes(
              "lunch"
            )
        )
      );
    }

    // Evening recommendations
    if (isEvening) {
      recommendations.push(
        ...MENU.items.filter(
          (item) =>
            item.categories?.includes(
              "dinner"
            )
        )
      );
    }

    // Weekend recommendations
    if (
      isWeekend &&
      isEvening
    ) {
      recommendations.push(
        ...MENU.items.filter(
          (item) =>
            item.categories?.includes(
              "weekend"
            )
        )
      );
    }

    // Monthly special
    if (isMay) {
      recommendations.push(
        ...MENU.items.filter(
          (item) =>
            item.categories?.includes(
              "monthly-special"
            )
        )
      );
    }

    // Remove duplicates
    const uniqueRecommendations =
      recommendations.filter(
        (item, index, self) =>
          index ===
          self.findIndex(
            (i) =>
              i.name === item.name
          )
      );

    return {
      mealType: isLunch
        ? "lunch"
        : isEvening
        ? "dinner"
        : "general",

      recommendations:
        uniqueRecommendations,
    };
  }

  getFullMenu() {
    return MENU;
  }
}

export default new MenuService();