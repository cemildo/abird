import './styles/style.scss'
import { engines } from "./engines/CoreEngine";


const body = document.getElementsByTagName("body");

const homePage = {};

homePage.setHomePage = () => {
  const homePage = document.createElement("div");
  homePage.classList.add("home-page");
  homePage.innerHTML = `
    <div class="home-page__container">
      <div class="home-page__main">
          <div class="home-page__subtitle">Angry Birds</div>
          <img src="./images/angrybirds.png" />
          <div class="button__container">
           <button class="home-page__button">Play</button> 
          </div> 
      </div>  
    </div>
  `;

  body[0].appendChild(homePage);

const button = document.getElementsByClassName("home-page__button")[0];
button.addEventListener("click", () => {
  homePage.remove();
  document.aBird = engines();
  engines().assetEngine.load()
  .then(() => {
    document.aBird.renderEngine.initialActions();
  })
});

}

homePage.setHomePage();