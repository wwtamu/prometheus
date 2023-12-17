import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { NotificationService } from './notification.service';
import { Notification } from './notification';

@Component({
  selector: 'prometheus-notification',
  styleUrls: ['notification.component.css'],
  templateUrl: 'notification.component.html'
})
export class NotificationComponent implements OnInit {

  @Input("channel") channel: string;

  protected observableNotifications: Observable<Array<Notification>>;

  constructor(public notifications: NotificationService) {

  }

  ngOnInit() {
    this.observableNotifications = this.notifications.registerChannel(this.channel);
  }

  dismiss(notification: Notification): void {
    this.notifications.remove(this.channel, notification);
  }

}
