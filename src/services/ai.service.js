import openai from "../config/openai.js";
import SYSTEM_PROMPT from "../prompts/system.prompt.js";
import { tools } from "../ai/tools.js";
import availabilityService from "./availability.service.js";
import bookingService from "./booking.service.js";
import menuService from "./menu.service.js";
import faqService from "./faq.service.js";

class AIService {
  async executeToolCall(toolCall) {
    const functionName =
      toolCall.function.name;

    const args = JSON.parse(
      toolCall.function.arguments
    );

    switch (functionName) {
      case "check_availability":
        return availabilityService.checkAvailability(
          args.date,
          args.time
        );

      case "create_booking":
        return bookingService.createBooking(
          args
        );

      case "get_menu_recommendations":
        return menuService.getRecommendations(
          args.date,
          args.time
        );
        
       case "get_faqs":
        return faqService.getFAQs();

      default:
        return {
          error: "Unknown tool",
        };
    }
  }

  async chat(messages) {
    // First AI call
    const initialResponse =
      await openai.chat.completions.create({
        model: "gpt-4.1-mini",

        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },

          ...messages,
        ],

        tools,
      });

    const assistantMessage =
      initialResponse.choices[0].message;

    // No tool calls
    if (!assistantMessage.tool_calls) {
      return {
        reply:
          assistantMessage.content,
      };
    }

    // Execute tools
    const toolResults = [];

    for (const toolCall of assistantMessage.tool_calls) {
      const result =
        await this.executeToolCall(
          toolCall
        );

      toolResults.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      });
    }

    // Second AI call with tool results
    const finalResponse =
      await openai.chat.completions.create({
        model: "gpt-4.1-mini",

        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },

          ...messages,

          assistantMessage,

          ...toolResults,
        ],
      });

    return {
      reply:
        finalResponse.choices[0].message
          .content,
    };
  }
}

export default new AIService();