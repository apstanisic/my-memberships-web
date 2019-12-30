export interface Settings {
  companyId?: string;
  version?: number;
  config?: {
    subscription: {
      types: {
        [key: string]: {
          name: string;
          price: number;
          duration: number;
          durationUnit: string;
          allowedUses?: number;
        };
      };
    };
  };
}
