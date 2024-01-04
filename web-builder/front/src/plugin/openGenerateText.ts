import grapesjs from 'grapesjs';

import {cmdGenerateHtml} from './consts';
import axios from "axios";
import {api_url} from "../consts";
import {createSmallLoading, removeSmallLoading} from "../loading";


type CommandInterface = Parameters<grapesjs.Commands["add"]>[1];

export default function openGenerateText (editor: grapesjs.Editor): CommandInterface {
    const modal = editor.Modal;
    const container = document.createElement('div');
    const svg = document.createElement("span")
    svg.innerHTML = "<svg width='32px' height='32px' stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" viewBox=\"0 0 24 24\"><g><path fill=\"none\" d=\"M0 0h24v24H0z\"></path><path fill-rule=\"nonzero\" d=\"M19 13H5v7h14v-7zm0-2a7 7 0 0 0-14 0h14zM6.382 3.968A8.962 8.962 0 0 1 12 2c2.125 0 4.078.736 5.618 1.968l1.453-1.453 1.414 1.414-1.453 1.453A8.962 8.962 0 0 1 21 11v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11c0-2.125.736-4.078 1.968-5.618L3.515 3.93l1.414-1.414 1.453 1.453zM9 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z\"></path></g></svg>"
    const inputText = document.createElement("input");
    inputText.type = "text"
    inputText.style.minWidth = "500px"
    inputText.placeholder = "작성 후 엔터를 눌러주세요"
    const spinnerSpan = document.createElement("span");
    const description = document.createElement("div");
    description.innerHTML = "다른 작업을 하셔도 됩니다."
    const htmlPreview = document.createElement("div");
    const btnCreateComp = document.createElement('button');
    btnCreateComp.className = `btn btn-primary`;
    btnCreateComp.innerHTML = "에디터에 추가"
    btnCreateComp.disabled = true
    btnCreateComp.onclick = () => {
        const components = editor.addComponents(`<div style="padding: 10px">${htmlPreview.innerHTML}</div>`)
        components.forEach((value) => {
            editor.Components.addComponent(value, {})
        })
    }
    container.append(svg, inputText, spinnerSpan, description, htmlPreview, btnCreateComp)

    async function requestGPT() {
        spinnerSpan.append(createSmallLoading())
        const spinSvg = document.querySelector(".spinSvg")!!
        spinSvg.append(createSmallLoading())
        await axios.post(`${api_url}/generate/text?body=${inputText.value}`).then(({data}: any) => {
            editor.Css.clear()
            htmlPreview.innerHTML = data
        }).catch(() => {
            htmlPreview.innerHTML = "시간이 초과되었습니다."
        }).finally(() => {
            removeSmallLoading()
        })
    }

    return {
        run(ed) {
            let isRequest = false;
            inputText.onkeyup = (e) => {
                if (!isRequest && e.key === "Enter") {
                    isRequest = true;
                    requestGPT().then(() => {
                        isRequest = false
                        btnCreateComp.disabled = false
                    })
                }
            }
            modal.setTitle("AI code 생성");
            modal.setContent(container);
            modal.open().onceClose(() => ed.stopCommand(cmdGenerateHtml))
        },
        stop(ed) {
            modal.close();
        }
    };
};