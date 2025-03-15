import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'order',
  type: 'document',
  title: 'Order',
  fields: [
    {
      name: 'pcNumber',
      type: 'string',
      title: 'PC Nummer',
      readOnly: true,
      
    },
    {
      name: 'email',
      type: 'string',
      title: 'Kundenemail',
    },
    {
      name: 'adresse',
      type: 'string',
      title: 'Adresse',
    },
    {
      name: 'customername',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'status',
      type: 'string',
      title: 'Status der Bestellung',
      options: {
        list: [
          { title: 'Zahlung bestätigt', value: 'Zahlung bestätigt' },
          { title: 'In Bearbeitung', value: 'In Bearbeitung' },
          { title: 'Komponentenprüfung', value: 'Komponentenprüfung' },
          { title: 'Im Belastungstest', value: 'Im Belastungstest' },
          { title: 'Versandbereit', value: 'Versandbereit' },
          { title: 'Elektronisch angekündigt', value: 'Elektronisch angekündigt' },
          { title: 'Paket an DHL übergeben', value: 'Paket an DHL übergeben' },
          { title: 'Paket im Paketzustellzentrum', value: 'Paket im Paketzustellzentrum' },
          { title: 'Paket in Zustellung', value: 'Paket in Zustellung' },
         

          
        ],
      },
    },
    {
      name: 'products',
      type: 'array',
      title: 'Products',
      of: [{ type: 'string' }],
    },
    {
      name: 'preis',
      type: 'number',
      title: 'Gesamtpreis',
    },
    {
      name: 'creationDate',
      type: 'datetime',
      title: 'Erstellungsdatum',
      readOnly: true,
      initialValue: () => new Date().toISOString(),  // Automatically set the creation date to now
    },
  ],
  // Optionally add custom validation or actions here
};
