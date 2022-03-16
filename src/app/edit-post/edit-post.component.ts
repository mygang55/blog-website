import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService} from "../post.service";
import { Router, ActivatedRoute } from "@angular/router";
import { BlogPost } from 'src/BlogPost';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  blogPost:BlogPost;
  tags:string;

  private post;

  constructor(private router:Router, private route:ActivatedRoute, private data:PostService ) { }

  ngOnInit(): void {
    this.post = this.data.getPostByID(this.route.snapshot.params['id']).subscribe(data => {
      this.blogPost = data;
      this.tags = data.tags.toString();
    })
  }

  ngOnDestroy() {
    if (this.post) this.post.unsubscribe();
  }

  formSubmit(): void {
    this.tags.split(",").map(tag => tag.trim()); // convert the string to an array and remove whitespace
    this.data.updatePostById(this.blogPost._id, this.blogPost).subscribe(() => this.router.navigate(['/admin']));
  }
  
  deletePost(id):void {
    this.data.deletePostById(id).subscribe( () => this.router.navigate(['/admin']));
  }

}
