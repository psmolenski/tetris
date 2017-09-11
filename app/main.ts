import {router} from "./router";

import './styles/main.less';
import {SplashScreenController} from "./views/splash-screen/splash-screen.controller";
import {GameScreenController} from "./views/game-screen/game-screen.controller";
import {GameEndScreenController} from "./views/game-end-screen/game-end-screen.controller";

router.addView('splash-screen', SplashScreenController);
router.addView('game-screen', GameScreenController);
router.addView('game-end-screen', GameEndScreenController);

router.go('splash-screen');