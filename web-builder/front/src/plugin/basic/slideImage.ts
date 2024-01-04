import grapesjs from "grapesjs";
import Editor = grapesjs.Editor;
import {basicCategory} from "../consts";
import {PluginOptions} from "../plugin";

export const slideImage = function () {
    const dots = document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLElement>
    if (dots.length > 0) {
        showImage(dots[0], 1)

        dots[0].addEventListener("click", function () {
            showImage(dots[0], 1)
        })
        dots[1].addEventListener("click", function () {
            showImage(dots[1], 2)
        })
        dots[2].addEventListener("click", function () {
            showImage(dots[2], 3)
        })
    }

    function showImage(dot: HTMLElement, index: number) {
        let j;
        let slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
        let dots = document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLElement>;
        if (index > slides.length) {index = 1}
        if (index < 1) {index = slides.length}
        for (j = 0; j < slides.length; j++) {
            slides[j].style.display = "none";
        }
        for (j = 0; j < dots.length; j++) {
            dots[j].className = dots[j].className.replace(" active", "");
        }
        slides[index-1].style.display = "block";
        dots[index-1].className += " active";
    }
}

export default function addSlideImageType (editor: Editor, opts: Required<PluginOptions>) {
    const components = editor.Components
    const type = "slide-image"
    const script = slideImage

    components.addType(type, {
        model: {
            defaults: {
                script,
                resizable: true,
                components:
                    "<style>" +
                    "* {box-sizing:border-box}" +
                    ".slideshow-container {" +
                    "  max-width: 1000px;" +
                    "  position: relative;" +
                    "  margin: auto;" +
                    "}" +
                    ".mySlides {" +
                    "  display: none;" +
                    "}" +
                    ".prev {" +
                    "  cursor: pointer;" +
                    "  position: absolute;" +
                    "  top: 50%;" +
                    "  width: auto;" +
                    "  margin-top: -22px;" +
                    "  padding: 16px;" +
                    "  color: white;" +
                    "  font-weight: bold;" +
                    "  font-size: 18px;" +
                    "  transition: 0.6s ease;" +
                    "  border-radius: 0 3px 3px 0;" +
                    "  user-select: none;" +
                    "}" +
                    ".next {" +
                    "  cursor: pointer;" +
                    "  position: absolute;" +
                    "  top: 50%;" +
                    "  right: 0;" +
                    "  width: auto;" +
                    "  margin-top: -22px;" +
                    "  padding: 16px;" +
                    "  color: white;" +
                    "  font-weight: bold;" +
                    "  font-size: 18px;" +
                    "  transition: 0.6s ease;" +
                    "  border-radius: 3px 0 0 3px;" +
                    "  user-select: none;" +
                    "}" +
                    ".prev:hover, .next:hover {" +
                    "  background-color: rgba(0,0,0,0.8);" +
                    "}" +
                    ".text {" +
                    "  color: #000000;" +
                    "  font-size: 15px;" +
                    "  padding: 8px 12px;" +
                    "  position: absolute;" +
                    "  bottom: 8px;" +
                    "  width: 100%;" +
                    "  text-align: center;" +
                    "}" +
                    ".numbertext {" +
                    "  color: #000000;" +
                    "  font-size: 12px;" +
                    "  padding: 8px 12px;" +
                    "  position: absolute;" +
                    "  top: 0;" +
                    "}" +
                    ".dot {" +
                    "  cursor: pointer;" +
                    "  height: 15px;" +
                    "  width: 15px;" +
                    "  margin: 0 2px;" +
                    "  background-color: #bbb;" +
                    "  border-radius: 50%;" +
                    "  display: inline-block;" +
                    "  transition: background-color 0.6s ease;" +
                    "}" +
                    ".active, .dot:hover {" +
                    "  background-color: #717171;" +
                    "}" +
                    ".fade {" +
                    "  animation-name: fade;" +
                    "  animation-duration: 1.5s;" +
                    "}" +
                    ".fade:not(.show) {" +
                    "    opacity: 1;" +
                    "}" +
                    "@keyframes fade {" +
                    "  from {opacity: .4}" +
                    "  to {opacity: 1}" +
                    "}" +
                    "</style>" +
                    "<div class=\"slideshow-container\">" +
                    "  <div class=\"mySlides fade\">" +
                    "    <div class=\"numbertext\">1 / 3</div>" +
                    "    <img width='375px' height='375px' src=\"https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/2814544005/B.jpg?179000000\" style=\"width:100%\">" +
                    "    <div class=\"text\">설명</div>" +
                    "  </div>" +
                    "  <div class=\"mySlides fade\">" +
                    "    <div class=\"numbertext\">2 / 3</div>" +
                    "    <img width='375px' height='375px' src=\"http://openimage.interpark.com/goods_image_big/9/6/7/1/7678499671_l.jpg\" style=\"width:100%\">" +
                    "    <div class=\"text\">설명</div>" +
                    "  </div>" +
                    "  <div class=\"mySlides fade\">" +
                    "    <div class=\"numbertext\">3 / 3</div>" +
                    "    <img width='375px' height='375px' src=\"https://www.bignjoy.com/shopimages/bigsize/0680030006852.jpg?1631843710\" style=\"width:100%\">" +
                    "    <div class=\"text\">설명</div>" +
                    "  </div>" +
                    "</div>" +
                    "<br>" +
                    "<div style=\"text-align:center\">" +
                    "  <span class=\"dot\" ></span>" +
                    "  <span class=\"dot\" ></span>" +
                    "  <span class=\"dot\" ></span>" +
                    "</div>"
            },
        }
    })
    const bm = editor.BlockManager;
    bm.add(type, {
        category: basicCategory,
        label: opts.slideImage,
        media: `<svg class="svg-width" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512"><path fill="none" stroke-linejoin="round" stroke-width="32" d="M432 112V96a48.14 48.14 0 00-48-48H64a48.14 48.14 0 00-48 48v256a48.14 48.14 0 0048 48h16"></path><rect width="400" height="336" x="96" y="128" fill="none" stroke-linejoin="round" stroke-width="32" rx="45.99" ry="45.99"></rect><ellipse cx="372.92" cy="219.64" fill="none" stroke-miterlimit="10" stroke-width="32" rx="30.77" ry="30.55"></ellipse><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M342.15 372.17L255 285.78a30.93 30.93 0 00-42.18-1.21L96 387.64M265.23 464l118.59-117.73a31 31 0 0141.46-1.87L496 402.91"></path></svg>`,
        content: {
            type: type,
        }
    });
}