import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  grandTotal: number = 0;
  inputForm = new FormGroup({
    input1: new FormControl(0),
    input2: new FormControl(0),
    input3: new FormControl(0),
  });

  ngOnInit() {
    this.inputForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((values) => {
      const num1 = Number(values.input1) || 0;
      const num2 = Number(values.input2) || 0;
      const num3 = Number(values.input3) || 0;

      this.grandTotal = num1 + num2 + num3;
    })
  }
}
