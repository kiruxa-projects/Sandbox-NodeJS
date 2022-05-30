export interface ParseChartFileModel {
  header: any;
  body: {
    count: number;
    params: string[];
    rows: any[];
  };
}
