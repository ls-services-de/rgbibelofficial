export default {
    name: 'overlays',
    title: 'Overlays',
    type: 'document',
    fields: [
        {
            name: 'maintenance',
            title: 'Wartungsarbeiten',
            type: 'boolean',
            description: 'Aktiviere, wenn Wartungsarbeiten angezeigt werden sollen.',
        },
        {
            name: 'maintenanceStartDate',
            title: 'Wartungsarbeiten Startdatum',
            type: 'datetime',
            description: 'Startdatum der Wartungsarbeiten.',
            hidden: ({ parent }) => !parent?.maintenance, // Nur sichtbar, wenn Wartungsarbeiten aktiviert sind
        },
        {
            name: 'maintenanceEndDate',
            title: 'Wartungsarbeiten Enddatum',
            type: 'datetime',
            description: 'Enddatum der Wartungsarbeiten.',
            hidden: ({ parent }) => !parent?.maintenance,
        },
        {
            name: 'launchScreen',
            title: 'Launch Screen',
            type: 'boolean',
            description: 'Aktiviere, wenn der Launch Screen angezeigt werden soll.',
        },
        {
            name: 'launchStartDate',
            title: 'Launch Startdatum',
            type: 'datetime',
            description: 'Startdatum des Launch Screens.',
            hidden: ({ parent }) => !parent?.launchScreen,
        },
        {
            name: 'launchEndDate',
            title: 'Launch Enddatum',
            type: 'datetime',
            description: 'Enddatum des Launch Screens.',
            hidden: ({ parent }) => !parent?.launchScreen,
        },
        {
            name: 'normal',
            title: 'Normal',
            type: 'boolean',
            description: 'Aktiviere, wenn das normale Overlay angezeigt werden soll.',
        },
        {
            name: 'normalStartDate',
            title: 'Normal Startdatum',
            type: 'datetime',
            description: 'Startdatum des normalen Overlays.',
            hidden: ({ parent }) => !parent?.normal,
        },
        {
            name: 'normalEndDate',
            title: 'Normal Enddatum',
            type: 'datetime',
            description: 'Enddatum des normalen Overlays.',
            hidden: ({ parent }) => !parent?.normal,
        },
    ],
    validation: (Rule) =>
        Rule.custom((fields) => {
            const activeCount = [fields.maintenance, fields.launchScreen, fields.normal].filter(Boolean).length;
            if (activeCount > 1) {
                return 'Es darf nur ein Overlay aktiv sein!';
            }
            return true;
        }),
};
