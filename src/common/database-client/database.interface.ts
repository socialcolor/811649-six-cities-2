export interface DataBaseInterFace {
  connect(uri: string): Promise<void>;
  disconnect(): Promise<void>;
}
