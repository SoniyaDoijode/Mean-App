import { Component, OnInit, OnDestroy } from '@angular/core';

import { NgForm, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { isObject } from 'util';
import { CdkVirtualForOf } from '@angular/cdk/scrolling';
import { mimeType } from './mime-type.validator'
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy{
  private mode = 'create';
  private postId : string;
  public post : Post;
  form : FormGroup;
  imagePreview: string;
  isLoading = false
  private authStatusSub : Subscription;
 constructor(public postsService : PostsService, public route : ActivatedRoute, public authService : AuthService){}
 
 ngOnInit(){

  this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
    authStatus =>{
      this.isLoading = false
    }
  )
   this.form = new FormGroup({
     title : new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
     content : new FormControl(null, {validators: [Validators.required]}),
     image : new FormControl(null, {validators: [Validators.required], asyncValidators :[mimeType]})
   })
  this.route.paramMap.subscribe((paramMap : ParamMap)=>{
    console.log(paramMap)
    if(paramMap.has('postId')){
      this.mode ='edit';
      this.postId = paramMap.get('postId')
      this.isLoading= true;
      this.postsService.getPost(this.postId).subscribe((postData)=>{
        console.log(postData)
        this.isLoading= false;
        this.post = {
          id: postData._id, 
          title : postData.title, 
          content: postData.content, 
          imagePath : postData.imagePath,
          creator : postData.creator
        }
      this.form.setValue({
        title: this.post.title,
         content:this.post.content, 
         image : this.post.imagePath
        })
      })
    }
    else{
      this.mode = 'create';
      this.postId = null;
    }
  
  })
 }

  onSavePost(){
    if(this.form.invalid){
      return 
    }
    this.isLoading = true
    if(this.mode === 'create'){
      // this.isLoading = false
      this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image)
    }
  else{
    // this.isLoading = false
    this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content,this.form.value.image)
  }     
    this.form.reset()
    
  }

  onImagePicked(event :Event){
    console.log(event)
    const file = (event.target as HTMLInputElement ).files[0];
    this.form.patchValue({
      image : file
    })
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader()
    reader.onload = ()=>{
      this.imagePreview = (reader.result as string)
    }
    reader.readAsDataURL(file)
    console.log(file)
    console.log(this.form)
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe()
  }

}
