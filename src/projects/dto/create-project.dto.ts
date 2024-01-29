export class CreateProjectDto {
  id: number;
  name: string;
  expense: number;
  spent: number;
  teamSize: number;
  startDate: Date;
  endDate: Date;
  totalTask: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
