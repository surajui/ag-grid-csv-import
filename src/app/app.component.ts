import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ag';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.getData();
  }

  // getData() {
  //   this.http
  //     .get(
  //       'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/smallRowData.json'
  //     )
  //     .subscribe((res) => {
  //       this.rowData = res;
  //       console.log(this.rowData, 'res');
  //     });
  // }

  // getSelectedRows() {
  //   const selectedNodes = this.agGrid.api.getSelectedNodes();
  //   const selectedData = selectedNodes.map((node) => {
  //     if (node.groupData) {
  //       return { make: node.key, model: 'Group' };
  //     }
  //     return node.data;
  //   });
  //   const selectedDataStringPresentation = selectedData
  //     .map((node) => node.make + ' ' + node.model)
  //     .join(', ');

  //   alert(`Selected nodes: ${selectedDataStringPresentation}`);
  // }
}
