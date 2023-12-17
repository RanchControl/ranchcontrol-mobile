interface Animal {
  id: number;
  name: string;
  number: number;
  sex: string;
  breed: string;
  bornDate: string;
  bornWheight: number;
  entryDate: string;
  entryWheight: number;
  weaningDate: string;
  fitnessDate: string;
  type: string;
  weight: number;
  status: string;
  category: string;
  prefix: string;
  suffix: string;
  enclosure: number;
  batch: number;
  createdAt: string;
  updateAt: string;
  deletedAt: null;
  enclosures: Enclosure;
  batchs: Batch;
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
