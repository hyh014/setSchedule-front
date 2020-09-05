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
    // //google
    // axios({
    //   method: 'get',
    //   url: 'https://www.googleapis.com/customsearch/v1?key=AIzaSyB2Yz5IdLNSmZ8bCCjl-A282wmoAwXxLg4&cx=daec484231fc3acee&q=lecture',
    // }).then((res) => {
    //   console.log(res);
    // }).catch((err) => {
    //   console.log(err);
    // })
    // //ticket master
    // axios({
    //   method:'get',

    //   url:'https://app.ticketmaster.com/discovery/v2/events.json?apikey=f5X2atDzgbX2BdWhrPA9ZM5Q8yTYXLLk'
    // }).then((res)=>{
    //   console.log(res);
    // }).catch((err)=>{
    //   console.log(err);
    // })
    //wikipedia
    // axios({
    //   method:'get',
    //   // headers: {
    //   //   'Access-Control-Allow-Origin' : '*',
    //   //   'Content-Type': 'application/json'
    //   // },
    //   url:'http://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=pizza&limit=1&namespace=0'
    // }).then((res)=>{
    //   console.log(res);
    // }).catch((err)=>{
    //   console.log(err);
    // })
    // axios({
    //   method:'get',
    //   // headers: {
    //   //   'Access-Control-Allow-Origin' : '*',
    //   //   'Content-Type': 'application/json'
    //   // },
    //   url:'https://en.wikipedia.org/w/api.php?origin=*&action=parse&format=json&page=house&prop=wikitext&section=0&disabletoc=1'
    // }).then((res)=>{
    //   console.log(res);
    // }).catch((err)=>{
    //   console.log(err);
    // })
  }

}








