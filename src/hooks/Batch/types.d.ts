interface Batch {
  id: number;
  enclosureId: number;
  name: string;
  wheightAverage: number;
  animalQuantity: number;
  earringStartNumber: number;
  breed: string;
  age: number;
  bornDate: string;
  observation: string;
  situation: string;
}

interface BatchFormValues {
  name: string;
  wheightAverage: number;
  animalQuantity: number;
  breed: string;
  age: number;
  bornDate: string;
  observation: string;
  situation: string;
  earringStartNumber: number;
  enclosureId: number;
}
