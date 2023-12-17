interface Farm {
  id: number;
  userId: number;
  name: string;
  cnpj: string;
  address: string;
  createdAt: Date;
  updateAt: Date;
  deletedAt: Date;
}

interface FarmFormValues {
  name: string;
  cnpj: string;
  address: string;
}
