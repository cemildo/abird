import {assets} from "../utils/Asset";

export default class AssetLoaderEngine {

   load(){
     return assets.load([
       "images/figures.png",
       "images/figures.json",
       "images/objects.png",
       "images/objects.json",
       "images/star.png",
       "images/red-star.png"
     ]);
   }
}