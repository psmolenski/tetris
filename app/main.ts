import {GameBoardController} from './game-board/game-board.controller';
import {NextBlockPreviewController} from "./next-block-preview/next-block-preview.controller";
import {Game} from "./domain/game";
import {CurrentScoreController} from "./current-score/current-score.controller";

import './styles/main.less';

const game = new Game(15, 24);

const gameBoardCanvas = <HTMLCanvasElement> document.getElementById('gameCanvas');
const gameBoardController = new GameBoardController(game, gameBoardCanvas);

const nextBlockPreviewCanvas = <HTMLCanvasElement> document.getElementById('nextBlockPreviewCanvas');
const nextBlockPreviewController = new NextBlockPreviewController(game, nextBlockPreviewCanvas);

const currentScoreElement = <HTMLDivElement> document.getElementById("currentScore");
const currentScoreController = new CurrentScoreController(game, currentScoreElement);

game.start();