import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SafetyService } from '@app/_services/safety.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-safety',
  templateUrl: './safety.component.html',
  styleUrls: ['./safety.component.scss']
})
export class SafetyComponent implements OnInit {

  private subscribes: any[] = [];
  public ReportTypes: any[] = [];
  public GetClass: any[] = [];
  public ReportedBy: any[] = [];
  public AreaLines: any[] = [];
  public Machines: any[] = [];
  public UnsafeDoneBy: any[] = [];
  modalRef: BsModalRef;

  @ViewChild("ErrorAlertBox") ErrorAlertBox: any;
  @ViewChild("SuccessAlertBox") SuccessAlertBox: any;

  public IsSafetyFormOpen: boolean = false;

  public safetyForm: FormGroup = new FormGroup(
    {
      ReportType: new FormControl("", [Validators.required]),
      ClassId: new FormControl("", [Validators.required]),
      ReportedBy: new FormControl("", [Validators.required]),
      AreaLine: new FormControl("", [Validators.required]),
      Machine: new FormControl("", [Validators.required]),
      UnsafeDoneBy: new FormControl("", [Validators.required]),
      Description: new FormControl("", [Validators.required])

    });

  constructor(private safetyService: SafetyService,private modalService: BsModalService) { }

  ngOnInit(): void {

    this.subscribes.push(
      this.safetyService.GetReportType().subscribe(response => {
        if (response.type == HttpEventType.DownloadProgress) {
        } else if (response.type === HttpEventType.Response) {
          if (typeof response.body !== 'undefined' && response.body !== null) {
            this.ReportTypes = response.body;
          }
        }
      }),
      this.safetyService.GetClass().subscribe(response => {
        if (response.type == HttpEventType.DownloadProgress) {
        } else if (response.type === HttpEventType.Response) {
          if (typeof response.body !== 'undefined' && response.body !== null) {
            this.GetClass = response.body;
          }
        }
      }),
      this.safetyService.GetReportedBy().subscribe(response => {
        if (response.type == HttpEventType.DownloadProgress) {
        } else if (response.type === HttpEventType.Response) {
          if (typeof response.body !== 'undefined' && response.body !== null) {
            this.ReportedBy = response.body;
            console.log(this.ReportedBy)

          }
        }
      }),
      this.safetyService.GetAreaLine().subscribe(response => {
        if (response.type == HttpEventType.DownloadProgress) {
        } else if (response.type === HttpEventType.Response) {
          if (typeof response.body !== 'undefined' && response.body !== null) {
            this.AreaLines = response.body;
            console.log(this.AreaLines)

          }
        }
      }),
      this.safetyService.GetMachine().subscribe(response => {
        if (response.type == HttpEventType.DownloadProgress) {
        } else if (response.type === HttpEventType.Response) {
          if (typeof response.body !== 'undefined' && response.body !== null) {
            this.Machines = response.body;
            console.log(this.Machines)

          }
        }
      }),
      this.safetyService.GetUnsafeDoneBy().subscribe(response => {
        if (response.type == HttpEventType.DownloadProgress) {
        } else if (response.type === HttpEventType.Response) {
          if (typeof response.body !== 'undefined' && response.body !== null) {
            this.UnsafeDoneBy = response.body;
            console.log(this.UnsafeDoneBy)

          }
        }
      })
    )

  }

  openForm() {
    this.IsSafetyFormOpen = true;
  }
  onSubmit(){
    if (this.modalRef) {
      this.modalRef.hide();
    }
    this.modalRef = this.modalService.show(this.SuccessAlertBox, {
      backdrop: 'static',
      keyboard: false,
      class: 'gray modal-md'
    });
  }

  goToDasboard() {
    this.modalRef.hide();
    this.IsSafetyFormOpen = false;
  }
}
