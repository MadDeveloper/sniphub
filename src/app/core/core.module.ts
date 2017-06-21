import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NotificationService } from './services/notification/notification.service'

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [ NotificationService ]
})
export class CoreModule { }
