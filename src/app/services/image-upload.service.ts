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

    const storageRef = firebase.storage().ref();

    for ( const image of images) {
      image.isUploading = true;
      if ( image.progress >= 100 ) {
        continue;
      }
      const imageReference = storageRef.child(`${this.image_directory}/${ image.fileName}`);
      const uploadTask: firebase.storage.UploadTask =
                            imageReference.put( image.file );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
       (snapshot: firebase.storage.UploadTaskSnapshot ) => {
          image.progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
       }, (error) => {
          console.log('Error al subir la imagen', error);
       }, () => {
        imageReference.getDownloadURL().then(
            (urlImagen ) => {
              console.log('Imagen cargada correctamente');
              image.url = urlImagen;
              image.isUploading = false;
              this.saveImage( {nombre: image.fileName, url: image.url });

            }, error => console.log(' Error consiguiendo url', error)
          );
       });
    }
    console.log(images);
  }

  private saveImage( image: {nombre: string, url: string} ) {
    this.db.collection(`/${ this.image_directory }`)
          .add( image );
  }
}
