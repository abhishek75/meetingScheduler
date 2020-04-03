import {Deserializable} from './deserializable.model';

// Create a type for bbox items
export interface BBoxItem {
  text: string;
  bbox: number[];
  word_id: number;
}

// Create a type for PageData (used for getting text from pdfs)
export class PageData implements Deserializable {
    page_bbox: number[];
    words: BBoxItem[];

    deserialize(input: any): this {
      Object.assign(this, input);
      return this;
    }
}


export class Datapoint implements Deserializable{
  page_no: number;
  bbox: number[];
  file_name?: string;
  page_bbox: number[];
  value?: any;
  type?: string;
  value_id?: number;
  is_new?: boolean;
  accepted?: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
