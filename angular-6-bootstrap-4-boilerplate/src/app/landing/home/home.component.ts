import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    constructor(private http: HttpClient) {}
    public sabers:any;
    public padwanAge: number = 0;
    public toggleSignIn: boolean;
    public jediUser: any = {username: "", password: ""};
    public isJediMaster: boolean;
    public orders: any = {};
    public planet: any;
    ngOnInit() {
          this.http.get('./assets/saber/saber.json').subscribe((data: any)=>{
                console.log(data);
                this.sabers = data.sabers;
            })
            
    }

    submit(jediUser){
        if(jediUser.username == "jedimaster" && jediUser.password == "password"){
            this.isJediMaster = true;
            this.jediUser = {username: "", password: ""};
        }else{
            this.isJediMaster = false;
        }
    }

    order(saber: any){
        saber['available']--;
        saber['order']  = saber['order'] ? saber['order'] = saber['order'] + 1: 1;
    }

    knowmore(sab){
        this.http.get('https://swapi.co/api/planets/' + sab.crystal.planet).subscribe((data: any)=>{
           this.planet = data;
        })
    }
}
