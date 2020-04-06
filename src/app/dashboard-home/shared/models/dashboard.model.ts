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
      results: RoomDetailsDataType[];
  }

  export interface DashboardTableScheduledMeetingModel {
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

  export interface RoomDetailsDataType {
    id: number;
    value: string;
    selected?: boolean;
    status?: string;
    data: DashboardDataObjectType[];
  }

  export class RoomDetailsDataType {
    id = -1;
    value = '';
    data = [new DashboardDataObjectType()];
  }

  export interface DashboardDataObjectType {
      id: number;
      user_name: string;
      meeting_room: string;
      date: string;
      selected?: boolean;
      status: string;
      start_time: string;
      end_time: string;
      meeting_id: number;
      agenda: string;
  }

  export class DashboardDataObjectType {
    id = -1;
    user_name = '';
    meeting_room = '';
    date = '';
    status = '';
    start_time = '';
    end_time = '';
    meeting_id = -1;
    agenda = '';
  }

}
