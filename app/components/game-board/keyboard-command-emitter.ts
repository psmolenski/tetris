import {Command, CommandEmitter} from "../../domain/command";
import {Observable} from "@reactivex/rxjs";
import {FromEventObservable} from "@reactivex/rxjs/dist/cjs/observable/FromEventObservable";

class KeyboardCommandEmitter implements CommandEmitter {

  private readonly observable: Observable<Command>;

  constructor(element: HTMLElement) {
    this.observable = new FromEventObservable<KeyboardEvent>(element, 'keydown')
      .concatMap(event => {
        switch (event.code) {
          case 'ArrowLeft':
            return Observable.of(Command.MoveLeft);
          case 'ArrowRight':
            return Observable.of(Command.MoveRight);
          case 'ArrowDown':
            return Observable.of(Command.Drop);
          case 'Space':
            return Observable.of(Command.RotateClockwise);
        }

        return Observable.empty();
      });

  }

  get command$(): Observable<Command> {
    return this.observable;
  }

}

export {KeyboardCommandEmitter};