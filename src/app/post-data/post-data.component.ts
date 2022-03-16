import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from 'src/BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit {

  
  private querySub:any;
  post:BlogPost;
  commentName:string;
  commentText:string;

  
  constructor(private data: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params =>{
      //TODO: Get post by Id params['id'] and store the result in this.post
      this.data.getPostByID(params['id']).subscribe(data => {
        this.post = data,
        this.post.views++,
        this.data.updatePostById(this.post._id, this.post).subscribe();
      });
     });
  }

  submitComment():void {
    this.post.comments.push({
      author:this.commentName,
      comment:this.commentText,
      date:new Date().toLocaleDateString()
    });

    this.data.updatePostById(this.post._id,this.post).subscribe( () => {
     this.commentName="",
     this.commentText=""
    });

  }

  ngOnDestroy(){
    if(this.querySub) this.querySub.unsubscribe();
  }

}
