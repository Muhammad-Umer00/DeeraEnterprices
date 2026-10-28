/**
 * Service catalogue for DEERA ENTERPRISES.
 * Each service group appears on the Services page with its own anchor
 * (e.g. /services#marine-waste-management) and enquiry button.
 *
 * Items marked `qualifier` are only offered "where provided / where
 * applicable" and are worded accordingly. Remove any item the company
 * does not offer; add only services verified by the company.
 */
export const serviceGroups = [
  {
    id: 'marine-waste-management',
    code: 'A',
    title: 'Marine Waste Management',
    short: 'Collection and handling of ship sludge and garbage, with removal coordinated through appropriate channels.',
    intro:
      'DEERA ENTERPRISES supports vessels in port with the collection and handling of ship-generated waste. Each job is planned around the vessel’s schedule, the port’s requirements and the type and quantity of waste on board.',
    items: [
      'Ship sludge collection and handling',
      'Ship garbage collection and handling',
      'Ship waste removal coordination',
      'Waste segregation and disposal coordination, where provided',
      'Relevant waste handling records and documentation, where applicable',
    ],
    image: 'serviceWaste',
    quoteValue: 'marine-waste-management',
  },
  {
    id: 'vessel-cleaning',
    code: 'B',
    title: 'Vessel Cleaning Services',
    short: 'De-mucking, de-slopping and ship tank cleaning, coordinated with the vessel’s operational schedule.',
    intro:
      'Cleaning work is planned with the vessel’s crew and agents and scoped by tank type, condition, access and the time available alongside. The scope, method and timing of each job are agreed in advance.',
    items: [
      'De-mucking services',
      'De-slopping services',
      'Ship tank cleaning',
      'Tank and vessel cleaning support',
      'Cleaning-related operational coordination',
    ],
    image: 'serviceCleaning',
    quoteValue: 'vessel-cleaning',
  },
  {
    id: 'maritime-vessel-support',
    code: 'C',
    title: 'Maritime & Vessel Support',
    short: 'Operational support and coordination of port-related marine services for vessels and their operators.',
    intro:
      'Alongside its core services, DEERA ENTERPRISES helps owners, managers and agents coordinate marine services and contractors for vessels calling at port.',
    items: [
      'Vessel operational support',
      'Port-related marine services',
      'Ship service coordination',
      'Marine contractor coordination',
    ],
    image: 'serviceSupport',
    quoteValue: 'maritime-vessel-support',
  },
  {
    id: 'marine-supplies-ship-chandling',
    code: 'D',
    title: 'Marine Supplies & Ship Chandling',
    short: 'Ship stores, spare parts and marine supplies through MARINE CARE SERVICES, a division of DEERA ENTERPRISES.',
    intro:
      'Marine supplies and ship chandling are handled by MARINE CARE SERVICES, the dedicated supply division of DEERA ENTERPRISES.',
    items: [
      'Deck stores',
      'Engine stores',
      'Marine spare parts',
      'Marine tools and equipment',
      'Ship maintenance materials',
      'Cleaning materials and consumables',
      'Safety equipment and PPE',
      'General ship supplies',
      'Other approved procurement requirements',
    ],
    image: 'serviceSupplies',
    quoteValue: 'marine-supplies',
    divisionPage: '/marine-supplies-ship-chandling',
  },
];

/** Options shown in the "Required service" field of the forms. */
export const serviceOptions = [
  { value: 'marine-waste-management', label: 'Marine Waste Management' },
  { value: 'vessel-cleaning', label: 'Vessel Cleaning Services' },
  { value: 'maritime-vessel-support', label: 'Maritime & Vessel Support' },
  { value: 'marine-supplies', label: 'Marine Supplies & Ship Chandling (Marine Care Services)' },
  { value: 'other', label: 'Other / General Enquiry' },
];
