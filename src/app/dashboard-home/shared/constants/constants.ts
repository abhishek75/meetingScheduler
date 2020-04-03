export namespace Constants {
    export const BASE = '/api/v1';
    export const END = '/';
    export const QUERY_SPECIFIER = '?';
    export const QUERY_DIVIDER = '&';
    export const BATCH = 'batch';
    export const DRIVE = 'drive';
    export const FOLDERS = 'folders';
    export const UPLOAD = 'upload';
    export const DOCUMENT = 'document';
    export const DELETE = 'delete';
    export const BULK = 'bulk';
    export const FEEDBACK = 'feedback';
    export const UPDATE = 'update';
    export const UPLOADED_BATCH_FOLDERS = 'uploaded-batch-folders';
    export const UPLOADED_BATCH_FOLDERS_LISTING = 'uploaded-batch-folders-listing';
    export const POOL = 'pool';
    export const FILE_LISTING = 'file-listing';
    export const FILE_DELETE = 'file-delete';
    export const REGULAR =  'REGULAR';
    export const BATCH_Id = 'batch_id';
    export const TRANCHE = 'tranche';
    export const HIGH = 'High';
    export const MEDIUM = 'Medium';
    export const LOW = 'Low';
    export const ANNOTATE = 'annotate';
    export const INACTIVE = 'INACTIVE';
    export const SUCCESS = 'SUCCESS';
    export const SFG = 'sfg';
    export const DATAPOINTS = 'datapoints';
    export const JSON = 'json';
    export const EXCEL = 'excel';
    export const DOWNLOAD = 'download';
    export const EXCEL_OUTPUT_FILE_NAME = 'moodys_sfg_bulk_report';
    export const EXCEL_EXTENTION_TYPE = '.xlsx';
    export const EXCEL_SERVER_RESPONSE_TYPE = 'application/vnd.ms-excel';
    export const PAGE_PARAM = 'page=';
    export const EQULITY = '=';
    export const FETCHING = 'fetching';
    export const NOT_FOUND = 'Not found';
    export const FOUND = 'found';
    export const ITEMS_PER_PAGE = 'items_per_page';
    export const PAGE = 'page';
    export const SELECTED = 'selected';
    export const CORE = 'core';
    export const DRIVE_LIST = 'drive-list';
    export const FILE_UPLOAD = 'file-upload';
    export const LIST = 'list';
    export const BATCH_UPLOAD = 'batch-upload';
    export const BATCH_LIST = 'batch-list';
    export const BATCH_DELETE = 'batch-delete';
    export const USER = 'user';
    export const LOGIN = 'login';
    export class Path {
        generatePath(path_component: string[]): string {
            let path  = Constants.BASE;
            path_component.forEach((arg) => {
                path = path + '/' + arg;
            });
            path = path;
            return path;
        }

        generateParamPath(path_component: string[], param_component: {name: string, value: any}[]) {
            let path  = Constants.BASE;
            path_component.forEach((arg) => {
                path = path + '/' + arg;
            });
            path = path + Constants.QUERY_SPECIFIER;
            param_component.forEach((param, index) => {
                if (index + 1 === param_component.length) {
                    path = path + param.name + Constants.EQULITY + param.value;
                } else {
                    path = path + param.name + Constants.EQULITY + param.value + Constants.QUERY_DIVIDER;
                }
            });
            return path;
        }
}
}
