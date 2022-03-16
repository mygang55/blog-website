import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  @Input() page;

  @Output() newPage = new EventEmitter();

  //move to previous page
  btnPrevious(){
    if(this.page > 1){
      this.newPage.emit(this.page-1);
    }
  }

  //move to next page
  btnNext(){
    this.newPage.emit(this.page+1);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
