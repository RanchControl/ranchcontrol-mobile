interface Animal {
  id: number;
  userId: number;
  name: string;
  cnpj: string;
  address: string;
  createdAt: Date;
  updateAt: Date;
  deletedAt: Date;
}

interface AnimalFormValues {
  name: string;
  number: string;
  sex: string;
  breed: string;
  bornDate: string;
  bornWheight: string;
  entryDate: string;
  entryWheight: string;
  weaningDate: string;
  fitnessDate: string;
  type: string;
  weight: string;
  status: string;
  category: string;
  prefix: string;
  suffix: string;
  batch: string;
}
