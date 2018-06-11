import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();
  @Input() files: FileItem[] = [];

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any ) {
    this.mouseOver.emit( true );
    this._preventDefaul( event );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any ) {
    this.mouseOver.emit( false );
  }

  @HostListener('drop', ['$event'])
  public drop( event: any ) {

    const transfer = this._getTransfer( event );

    if (  !transfer ) {
      return;
    }

    this._getFiles ( transfer.files );

    this._preventDefaul( event );

    this.mouseOver.emit(false);


  }

  private _getTransfer( event: any ) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _getFiles ( filesList: FileList ) {
    // tslint:disable-next-line:forin
    for ( const prop in Object.getOwnPropertyNames( filesList )) {
      const temporalFile = filesList[prop];

      if ( this._fileCanUpload( temporalFile ) ) {
        const newFile = new FileItem( temporalFile );

        this.files.push( newFile );
      }
    }

    console.log(this.files);
  }

  // Validaciones

  private _fileCanUpload( file: File): Boolean {
    if ( !this._fileDropped( file.name ) && this._esImagen( file.type )) {
      return true;
    } else {
      return false;
    }
  }
  private _preventDefaul( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _fileDropped( filename: string ): boolean {
    for ( const file of this.files ) {
      if ( file.fileName === filename ) {
        console.log(' File' + filename + ' exist');
        return true;
      }
    }
    return false;
  }

  private _esImagen ( fileType: string): boolean {
    return ( fileType === '' || fileType === undefined) ? false : fileType.startsWith('image');
  }

}
