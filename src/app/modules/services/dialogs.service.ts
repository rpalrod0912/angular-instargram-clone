import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  followerDialogConstants = {
    containerClass: '.followers-dialog',
    newClass: 'followers-dialog-unvealed',
  };

  isModalOpened = new BehaviorSubject(false);

  unvealNewContainer(containerClass: string, newClass: string) {
    debugger;
    document.querySelector(containerClass)?.classList.add(newClass);
    this.isModalOpened.next(true);
  }

  closeContainer(containerClass: string, newClass: string) {
    document.querySelector(containerClass)?.classList.remove(newClass);
    this.isModalOpened.next(false);
  }
}
