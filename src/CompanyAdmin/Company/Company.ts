export interface Company {
  id: string;
  /** Company name */
  name: string;

  /** Owner id */
  ownerId: string;

  /** All subscriptions in this company (valid, expired and deleted) */
  //   subscriptions: Subscription[];

  /** What type of business is this company. Must cloned because of readonly */
  category: string;

  /** Description of company, it's prices */
  description: string;

  /** Company's main phone numbers */
  phoneNumbers: string[];

  /** Company's main emails */
  emails: string[];

  /** How many credit company have for buying stuff */
  credit: number;

  /** On which pricing plan is company */
  //   plans: PricingPlan[];

  /** All company locations */
  locations: Location[];

  /** All roles this company have. */
  //   roles: Role[];

  /**TODO Implement this */
  //   tier: Tier;

  /** Path to images of company. Currently 5 images max */
  images: any[];

  // All payments for this company
  //   payments: PaymentRecord;
}
