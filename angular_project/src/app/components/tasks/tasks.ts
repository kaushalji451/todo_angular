import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tasks',
  imports: [FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
// Pending","Done","Completed
export class Tasks implements OnInit {

  // post form
  form = {
    task: ""
  };
  // task array
  tasks: any = [];
  //  https injector
  http = inject(HttpClient);

  //  get all task function
  getTasks() {
    this.http.get("http://localhost:3000/").subscribe({
      next: (responce: any) => {
        console.log(responce);
        this.tasks = responce;
      },
      error: (error: any) => {
        console.log("some error occ", error);
      }

    })
  }

  // handle post function
  handleSubmit() {
    if (this.form.task.length > 0) {
      console.log(this.form);
      this.http.post("http://localhost:3000/", this.form).subscribe({
        next: (responce: any) => {
          console.log("this is post responce", responce);
          this.getTasks();
          this.form.task = "";
        },
        error: (error: any) => {
          console.log("some error occ", error);
        }
      })
    }
  }

  // handle Delete function 
  handleDelete(id: any) {
    this.http.delete(`http://localhost:3000/?id=${id}`).subscribe({
      next: (responce: any) => {
        console.log(responce);
        alert("Data Successfully Deleted");
        this.getTasks();
      },
      error: (error: any) => {
        alert("some error to delete task");
        console.log("some error occ", error);
      }
    })
  }

  //  on page load
  ngOnInit(): void {
    console.log("this is data");
    this.getTasks();
  }

}
