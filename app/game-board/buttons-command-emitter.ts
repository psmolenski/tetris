import {Command, CommandEmitter} from "../domain/command";
import {Observable} from "@reactivex/rxjs";
import {FromEventObservable} from "@reactivex/rxjs/dist/cjs/observable/FromEventObservable";

class ButtonsCommandEmitter implements CommandEmitter {

  private readonly observable: Observable<Command>;

  constructor(element: HTMLElement) {

    const buttons = element.querySelectorAll('.control-btn');

    this.observable = new FromEventObservable<MouseEvent>(buttons, 'click')
      .concatMap(event => {
        const target = <HTMLElement> event.target;
        const command = target.getAttribute('command');


        switch (command) {
          case 'MoveLeft':
            return Observable.of(Command.MoveLeft);
          case 'MoveRight':
            return Observable.of(Command.MoveRight);
          case 'Drop':
            return Observable.of(Command.Drop);
          case 'RotateClockwise':
            return Observable.of(Command.RotateClockwise);
        }

        return Observable.empty();
      });
  }

  get command$(): Observable<Command> {
    return this.observable;
  }

}

export {ButtonsCommandEmitter};