import { interpolateDate } from "d3";

export namespace DashboardModel {

  export interface ResultEvent {
      type: string;
      data: any;
  }

  export interface DashboardTableResponseType {
      count: number;
      has_next?: boolean;
      has_previous?: boolean;
      next: string;
      num_pages?: number;
      previous?: string;
      document_per_page?: number;
      results: DashboardDataObjectType[];
  }

  export interface SetUploadTableObjectResponse {
    message: string;
    data: DashboardDataObjectType[];
    status: boolean;
  }

  export interface DashboardDataObjectType {
      end_time: string;
      start_time: string;
      id: number;
      status: string;
      job_type: string;
      job_name: string;
      job_id: number;
  }

  export class DashboardDataObjectModel {
    end_time: null;
    start_time: null;
    id: null;
    status: null;
    job_type: null;
    job_name: null;
    job_id: null;
  }

}
