import Game from './game';
import {RandomBlockProducer, SameBlockProducer} from "./block-producer";
import {CanvasRenderer} from "./renderer";
import {KeyboardController} from "./controller";

const blockProducer = new RandomBlockProducer();
// const blockProducer = new SameBlockProducer('I');
const renderer = new CanvasRenderer(<HTMLCanvasElement> document.getElementById('gameCanvas'));
const controller = new KeyboardController(document);
const game = new Game({renderer, blockProducer, controller});
game.start();