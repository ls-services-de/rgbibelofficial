export default {
    name: 'questions',
    title: 'Question',
    type: 'document',
    fields: [
      {
        name: 'question',
        title: 'Question',
        type: 'string',
      },
      {
        name: 'id',
        title: 'ID',
        type: 'number',
        validation: Rule => Rule.required(),
      },
      {
        name: 'compatibleWith',
        title: 'Compatible With',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'answers' }] }],
        description: 'Die Antworten, die diese Frage freischalten',
      },
      {
        name: 'file',
        title: 'Datei',
        type: 'file', // Dateifeld für den Upload
      },
      {
        name: 'fileName',
        title: 'Dateiname',
        type: 'string', // Feld für den benutzerdefinierten Dateinamen
        description: 'Geben Sie den Dateinamen für die herunterladbare Datei ein',
      },
    ],
  };
  