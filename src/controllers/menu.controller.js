import menuService from "../services/menu.service.js";

export const getRecommendations = (
  req,
  res
) => {
  const { date, time, query } = req.body;

  const recommendations =
    menuService.getRecommendations(
      date,
      time,
      query
    );

  return res.json(recommendations);
};

export const getMenu = (
  req,
  res
) => {
  return res.json(
    menuService.getFullMenu()
  );
};