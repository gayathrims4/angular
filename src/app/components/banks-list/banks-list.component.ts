import { Bank } from '../../shared/bank';
import { ApiService } from '../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-banks-list',
  templateUrl: './banks-list.component.html',
  styleUrls: ['./banks-list.component.css']
})

export class banksListComponent implements OnInit {
  BankData: any = [];
  dataSource: MatTableDataSource<Bank>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['bank_name', 'ifsc', 'branch', 'city', 'state', 'district'];
  pageLimit: number[] = [5, 10];
  constructor(public bankApi: ApiService) {
    this.bankApi.GetBanks().subscribe(data => {
      this.BankData = data;
      this.dataSource = new MatTableDataSource<Bank>(this.BankData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
  }
  favorite = "favorite";
  favorite_border = "favorite_border";
  doLike(ele) {
    let inobj = { ifsc: ele.ifsc, isLiked: ele.isLiked ? false : true }
    this.bankApi.doLike(inobj).subscribe(result => {
      this.BankData = result;
      this.dataSource = new MatTableDataSource<Bank>(this.BankData);
       setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
  }
  searchFfilter(val) {
    if (val != "") {
      this.dataSource = val ? this.BankData.filter(productlistArray => { return productlistArray.city.toUpperCase() ==
       val.toUpperCase() || productlistArray.address.toUpperCase() == val.toUpperCase() || 
       productlistArray.bank_id == Number(val) || productlistArray.bank_name.toUpperCase() == val.toUpperCase() 
       || productlistArray.branch.toUpperCase() == val.toUpperCase() || productlistArray.district.toUpperCase()
        == val.toUpperCase() || productlistArray.ifsc.toUpperCase() == val.toUpperCase() || 
        productlistArray.state.toUpperCase() == val.toUpperCase()}) : this.BankData;
    }
    else {
      this.dataSource = this.BankData;
    }
  }
  selectfilter(e) {
    if (e.target.value != "all") {
      this.dataSource = e.target.value ? this.BankData.filter(productlistArray => {
        return productlistArray.city.toUpperCase() == e.target.value.toUpperCase();
      }) : this.dataSource;
    }
    else {
      this.dataSource = this.BankData;
    }
  }
  ngOnInit() { }
}