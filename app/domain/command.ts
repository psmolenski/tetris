import {Observable} from "@reactivex/rxjs";

enum Command {
  MoveLeft,
  MoveRight,
  Drop,
  RotateClockwise
}

interface CommandEmitter {
  readonly command$: Observable<Command>;
}


export {
  Command,
  CommandEmitter
}