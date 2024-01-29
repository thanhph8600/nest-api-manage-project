export class CreateTaskDto {
  id: number;
  id_project: number;
  id_account: number;
  name: string;
  startDate: Date;
  endDate: Date;
  finishDate: Date;
  status: string;
}
