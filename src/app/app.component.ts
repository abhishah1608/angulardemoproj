import { Component , OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import {LoginModel} from '../app/login-model';
import { LoginService } from './login.service';
import { UserDetail } from './user-detail';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  login:FormGroup;

  UserSignUp : FormGroup;

  loginmodel : LoginModel;

  IsSubmitted : boolean;

  IsSignUpSubmitted : boolean;

  IsIncorrectUsernamePassword : boolean = false;

  messageerrors : string = '';

  validationMessage = {
    'loginUserName' : {
      'required':'username must be required',
      'minlength':'username must have minimum 6 character length',
      'maxlength':'username must not be more than 20 characters long'
    },
    'loginPass':{
      'required':'Password must be required',
      'minlength':'Password must have minimum 6 character length',
      'maxlength':'Password must not be more than 20 characters long'
    }
  };

  formloginErrors ={
    'loginUserName' : '',
    'loginPass':''
  };

  formSignUpErrors = {
    'SignUpUsername':'',
    'SignUpPass':'',
    'SignUpEmail':'',
    'SignUpConfirmpass':''
  };

  validationSignupMessage = {
    'SignUpUsername' : {
      'required':'username must be required',
      'minlength':'username must have minimum 6 character length',
      'maxlength':'username must not be more than 20 characters long'
    },
    'SignUpPass':{
      'required':'Password must be required',
      'minlength':'Password must have minimum 6 character length',
      'maxlength':'Password must not be more than 20 characters long'
    },
    'SignUpEmail':{
      'required':'Email must be required',
      'minlength':'Email must have minimum 6 character length',
      'maxlength':'Email must not be more than 100 characters long'
    },
    'SignUpConfirmpass' :{
      'required': 'Confirm Password must be required',
    }
  };

  constructor(private fb:FormBuilder,private loginservice : LoginService)
  {

  }
  
  ngOnInit(): void {
    

    this.UserSignUp = this.fb.group({
      SignUpUsername : ['',[Validators.required,Validators.maxLength(20),Validators.minLength(6)]],
      SignUpEmail : ['',[Validators.required,Validators.minLength(8),Validators.maxLength(100)]],
      SignUpPass :['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
      SignUpConfirmpass :['',Validators.required]
    });

    this.login = this.fb.group({
      loginUserName :['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
      loginPass:['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]]
    });
    
    this.login.valueChanges.subscribe((data)=>{
       this.logloginErrors();
    });

  }
  
  //on submit login
  Onlogin():void{
      this.IsSubmitted = true;
      if(this.login.valid)
      {
        this.loginmodel = new LoginModel();
        this.loginmodel.username = this.login.get("loginUserName").value;
        this.loginmodel.password = this.login.get("loginPass").value;
        this.loginmodel.loginId = 0;
        var x= this.loginservice.IsuserAllowTologgedIn(this.loginmodel);
      }
      else
      {
        this.logloginErrors();
      }
  }

  logloginErrors():void
  {
    Object.keys(this.login.controls).forEach((key:string)=>{
       const abstractcontrol = this.login.get(key);
       this.formloginErrors[key] = '';
       if(abstractcontrol && !abstractcontrol.valid)
       {
          const message = this.validationMessage[key];
          if(abstractcontrol.dirty || abstractcontrol.touched || this.IsSubmitted)
          {
          for(const errorkey in abstractcontrol.errors)
          {
             this.formloginErrors[key] += message[errorkey] + ' ';
          }
        }
       } 
    });
  }

  OnSignUp(): boolean
  {
    this.IsSignUpSubmitted = true;
    let bRetval : boolean= false;
     if(this.UserSignUp.valid)
     {
       if(this.UserSignUp.get("SignUpPass").value != this.UserSignUp.get("SignUpConfirmpass").value)
       {
            this.messageerrors = "passowrd and confirm password must be same";
       }
       else
       {
          let detail : UserDetail = new UserDetail();
          detail.username = this.UserSignUp.get("SignUpUsername").value;
          detail.password = this.UserSignUp.get("SignUpPass").value;
          detail.email = this.UserSignUp.get("SignUpEmail").value;
          detail.Signup = 1;
          bRetval = this.loginservice.AddUser(detail);
       }
     }
     else
     {
        this.showError();
     }
     return bRetval;
  }

  showErrorforspecificcontrol(key:string)
  {
     this.Isvalidcontrol(key);
  }

  showError() : void
  {
      let haserror:boolean = false;
      Object.keys(this.UserSignUp.controls).forEach((key:string)=>{  
      if(haserror == false)
      {
        haserror = this.Isvalidcontrol(key);
      }    
   });       
  }

  Isvalidcontrol(key:string): boolean{
    let haserror = false;
    let control = this.UserSignUp.get(key);
      this.formSignUpErrors[key] = '';
      this.messageerrors = '';
      if(control && !control.valid)
      {
         const message = this.validationSignupMessage[key];
         if(control.dirty || control.touched || this.IsSignUpSubmitted)
         {
            for(let errorkey in control.errors)
            {
              this.formSignUpErrors[key] = message[errorkey];
              this.messageerrors = message[errorkey];       
              haserror = true;
              break;
            }
       }
      }
      return haserror;
  }

}

