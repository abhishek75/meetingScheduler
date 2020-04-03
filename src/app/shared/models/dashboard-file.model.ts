import {Deserializable} from '@app/shared/models';

export class DashboardFile implements Deserializable {
  set_id: number;
  doc_ids: number[];
  name: string;
  status: string;
  uploader: string;
  preview_url: string;
  date_uploaded: string;
  document_type?: string;
  nlq_status?: string;
  nlq_id?: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

