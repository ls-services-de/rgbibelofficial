// sanity/schemas/answers.js

export default {
  name: 'answers',
  title: 'Answers',
  type: 'document',
  fields: [
    {
      name: 'answer',
      title: 'Answer',
      type: 'string',
    },
    {
      name: 'nextQuestionId',
      title: 'Next Question ID',
      type: 'number',
    },
    {
      name: 'useCustomAnswer',
      title: 'Use Custom Answer',
      type: 'boolean',
    },
    {
      name: 'recommendedFor',
      title: 'Recommended For',
      type: 'string',
      options: {
        list: [
          { title: 'Support', value: 'support' },
          { title: 'Einsenden', value: 'einsenden' },
        ],
      },
    },
    {
      name: 'isLastQuestion',
      title: 'Is this the last question?',
      type: 'boolean', // Neue Boolean-Feld zum Markieren der letzten Frage
    },
  ],
};
