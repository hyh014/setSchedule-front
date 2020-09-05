import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import axios from 'axios';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  search = {
    query: "",
    zip: "",
    radius: "10"
  }

  SearchResult = {
    google:[],
    ticketMaster: [],
    wikipedia: {
      title:"",
      extract:""
    }
  };

  constructor() { }

  process() {

    axios({
      method: 'post',
      url: environment.apiUrl + 'processQuery',
      data:{
        query:this.search.query,
        zip:this.search.zip,
        radius:this.search.radius
      }
    }).then(res => {
      var key = Object.keys(res.data.wiki)[0];
      console.log(res.data);

      this.SearchResult.google = res.data.items;

      this.SearchResult.wikipedia = res.data.wiki[key];
      this.SearchResult.ticketMaster = res.data.events;
    }).catch(err => {
      console.log(err);
    })
  }


  ngOnInit(): void {
  }

}








