import grapesjs from 'grapesjs';

import {cmdDragMode} from './consts';

type CommandInterface = Parameters<grapesjs.Commands["add"]>[1];

export default function openDragMode (editor: grapesjs.Editor): CommandInterface {
    const modal = editor.Modal;
    const container = document.createElement('div');
    const labelDiv = document.createElement('div');
    const label = document.createElement("label");
    label.innerHTML = "자유 모드로 변경하면 화면 비율에 따라 차이가 있을 수 있습니다.</br>확인을 누르면 변경됩니다."
    label.style.color = "white"
    label.style.padding = "10px"
    labelDiv.appendChild(label)

    let activated = false
    const ok = document.createElement("button")
    ok.className = "btn btn-primary"
    ok.style.marginRight = "10px"
    ok.innerHTML = "확인"
    ok.onclick = () => {
        const config = editor.Config as grapesjs.EditorConfig
        config.dragMode = "translate";
        editor.setDragMode("translate");
        activated = true
        modal.close();
    }

    const cancel = document.createElement("button")
    cancel.className = "btn btn-danger"
    cancel.innerHTML = "취소"
    cancel.onclick = () => {
        editor.stopCommand(cmdDragMode);
    }

    container.appendChild(labelDiv);
    container.appendChild(ok);
    container.appendChild(cancel);

    return {
        run(ed) {
            activated = false
            modal.setTitle("자유 모드 변경");
            modal.setContent(container);
            modal.open().onceClose(() => { if (!activated) ed.stopCommand(cmdDragMode) })
        },
        stop(ed) {
            const button = editor.Panels.getButton("options", cmdDragMode)!!
            button.set("active", false)
            const config = editor.Config as grapesjs.EditorConfig
            config.dragMode = undefined;
            editor.setDragMode("none")
            modal.close();
        }
    };
};