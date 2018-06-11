import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { ImageUploadService } from '../../services/image-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  files: FileItem[] = [];
  isDrop = false;

  constructor(public _uploadImages: ImageUploadService) { }

  ngOnInit() {
  }

  uploadImages() {
    this._uploadImages.uploadImages( this.files ) ;
  }

  cleanFiles() {
    this.files = [];
  }

}
