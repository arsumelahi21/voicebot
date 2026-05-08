export const tools = [
  {
    type: "function",
    function: {
      name: "check_availability",
      description:
        "Check restaurant booking availability",
      parameters: {
        type: "object",
        properties: {
          date: {
            type: "string",
          },
          time: {
            type: "string",
          },
        },
        required: ["date", "time"],
      },
    },
  },

  {
    type: "function",
    function: {
      name: "create_booking",
      description:
        "Create restaurant booking",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          partySize: {
            type: "number",
          },
          date: {
            type: "string",
          },
          time: {
            type: "string",
          },
        },
        required: [
          "name",
          "partySize",
          "date",
          "time",
        ],
      },
    },
  },

  {
    type: "function",
    function: {
      name: "get_menu_recommendations",
      description:
        "Get contextual menu recommendations",
      parameters: {
        type: "object",
        properties: {
          date: {
            type: "string",
          },
          time: {
            type: "string",
          },
        },
        required: ["date", "time"],
      },
    },
  },
  {
  type: "function",
  function: {
    name: "get_faqs",
    description:
      "Get restaurant FAQ information",
    parameters: {
      type: "object",
      properties: {},
    },
  },
},
];