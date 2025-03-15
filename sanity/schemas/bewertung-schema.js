export default {
    name: 'bewertung',
    type: 'document',
    title: 'Bewertung',
    fields: [
        {
            name: 'pcnummer',
            title: 'PCNummer',
            type: "string",

        },
        {
            name: "Kundenname",
            title: "Name",
            type: "string",

        },
        {
            name: "text",
            title: "Bewertungstext",
            type: "string",

        },
        {
            name: "sterne",
            title: "Sterneanzahl",
            type: "number",

        },
    ]
};