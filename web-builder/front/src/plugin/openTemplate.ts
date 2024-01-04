import grapesjs from 'grapesjs';
import { PluginOptions } from './plugin';

import { cmdTemplate } from './consts';
import ModernTemplate from "../modernTemplate";
import EcommerceTemplate from "../ecommerceTemplate";
import AdminTemplate from "../adminTemplate";

type CommandInterface = Parameters<grapesjs.Commands["add"]>[1];

export default function openTemplate (editor: grapesjs.Editor): CommandInterface {
    const modal = editor.Modal;
    const container = document.createElement('div');
    const templateModal = document.createElement('div');
    const listGroup = document.createElement('div');
    listGroup.className = "list-group"
    listGroup.style.textAlign = "center"
    templateModal.append(listGroup)

    const previousBtn = document.createElement("button");
    previousBtn.className = "list-group-item"
    previousBtn.innerHTML = "이전사항으로"

    const modernBtn = document.createElement('button');
    modernBtn.className = "list-group-item"
    modernBtn.onclick = () => onClickTemplate(ModernTemplate())
    modernBtn.innerHTML = "모던"

    const ecommerceBtn = document.createElement('button');
    ecommerceBtn.className = "list-group-item"
    ecommerceBtn.onclick = () => onClickTemplate(EcommerceTemplate())
    ecommerceBtn.innerHTML = "이커머스"

    const adminBtn = document.createElement('button');
    adminBtn.className = "list-group-item"
    adminBtn.onclick = () => onClickTemplate(AdminTemplate())
    adminBtn.innerHTML = "어드민"

    listGroup.append(previousBtn)
    listGroup.append(modernBtn)
    listGroup.append(ecommerceBtn)
    listGroup.append(adminBtn)
    container.appendChild(templateModal);

    function onClickTemplate(style: string) {
        editor.Css.clear()
        editor.setComponents(style)
    }

    return {
        run(editor) {
            const backupData = editor.getProjectData()
            previousBtn.onclick = () => {
                editor.Css.clear()
                editor.loadProjectData(backupData)
            }
            modal.setTitle("Start bootstrap 무료 템플릿 (창을 닫으면 변경사항이 저장됩니다)");
            modal.setContent(container);
            modal.open().onceClose(() => editor.stopCommand(cmdTemplate))
        },
        stop() {
            modal.close();
        }
    };
};