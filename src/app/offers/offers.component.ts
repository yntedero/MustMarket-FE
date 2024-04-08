import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
export class YourComponent implements OnInit {
  offers: any[] = []; 

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getOffers();
  }

  getOffers() {
    this.http.get<any[]>('/api/offers').subscribe(
      (response) => {
        this.offers = response;
      },
      (error) => {
        console.error('Error fetching offers:', error);
      }
    );
  }
}
