import {Command, CommandEmitter} from "../domain/command";
import {Observable, Subject} from "@reactivex/rxjs";
import * as Rx from 'rx-dom';

class KeyboardCommandEmitter implements CommandEmitter {

  private readonly subject: Subject<Command>;

  constructor() {
    this.subject = new Subject();

    Rx.DOM.keydown(document.documentElement).subscribe((event) => {
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

  get command$(): Observable<Command> {
    return this.subject.asObservable();
  }

}

export {KeyboardCommandEmitter};