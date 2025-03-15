export default {
  name: 'component',
  title: 'Component',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Gehäuse', value: 'gehaeuse' },
          { title: 'Motherboard', value: 'motherboard' },
          { title: 'CPU', value: 'cpu' },
          { title: 'Netzteil', value: 'netzteil' },
          { title: 'Kühlung', value: 'kuehlung' },
          { title: 'Ram', value: 'ram' },
          { title: 'SSD', value: 'ssd' },
          { title: 'Grafikkarte', value: 'gpu' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'kuehler',
      title: 'Kühler',
      type: 'string',
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
      options: {
        list: [
          { title: 'Intel', value: 'Intel' },
          { title: 'AMD', value: 'AMD' },
        ],
      },
      hidden: ({ parent }) => {
        const { type } = parent;
        return type !== 'cpu'; // Brand nur für CPUs sichtbar
      },
    },
    {
      name: 'brandgpu',
      title: 'Brand GPU',
      type: 'string',
      options: {
        list: [
          { title: 'NVIDIA', value: 'Nvidia' },
          { title: 'AMD', value: 'AMD' },
        ],
      },
      hidden: ({ parent }) => {
        const { type } = parent;
        return type !== 'gpu'; // Brand GPU nur für GPUs sichtbar
      },
    },
    {
      name: 'kuehlungsart',
      title: 'Kühlungsart',
      type: 'string',
      options: {
        list: [
          { title: 'Wasserkühlung', value: 'wasser' },
          { title: 'Luftkühlung', value: 'luft' },
        ],
      },
      hidden: ({ parent }) => {
        const { type } = parent;
        return !(type === 'kuehlung'); 
      },
    },
    {
      name: 'recommendedKuehlungsart',
      title: 'Empfohlene Kühlungsart',
      type: 'string',
      options: {
        list: [
          { title: 'Wasserkühlung', value: 'wasser' },
          { title: 'Luftkühlung', value: 'luft' },
        ],
      },
    },
    {
      name: 'compatibleWith',
      title: 'Compatible With',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'component' }] }],
      description: 'CPUs, mit denen dieses Mainboard oder Kühlung kompatibel ist.',
      hidden: ({ parent }) => {
        const { type } = parent;
        return !(type === 'motherboard' || type === 'netzteil' || type === 'gehaeuse'); // Nur für Mainboards und Kühlungen sichtbar
      },
    },
    {
      name: 'recommendedFor',
      title: 'Empfohlen für CPUs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'component' }] }],
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      hidden: ({ parent }) => {
        const { type } = parent;
        return type === 'caseStyle'; // Preis nur für Gehäuse und Motherboards sichtbar
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
