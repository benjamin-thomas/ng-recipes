import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() type: 'danger' | 'info' | 'success' | 'warning' = 'danger';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
