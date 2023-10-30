declare global {
  interface Paginated<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<T>;
  }

  interface Query {
    page: number;
    search?: string;
  }

  interface IStep {
    title: string;
    ref: React.RefObject<IFormStepRef>;
    component: React.ForwardRefExoticComponent<any>;
    props?: any;
  }

  interface IFormStepRef {
    submit: (event?: React.FormEvent<HTMLFormElement> | undefined) => void;
  }

  type ModifyType<T, R> = Omit<T, keyof R> & R;
}

export {};
