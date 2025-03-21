import { IEmployer } from "./Employer.interface";

  interface IJob {
    id: number;
    employer: IEmployer;
    title: string;
    description: string;
    created_at: string;
    assigned_to: number | null;
  }
  

  export type { IJob }