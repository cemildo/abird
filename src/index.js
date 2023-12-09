import './styles/style.scss'
import { engines } from "./engines/CoreEngine";

document.aBird = engines;

engines.assetEngine.load()
  .then(() => {
    document.aBird.renderEngine.initialActions();
    // document.aBird.inputEngine.initialActions();
  })
