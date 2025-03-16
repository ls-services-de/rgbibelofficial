export default {
    name: 'repairRequest',
    title: 'Repair Request',
    type: 'document',
    fields: [
      {
        name: 'pcNumber',
        title: 'PC Number',
        type: 'string',
      },
      {
        name: 'errorDescription',
        title: 'Error Description',
        type: 'text',
      },
      {
        name: 'customerInfo',
        title: 'Customer Information',
        type: 'object',
        fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'street', title: 'Street', type: 'string' },
          { name: 'houseNumber', title: 'House Number', type: 'string' },
          { name: 'postalCode', title: 'Postal Code', type: 'string' },
          { name: 'city', title: 'City', type: 'string' },
          { name: 'contactPerson', title: 'Contact Person', type: 'string' },
          { name: 'phone', title: 'Phone', type: 'string' },
          { name: 'email', title: 'Email', type: 'string' },
          { name: 'emailRepeat', title: 'Repeat Email', type: 'string' }, // Add this field
        ],
      },
      {
        name: 'deliveryMethod',
        title: 'Delivery Method',
        type: 'string',
        options: {
          list: [
            { title: 'DHL Return Slip', value: 'dhl' },
            { title: 'Self-delivery at own cost', value: 'self' },
          ],
        },
      },
      {
        name: 'packaging',
        title: 'Packaging',
        type: 'string',
        options: {
          list: [
            { title: 'Own Packaging', value: 'own' },
            { title: 'Foreign Packaging', value: 'foreign' },
          ],
        },
      },
      {
        name: 'supportNumber', // New field for support number
        title: 'Support Number',
        type: 'string',
      },
      {
        name: 'status',
        type: 'string',
        title: 'Status',
        options: {
          list: [
            { title: 'zugestellt', value: 'zugestellt' },
            
           
  
            
          ],
        },
      },
    ],
  };
  