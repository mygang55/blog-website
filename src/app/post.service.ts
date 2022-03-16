import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '../BlogPost';

const perPage = 6;

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(page,tag,category): Observable<BlogPost[]> {

    let params = {
      page: page,
      perPage: perPage.toString()
    }

    if (tag != null || tag != undefined) {
      params["tag"] = tag;
    }

    if (category != null || category != undefined) {
      params["category"] = category;
    }

    return this.http.get<BlogPost[]>(`https://web422-assa5.herokuapp.com/api/posts`,{params});
  }

  getPostByID(id): Observable<BlogPost> {
    return this.http.get<BlogPost>(`https://web422-assa5.herokuapp.com/api/posts/${id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`https://web422-assa5.herokuapp.com/api/categories`);
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`https://web422-assa5.herokuapp.com/api/tags`);
  }

  getAllPosts(): Observable<BlogPost[]> {

    const perPage=Number.MAX_SAFE_INTEGER.toString();

    let params = {
      page:"1",
      perPage:perPage
    }

    return this.http.get<BlogPost[]>(`https://web422-assa5.herokuapp.com/api/posts`, {params});
  }

  newPost(data:BlogPost): Observable<any>{
    return this.http.post<any>(`https://web422-assa5.herokuapp.com/api/posts`, data);
  }

  updatePostById(id:string, data:BlogPost): Observable<any>{
    return this.http.put<any>(`https://web422-assa5.herokuapp.com/api/posts/${id}`, data);
  }

  deletePostById(id:string): Observable<any>{
    return this.http.delete<any>(`https://web422-assa5.herokuapp.com/api/posts/${id}`);
  }


}



