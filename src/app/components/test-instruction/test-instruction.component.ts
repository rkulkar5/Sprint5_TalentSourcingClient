import { Router, ActivatedRoute , NavigationExtras } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { appConfig } from './../../model/appConfig';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-test-instruction',
  templateUrl: './test-instruction.component.html',
  styleUrls: ['./test-instruction.component.css']
})
export class TestInstructionComponent implements OnInit {
  numOfQuestions;
  numOfMins;
  loading = false;
  submitted = false;
  status;
  example;
  username;
  quizNumber;
 constructor(
      public fb: FormBuilder,
      private router: Router,
      private apiService: ApiService,
      private ngZone: NgZone,

    ) {
      this.numOfQuestions = appConfig.noOfQuestions;
      this.numOfMins = appConfig.testDuration/60;
      this.username = this.router.getCurrentNavigation().extras.state.username;
      this.quizNumber = this.router.getCurrentNavigation().extras.state.quizNumber;
    }

  
  
  
    ngOnInit(): void {
    }
    onSubmit() {
      this.submitted = true;
      console.log("Form Submitted!");
      // stop here if form is invalid
      this.loading = true;      
      this.status = "Inactive";  
	    // Update status column in Users table                     
      this.apiService.updateUsersStatus(this.username,this.status,this.username).subscribe(
      (res) => {
              console.log(this.username+'Status column updated successfully in Users table');                 
               }, (error) => {                
              console.log("Error found while updating status column of Users table - " + error);
               });
              this.ngZone.run(() => this.router.navigateByUrl('/take-quiz',{state:{username:this.username,quizNumber:this.quizNumber}}));
               }}
