interface Batch {
  id: number;
  enclosureId: number;
  name: string;
  weightAverage: number;
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
  weightAverage: string;
  animalQuantity: string;
  breed: string;
  age: string;
  bornDate: string;
  observation: string;
  situation: string;
  earringStartNumber: string;
  enclosure: string;
}
