const product = {
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    {
      name: "type",
      title: "Product Type",
      type: "string",
      options: {
        list: [
          { title: "PC", value: "pc" },
          { title: "Mouse", value: "mouse" },
          { title: "Keyboard", value: "keyboard" },
          {title: "Monitor", value: "monitor" },
        ], // Dropdown mit Produkttypen
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name", // Use the "name" field as the source for generating the slug
        maxLength: 200, // Adjust the maximum length as needed
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true, // Allows selecting a hotspot for cropping
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "extraImages",
      title: "Extra Images",
      type: "array",
      of: [{ type: "image" }],
    },
    {
      name: "colors",
      title: "Colors",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: ["Grey", "Black", "Blue"], // Add your color options
          },
        },
      ],
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DDTHH:mm:ssZ",
      },
      readOnly: true,
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }], // Reference to the "category" schema
      validation: (Rule) => Rule.required(),
    },
    {
      name: "prozessor",
      title: "Prozessor",
      type: "text",
      
      hidden: ({ parent }) => parent?.type !== "pc", 
    },
    {
      name: "grafikkarte",
      title: "Grafikkarte",
      type: "text",
      
      hidden: ({ parent }) => parent?.type !== "pc", 
    },
    {
      name: "arbeitsspeicher",
      title: "Arbeitsspeicher",
      type: "text",
      
      hidden: ({ parent }) => parent?.type !== "pc", 
    },
    {
      name: "ssd",
      title: "SSD",
      type: "text",
      
      hidden: ({ parent }) => parent?.type !== "pc", 
    },
    {
      name: "zusaetzlich",
      title: "Zusätzlich",
      type: "text",
      validation: (Rule) => Rule.required(),

    },
    {
      name: "cpukuehlung",
      title: "CPU-Kühlung",
      type: "text",
      
      hidden: ({ parent }) => parent?.type !== "pc", 
    },
    {
      name: "mainboard",
      title: "Mainboard",
      type: "text",
      
      hidden: ({ parent }) => parent?.type !== "pc", 
    },
    {
      name: "gehaeuse",
      title: "Gehäuse",
      type: "text",
      
      hidden: ({ parent }) => parent?.type !== "pc", 
    },
    {
      name: "netzteil",
      title: "Netzteil",
      type: "text",
      
      hidden: ({ parent }) => parent?.type !== "pc", 
    },
    {
      name: "status",
      title: "Status",
      type: 'string',
      options: {
        list: [
          { title: 'Status 1', value: '1' },
          { title: 'Status 2', value: '2' },
        ],
      },
    },
    {
      name: "pstreaming",
      title: "% Streaming",
      type: "number",
      
      hidden: ({ parent }) => parent?.type !== "pc", 
    },
    {
      name: "pgaming",
      title: "% Gaming",
      type: "number",
      
      hidden: ({ parent }) => parent?.type !== "pc", 
    },

    // Mouse
    {
      name: "eignung",
      title: "Eignung",
      type: "string",
      
      hidden: ({ parent }) => parent?.type !== "mouse", 
    },
    {
      name: "tasten",
      title: "Tasten",
      type: "string",
      
      hidden: ({ parent }) => parent?.type !== "mouse", 
    },
    {
      name: "aufloesung",
      title: "Auflösung",
      type: "string",
      
      hidden: ({ parent }) => parent?.type !== "mouse" && parent?.type !== "monitor", // Zeigt nur bei "mouse" oder "keyboard"
    },
    {
      name: "sensor",
      title: "Sensor",
      type: "string",
      
      hidden: ({ parent }) => parent?.type !== "mouse", 
    },
    {
      name: "abfragerate",
      title: "Abfragerate",
      type: "string",
      
      hidden: ({ parent }) => parent?.type !== "mouse", 
    },
    {
      name: "beleuchtung",
      title: "Beleuchtung",
      type: "string",
      
      hidden: ({ parent }) => parent?.type !== "mouse" && parent?.type !== "keyboard", // Zeigt nur bei "mouse" oder "keyboard"
    },
    {
      name: "abtastung",
      title: "Abtastung",
      type: "string",
      
      hidden: ({ parent }) => parent?.type !== "mouse", 
    },

    // Tastatur
    {
      name: "layout",
      title: "Layout",
      type: "string",
      
      hidden: ({ parent }) => parent?.type !== "keyboard", 
    },
    {
      name: "switchmodell",
      title: "Switch-Modell",
      type: "string",
      
      hidden: ({ parent }) => parent?.type !== "keyboard", 
    },
    {
      name: "switch",
      title: "Switch",
      type: "string",
      
      hidden: ({ parent }) => parent?.type !== "keyboard", 
    },
    {
      name: "verbindung",
      title: "Verbindung",
      type: "string",
      hidden: ({ parent }) => parent?.type !== "mouse" && parent?.type !== "keyboard", // Zeigt nur bei "mouse" oder "keyboard"
    },
    
    {
      name: "switchcharakteristik",
      title: "Switch-Charakteristik",
      type: "string",
      
      hidden: ({ parent }) => parent?.type !== "keyboard", 
    },
    {
      name: "switchschaltbetaetigungskraft",
      title: "Switch-Schaltbetätigungskraft",
      type: "string",
      
      hidden: ({ parent }) => parent?.type !== "keyboard", 
    },
    {
      name: "switchlebensdauer",
      title: "Switch-Lebensdauer",
      type: "string",
      
      hidden: ({ parent }) => parent?.type !== "keyboard", 
    },

    // Monitore
    {
      name: "diagonale",
      title: "Diagonale",
      type: "string",
      
      hidden: ({ parent }) => parent?.type !== "monitor", 
    },
    {
      name: "bildwiederholfrequenz",
      title: "Bildwiederholfrequenz",
      type: "string",
      
      hidden: ({ parent }) => parent?.type !== "monitor", 
    },
    {
      name: "reaktionszeit",
      title: "Reaktionszeit",
      type: "string",
      
      hidden: ({ parent }) => parent?.type !== "monitor", 
    },
    {
      name: "panel",
      title: "Panel",
      type: "string",
      
      hidden: ({ parent }) => parent?.type !== "monitor", 
    },
    {
      name: "helligkeit",
      title: "Helligkeit",
      type: "string",
      
      hidden: ({ parent }) => parent?.type !== "monitor", 
    },
    {
      name: "form",
      title: "Form",
      type: "string",
      
      hidden: ({ parent }) => parent?.type !== "monitor", 
    },
    {
      name: "farbtiefe",
      title: "Farbtiefe",
      type: "string",
      
      hidden: ({ parent }) => parent?.type !== "monitor", 
    },
  ],
  initialValue: {
    createdAt: new Date().toISOString(),
  },
};

export default product;
