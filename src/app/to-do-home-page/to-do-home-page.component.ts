import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-to-do-home-page',
  templateUrl: './to-do-home-page.component.html',
  styleUrls: ['./to-do-home-page.component.css']
})
export class ToDoHomePageComponent implements OnInit {

  modalRef: BsModalRef;
  tdForm: FormGroup;

  allTasksList = [];
  focusList = [];
  starredTasks = [];
  unNamedList = [];
  checkedTasks = [];

  count = 0;
  allTasksListCount = 0;
  allTasksListOverdue = 0;
  focusListCount = 0;
  focusListOverdue = 0;
  starredTasksCount = 0;
  starredTasksOverdue = 0;
  unNamedListCount = 0;
  unNamedListOverdue = 0;
  checkedTasksCount = 0;

  tab: Number = 1;

  constructor(private bsModalService: BsModalService, private fb: FormBuilder) { }

  openModal(template: TemplateRef<any>) {
    this.initalizeModal();
    this.modalRef = this.bsModalService.show(template);
  }

  //save the items to local storage
  saveToLocalStorage() {
    if (typeof Storage !== 'undefined') {
      localStorage.clear(); //empty it
      localStorage.setItem('todo', JSON.stringify(this.allTasksList));
    } else {
      alert('localStorage is not supported');
    }
  }

  //select tab
  selectTab(selectedTab) {
    this.tab = selectedTab;
  }

  guidGenerator() {
    var projectID;
    var guid = '-xxxx-4xxx-yxxx-xxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return guid;
  }

  checkedCount(list){
    this.count = 0;
    list.forEach((item) => {
      this.checkedTasks.forEach((checkedItem) => {
        if(item.id === checkedItem.id){
          this.count++;
        }
      })
    })
    return list.length - this.count;
  }

  updateCount(){
    this.checkedTasksCount = this.checkedTasks.length;

    this.unNamedListCount = this.unNamedList.length;
    this.unNamedListOverdue = this.checkedCount(this.unNamedList);

    this.allTasksListCount = this.allTasksList.length;
    this.allTasksListOverdue = this.allTasksListCount - this.checkedTasksCount > 0? this.allTasksListCount - this.checkedTasksCount : 0;

    this.starredTasksCount = this.starredTasks.length;
    this.starredTasksOverdue = this.checkedCount(this.starredTasks);

    this.focusListCount = this.focusList.length;
    this.focusListOverdue = this.checkedCount(this.focusList);
  }

  //on clicking complete, save it to localstorage
  todoComplete(isValid: boolean) {
    if (isValid) {
      var title = this.tdForm.controls['title'].value;
      var id = this.guidGenerator();
      var newItem = {
        'title': title,
        'description': this.tdForm.controls['description'].value,
        'userName': 'Developer_123',
        'createdTime': Date.now(),
        'starred': false,
        'focussed': false,
        'checked': false,
        'id': id
      };
      this.allTasksList.push(newItem);
      this.saveToLocalStorage();
      this.modalRef.hide();
      if(title.trim() === ''){
        this.unNamedList.push(newItem);
      }
      this.updateCount();
    }
  }

  toggleStar(id) {

    this.allTasksList.map((obj) => {
      if (obj.id === id) {
        obj.starred = !obj.starred;
        if (!obj.starred) {
          this.starredTasks = this.starredTasks.filter(function (item) { return item.id !== id; });
        } else {
          this.starredTasks.push(obj);
        }
      }
    });
    this.updateCount();
    this.saveToLocalStorage();
  }

  toggleFocus(id) {

    this.allTasksList.map((obj) => {
      if (obj.id === id) {
        obj.focussed = !obj.focussed;
        if (!obj.focussed) {
          this.focusList = this.focusList.filter(function (item) { return item.id !== id; });
        } else {
          this.focusList.push(obj);
        }
      }
    });
    this.updateCount();
    this.saveToLocalStorage();
  }
  deleteItem(id){
    this.allTasksList = this.allTasksList.filter(function (item) { return item.id !== id; });
    this.starredTasks = this.starredTasks.filter(function (item) { return item.id !== id; });
    this.unNamedList = this.unNamedList.filter(function (item) { return item.id !== id; });
    this.checkedTasks = this.checkedTasks.filter(function (item) { return item.id !== id; });
    this.focusList = this.focusList.filter(function (item) { return item.id !== id; });
    this.updateCount();
    this.saveToLocalStorage();
  }
  toggleCheck(id) {

    this.allTasksList.map((obj) => {
      if (obj.id === id) {
        obj.checked = !obj.checked;
        if (!obj.checked) {
          this.checkedTasks = this.checkedTasks.filter(function (item) { return item.id !== id; });
        } else {
          this.checkedTasks.push(obj);
        }
      }
    });
    this.updateCount();
    this.saveToLocalStorage();
  }

  initalizeModal() {
    this.tdForm = this.fb.group({
      title: [''],
      description: ['', [Validators.required]]
    });
  }

  getAllTasksList() {
    if (typeof Storage !== 'undefined') {
      if (localStorage.getItem('todo')) {
        this.allTasksList = JSON.parse(localStorage.getItem('todo'));
        this.starredTasks = this.allTasksList.filter((item) => item.starred);
        this.focusList = this.focusList.filter((item) => item.focussed);
        this.unNamedList = this.unNamedList.filter((item) => item.title === "");
        this.checkedTasks = this.checkedTasks.filter((item) => item.checked);
      } else {
        this.allTasksList = [];
        this.starredTasks = [];
        this.focusList = [];
        this.unNamedList = [];
        this.checkedTasks = [];
      }
      this.updateCount();
    } else {
      alert('localStorage is not supported');
    }
  }

  ngOnInit() {
    this.initalizeModal();
    this.getAllTasksList();
  }

}
