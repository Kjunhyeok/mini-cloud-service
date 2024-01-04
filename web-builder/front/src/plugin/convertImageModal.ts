import grapesjs from 'grapesjs';

import axios from "axios";
import {api_url} from "../consts";
import {createSmallLoading, removeSmallLoading} from "../loading";


export default function convertImageModal (editor: grapesjs.Editor) {

    editor.on("modal:open", () => {
        let isRequest = false
        const assets = document.querySelector(".gjs-am-assets-cont")!!
        if (assets) {
            const aiGenerate = document.getElementById("gpt-ai-generate")
            if (!aiGenerate) {
                const svg = document.createElement("span")
                svg.innerHTML = "<svg width='32px' height='32px' stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" viewBox=\"0 0 24 24\"><g><path fill=\"none\" d=\"M0 0h24v24H0z\"></path><path fill-rule=\"nonzero\" d=\"M19 13H5v7h14v-7zm0-2a7 7 0 0 0-14 0h14zM6.382 3.968A8.962 8.962 0 0 1 12 2c2.125 0 4.078.736 5.618 1.968l1.453-1.453 1.414 1.414-1.453 1.453A8.962 8.962 0 0 1 21 11v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11c0-2.125.736-4.078 1.968-5.618L3.515 3.93l1.414-1.414 1.453 1.453zM9 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z\"></path></g></svg>"
                const div = document.createElement("div")
                div.id = "gpt-ai-generate"
                const inputText = document.createElement("input");
                inputText.type = "text"
                inputText.style.width = "calc(100% - 35px)"
                inputText.placeholder = "작성 후 엔터를 눌러주세요"
                const spinnerSpan = document.createElement("span");
                inputText.onkeyup = (e) => {
                    if (!isRequest && e.key === "Enter") {
                        isRequest = true
                        requestGPT(spinnerSpan, inputText.value).then(() => isRequest = false)
                    }
                }
                const description = document.createElement("div");
                description.innerHTML = "다른 작업을 하셔도 됩니다."
                div.append(svg, inputText, spinnerSpan, description)
                assets.firstElementChild!!.before(div)
            }
        }
    })

    //TODO gpt function 통합
    async function requestGPT(spinnerSpan: HTMLSpanElement, inputText: string) {
        spinnerSpan.append(createSmallLoading())
        await axios.post(`${api_url}/generate/image?body=${inputText}`).then(({data}: any) => {
            const bJsonArray = data as Array<string>
            bJsonArray.forEach((value) => {
                const fieldTextDiv = document.querySelector(".gjs-am-add-field")!!
                const input = fieldTextDiv.firstElementChild!! as HTMLInputElement
                input.style.display = "none"
                input.value = `data:image/png;base64,${value}`
                const addImageButton = document.querySelector('.gjs-btn-prim')!! as HTMLButtonElement
                addImageButton.click()
                removeSmallLoading()
                input.style.display = "block"
            })
        })
    }
};