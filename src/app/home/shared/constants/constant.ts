export namespace Constants {
  export const BASE = 'api/v1';
  export const END = '/';
  export const QUERY_SPECIFIER = '?';
  export const QUERY_DIVIDER = '&';
  export const PAGE_PARAM = 'page=';
  export const EQULITY = '=';

  export class Path {
      generatePath(path_component: string[]): string {
          let path  = Constants.BASE;
          path_component.forEach((arg) => {
              path = path + '/' + arg;
          });
          path = path;
          return path;
      }

      generateParamPath(path_component: string[], param_component: {name: string, value: number}[]) {
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
