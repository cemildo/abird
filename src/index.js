import './styles/style.scss'
import { engines } from "./engines/CoreEngine";

document.aBird = engines;

document.aBird.renderEngine.initialActions();
document.aBird.inputEngine.initialActions();