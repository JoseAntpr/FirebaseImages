import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private image_directory = 'img';

  constructor( private db: AngularFirestore) { }

  uploadImages( images: FileItem[] ) {
    console.log(images);
  }

  private saveImage( image: {nombre: string, url: string} ) {
    this.db.collection(`/${ this.image_directory }`)
          .add( image );
  }
}
