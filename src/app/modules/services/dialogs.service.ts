import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface OpenedModal {
  state: boolean;
  modalName: 'followedsDialog' | 'followersDialog' | '' | string;
}

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  followerDialogConstants = {
    containerClass: '.followers-modal',
    newClass: 'followers-modal-unvealed',
  };

  editUserImageConstants = {
    containerClass: '.edit-user-image-modal',
    newClass: 'edit-user-image-modal-unvealed',
  };

  isModalOpened = new BehaviorSubject({
    state: false,
    modalName: '',
  });

  unvealNewContainer(
    containerClass: string,
    newClass: string,
    modalName: 'followedsDialog' | 'followersDialog' | string
  ) {
    document.querySelector(containerClass)?.classList.add(newClass);
    this.isModalOpened.next({ state: true, modalName: modalName });
  }

  closeContainer(containerClass: string, newClass: string) {
    document.querySelector(containerClass)?.classList.remove(newClass);
    this.isModalOpened.next({ state: false, modalName: '' });
  }
}
