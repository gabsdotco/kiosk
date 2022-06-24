export interface Kiosk {
  id: number;
  serialKey: string;
  description: string;
  isKioskClosed: boolean;
  storeOpensAt: string;
  storeClosesAt: string;
}
