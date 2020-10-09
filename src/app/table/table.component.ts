import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { FakeSericeService } from '../fake-serice.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  resultData: any;
  searchdata: any;
  gridOptions: any;
  rowData: any;
  newRowdata: any;

  constructor(private service: FakeSericeService) {}

  ngOnInit(): void {
    this.getAllData();
  }
  defaultColDef = {
    sortable: true,
    filter: true,
    paginationPageSize: 10,
  };

  columnDefs: any[];

  autoGroupColumnDef = {
    headerName: 'Model',
    field: 'model',
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true,
    },
  };

  public getAllData(): void {
    this.service.getData().subscribe(
      (Response: any) => {
        this.resultData = Response;
        this.setRowData(this.resultData);
        this.searchdata = Response;
        console.log(this.resultData);
        this.columnDefs = this.generateColumns(this.resultData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public generateColumns(data: any[]) {
    let columnDefinitions = [];
    data.map((object) => {
      Object.keys(object).map((key) => {
        let mappedColumn = {
          headerName: key.toUpperCase(),
          field: key,
        };
        columnDefinitions.push(mappedColumn);
      });
    });
    columnDefinitions = columnDefinitions.filter(
      (column, index, self) =>
        index ===
        self.findIndex((colAtIndex) => colAtIndex.field === column.field)
    );
    return columnDefinitions;
  }

  public filterBasedPrice(e: any): void {
    this.resultData = this.searchdata;
    let array = e.split('-');
    let filtereddata = this.resultData.filter(
      (d: any) => d.price <= array[1] && d.price >= array[0]
    );
    console.log(filtereddata);
    this.resultData = filtereddata;
  }

  public searchData(value: any): void {
    if (!value) {
      return (this.resultData = this.searchdata);
    } else {
      let search = this.resultData.filter((item: any) =>
        item.car.toLowerCase().startsWith(value.toLowerCase())
      );
      console.log(search);
      this.resultData = search;
    }
  }

  public onGridReady(event): void {
    this.gridOptions = event;
  }
  public downloadToCSV(): void {
    let params = {
      skipHeader: false,
      skipFooters: true,
      skipGroups: true,
      fileName: 'carModel.csv',
    };
    this.gridOptions.api.exportDataAsCsv(params);
  }

  public setRowData(data): void {
    this.columnDefs = this.generateColumns(data);
    this.rowData = data;
    this.resultData = this.rowData;
  }

  public updateExcelSheet(fileInput: any): void {
    let fileReaded = fileInput.target.files[0];
    let reader: FileReader = new FileReader();
    reader.readAsText(fileReaded);
    reader.onload = (e) => {
      let csv: any = reader.result;
      let lines = csv.split('\n');
      let result = [];
      let headers = lines[0].split(',');
      for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = lines[i].split(',');
        for (let j = 0; j < headers.length; j++) {
          let headerString = headers[j];
          let dataString = currentline[j];
          obj[headerString] = dataString;
        }
        result.push(obj);
      }
      console.log(result);
      this.setRowData(result);
    };
  }
}
