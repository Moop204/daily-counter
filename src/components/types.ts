interface ITask {
  description: string;
  initialValue: any;
}

interface ICheckTask extends ITask {
  initialValue: boolean;
}

interface IMultiTask extends ITask {
  index?: number;
  initialValue: number;
  totalValue: number;
  updateCounter?: (index:number, value: number) => void;
}

type ValidTask = ICheckTask | IMultiTask;

export type { IMultiTask, ICheckTask, ValidTask };
