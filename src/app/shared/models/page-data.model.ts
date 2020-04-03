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
