import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  @Output()
  trainingStart = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }
  
  onStartTraining() {
    this.trainingStart.emit();
  }
}
