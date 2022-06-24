export interface Log {
  id: number;
  userId: number;
  kioskId: number;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  description: string;
}
