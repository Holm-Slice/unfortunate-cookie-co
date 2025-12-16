export interface Fortune {
  id: number;
  text: string;
  category: string;
  type: "fortunate" | "unfortunate";
  createdAt: Date;
}
