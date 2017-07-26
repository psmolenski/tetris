import {GameBoardController} from './game-board/game-board.controller';
import {NextBlockPreviewController} from "./next-block-preview/next-block-preview.controller";
import {Game} from "./domain/game";

const game = new Game(20, 35);
const gameBoardCanvas = <HTMLCanvasElement> document.getElementById('gameCanvas');
const gameBoardController = new GameBoardController(game, gameBoardCanvas);
const nextBlockPreviewCanvas = <HTMLCanvasElement> document.getElementById('nextBlockPreviewCanvas');
const nextBlockPreviewController = new NextBlockPreviewController(game, nextBlockPreviewCanvas);
game.start();