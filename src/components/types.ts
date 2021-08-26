interface ITask {
  description: string;
  initialValue: any;
}

interface ICheckTask extends ITask {
  initialValue: boolean;
}

interface IMultiTask extends ITask {
  initialValue: number;
  totalValue: number;
}

type ValidTask = ICheckTask | IMultiTask;

export type { IMultiTask, ICheckTask, ValidTask };
