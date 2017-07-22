import {Observable, Subject} from "@reactivex/rxjs";
import {Command} from "./command";
import * as Rx from 'rx-dom';

interface Controller {
  getCommandStream() : Observable<Command>;
}

class KeyboardController implements Controller {

  private readonly document: Document;
  private readonly subject: Subject<Command>;

  constructor(document: Document) {
    this.document = document;
    this.subject = new Subject();

    Rx.DOM.keydown(this.document.documentElement).subscribe((event) => {
      switch (event.code) {
        case 'ArrowLeft':
          this.subject.next(Command.MoveLeft);
          break;
        case 'ArrowRight':
          this.subject.next(Command.MoveRight);
          break;
        case 'ArrowDown':
          this.subject.next(Command.Drop);
          break;
        case 'Space':
          this.subject.next(Command.RotateClockwise);
          break;

      }
    })
  }

  getCommandStream(): Observable<Command> {
    return this.subject.asObservable();
  }

}

export {
  Controller,
  KeyboardController
}