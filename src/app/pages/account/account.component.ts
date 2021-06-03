import { Component, OnInit } from '@angular/core';
import {IsAuthService} from '../../services/is-auth.service';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import {TokenService} from '../../services/token.service';
import {AuthService} from '../../services/auth.service';
import {BillingService} from '../../services/billing.service';
import { MatTableDataSource } from '@angular/material/table';
import {AccountService} from '../../services/account.service';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    emptyPass = '';
    businessName: any = '';
    menuTitle = 'Account';
    isAuthenticated: any;
    sitesStyles: any;
    userInfoForm!: FormGroup;
    progress = false;
    addresses: any[] = [];
    questions: any[] = [];
    accountInfo$: any;
    accountData$: any;
    bodyFont: any;
    success = '';
    rowBodyMargin: any = {};
    facebook = {name: 'no facebook connected.', email: 'plase connect facebook account.'};
    sectionSelected = 'highlight';
  constructor(
    private isAuth: IsAuthService,
    private router: Router,
    private token: TokenService,
    private auth: AuthService,
    private billingServ: BillingService,
    private accServ: AccountService,
    public dialog: MatDialog

  ) {
    this.isAuth.authStatus.subscribe((value) => {
      this.isAuthenticated = value;
      if (!value) {
        this.openDialog();
        return;
      }
      this.loadData();
    });
  }

  openDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '30%',
      data: {menuData: {site: 'Affiliates'}}
    });
  }

  loadData(): void {
    this.accServ.accountData().subscribe(data => {
      this.businessName = data.name;
      this.sitesStyles = data.style;


      document.body.style.backgroundColor = this.sitesStyles.sites_style.bodyBackground;
      if (!this.sitesStyles.sites_style.padding) {
        this.rowBodyMargin = {margin: '0px !important', border: 'none !important', 'border-radius': '0px !important'};
      }
      const adresses = data.accountSettings.address;
      this.accountInfo$ = data.accountSettings;
      this.accountData$ = data.user;      
      for (let i = 0; i <= adresses; i++) {
        const c = i + 1;
        let setAddress = '';
        if (c === 1) {
          setAddress = data.user.address;
        } else {
          setAddress = data.user.address2;
        }
        this.addresses.push({lbl: `Address ${c}`, formControl: 'Address' + c });
        this.userInfoForm.addControl('Address' + c , new FormControl(setAddress, [Validators.required]));
      }
      
      
      data.accountSettings.custom_questions.forEach(element => {        

        this.questions.push({lbl: `${element.question}`,id: element.id , formControl: 'question' + element.id });
        let answerJson = data.questions.filter(item => item.question_number === +element.id)[0];          
        this.userInfoForm.addControl('question' + element.id , new FormControl(answerJson.answer));

      });
    
      this.userInfoForm.addControl('awtoken', new FormControl (data.businessIntegration.public_values.token));
      this.userInfoForm.addControl('bs', new FormControl (data.businessIntegration.bs));
      this.userInfoForm.addControl('list', new FormControl (data.businessIntegration.siteIntegration.crm.values.listid));
      this.userInfoForm.addControl('email', new FormControl (data.user.email));
      this.userInfoForm.addControl('refrshawtoken', new FormControl(data.businessIntegration.public_values.refreshToken));
      
      this.setAccountValues();
    });
  }
  setAccountValues(): void {
    this.userInfoForm.patchValue({
      firstName: this.accountData$.first_name,
      lastName: this.accountData$.last_name,
      phone: this.accountData$.phone,
      birthday: this.accountData$.dob,
      conuntry: this.accountData$.country,
      city: this.accountData$.city,
      zip: this.accountData$.zipcode,
      email: this.accountData$.email
    });


  }

  rowStyle(rowBody, padding): any {
    if (rowBody ===  null) { return; }
    return Object.assign(rowBody, padding);
   }

  ngOnInit(): void {

    this.userInfoForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl(''),
      birthday: new FormControl('', [Validators.required]),
      suiteAptNumber: new FormControl('', [Validators.required]),
      conuntry: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      suite_aptnumber: new FormControl(''),
      confirmPass: new FormControl(''),
      password: new FormControl(''),

    });

  }

  onSubmitUserInfo(): void {
    this.progress = true;
    this.userInfoForm.disable();

    this.accServ.siteSaveUserInfo(this.userInfoForm.value).subscribe(data => {
      
      if (data.subscriber) {
        this.progress = false;
        this.userInfoForm.enable();
        // pasar a una funcion para no repetir este codigo
        alert('Info. Updated');
      }
    }, error => {
      console.error(error);
    });

    const answeredQuestions: any = [];

    this.questions.forEach(q => {      
      if (this.userInfoForm.value[q.formControl] !== '') {
        answeredQuestions.push({id: q.id, answer: this.userInfoForm.value[q.formControl]});
      }             
    });

    if (answeredQuestions.length > 0) {
      this.accServ.saveAnswers(answeredQuestions).subscribe(answer => {
        console.log(answer);
      });
    }


  }
  updatePassword(): void {
    this.emptyPass = '';
    if (this.userInfoForm.value.password === '' && this.userInfoForm.value.confirmPass === '') {

      this.emptyPass = 'Password and Confirm Password are required.';
      return;

    }

  
    if (this.userInfoForm.value.password === this.userInfoForm.value.confirmPass) {

    this.accServ.updatePassword({pwd: this.userInfoForm.value.password}).subscribe(data => {
      if (data.error) {
        if (data.error === 'samepwd') {
          this.emptyPass = 'you enterd old password';
          return;
        }
        alert(data.error);
        return;
      }
      this.success = 'Password succesfuly updated.';
    });
    } else {
      this.emptyPass = 'Password and Confirm Password does not match.';
    }


  }
}
