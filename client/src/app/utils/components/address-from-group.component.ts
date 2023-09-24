import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { ControlContainer, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";


@Component({
selector:'app-address-group',
standalone:true,
templateUrl:'./address-from-group.component.html',
imports:[ReactiveFormsModule,CommonModule],
viewProviders:[{provide:ControlContainer,useFactory:()=> inject(ControlContainer,{skipSelf:true})}]
})
export class AddressFormGroup{
@Input() controlKey=''
@Input() legend=''
parentContainer = inject(ControlContainer)
get parentFormGroup(){
    return this.parentContainer.control as FormGroup
}
constructor(private formBuilder: NonNullableFormBuilder){}
ngOnInit(){
    this.parentFormGroup.addControl(
        this.controlKey,this.formBuilder.group({
            zipCode: [''],
            street:['']
          })
    )
}
ngOnDestroy(){
    this.parentFormGroup.removeControl('address')
}
}