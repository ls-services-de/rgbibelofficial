export default {
    name: 'contactForm',
    title: 'Contact Form',
    type: 'document',
    fields: [
      {
        name: 'firstName',
        type: 'string',
        title: 'Vorname',
      },
      {
        name: 'lastName',
        type: 'string',
        title: 'Nachname',
      },
      {
        name: 'phone',
        type: 'string',
        title: 'Telefonnummer',
      },
      {
        name: 'email',
        type: 'string',
        title: 'Email',
      },
      {
        name: 'message',
        type: 'text',
        title: 'Anliegen',
      },
      {
        name: 'pcNumber',
        title: 'PC Nummer',
        type: 'string', // Store as string
      },
      {
        name: 'supportNumber',
        title: 'Support-Nummer',
        type: 'string',
        readOnly: true, // Optional: makes it read-only
      },
      {
        name: 'status',
        title: 'Status',
        type: 'string',
        options: {
          list: [
            { title: 'Offen', value: 'Offen' },
            { title: 'In Bearbeitung', value: 'In Bearbeitung' },
            { title: 'Abgeschlossen', value: 'Abgeschlossen' },
          ],
          layout: 'dropdown', // Optional: makes it a dropdown
        },
      },
      {
        name: 'timestamp',
        title: 'Timestamp',
        type: 'datetime', // This will store the submission time
        options: {
          dateFormat: 'YYYY-MM-DD',
          timeFormat: 'HH:mm:ss',
          calendarTodayLabel: 'Heute',
        },
      },
      {
        name: 'file',
        type: 'file',
        title: 'Hochgeladene Datei',
        options: {
          storeOriginalFilename: true,
        },
      },
    ],
    // Define the title using a custom function
    preview: {
      select: {
        title: 'supportNumber', // Set supportNumber as the title
      },
      prepare({ title }) {
        return {
          title: title || 'Unbekannte Anfrage', // Fallback title if no supportNumber
        };
      },
    },
  };
  