import faqService from "../services/faq.service.js";

export const getFAQs = (
  req,
  res
) => {
  const faqs =
    faqService.getFAQs();

  return res.json(faqs);
};