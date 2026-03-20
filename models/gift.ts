export type Gift = {
  id: string;
  name: string;
  description: string;
  image: string;
  totalValue: number;
  quotaValue: number;
  totalQuotas: number;
  paidQuotas: number;
  forceEsgotado?: boolean;
};