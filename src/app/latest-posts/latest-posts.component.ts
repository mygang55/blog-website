import { Component, OnInit, Input } from '@angular/core';
import { BlogPost} from "../../BlogPost";
import {PostService } from "../post.service";

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css']
})
export class LatestPostsComponent implements OnInit {

  blogPosts: Array<BlogPost>;
  private posts;

  constructor(private data: PostService) { }

  ngOnInit(): void {
    this.posts=this.data.getPosts(1, null, null).subscribe(data => this.blogPosts=data.slice(0,3));
  }

}
