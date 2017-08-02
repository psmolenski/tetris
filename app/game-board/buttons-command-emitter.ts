import {Command, CommandEmitter} from "../domain/command";
import {Observable, Subject} from "@reactivex/rxjs";
import * as Rx from 'rx-dom';
import {ObservableInput, Subscribable} from "@reactivex/rxjs/dist/cjs/Observable";

class ButtonsCommandEmitter implements CommandEmitter {

  private readonly subject: Subject<Command>;

  constructor() {
    this.subject = new Subject();

    const elements: Element[] = Array.from(document.querySelectorAll('.control-btn'));

    Observable.from(elements)
      .forEach(element => {
        return Rx.DOM.click(element).subscribe((event) => {
          const target = <HTMLElement> event.target;
          const command = target.getAttribute('command');


          switch (command) {
            case 'MoveLeft':
              this.subject.next(Command.MoveLeft);
              break;
            case 'MoveRight':
              this.subject.next(Command.MoveRight);
              break;
            case 'Drop':
              this.subject.next(Command.Drop);
              break;
            case 'RotateClockwise':
              this.subject.next(Command.RotateClockwise);
              break;

          }
        })
      })

  }

  get command$(): Observable<Command> {
    return this.subject.asObservable();
  }

}

export {ButtonsCommandEmitter};