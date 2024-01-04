import grapesjs from 'grapesjs';

import {cmdQrcode} from './consts';


type CommandInterface = Parameters<grapesjs.Commands["add"]>[1];

export default function openQRCode (editor: grapesjs.Editor): CommandInterface {
    const modal = editor.Modal;
    const container = document.createElement('div');
    const qrGenerateScript = document.createElement("script")
    const qrDiv = document.createElement("div")
    qrDiv.id = "qrcode"
    qrGenerateScript.innerHTML = `new QRCode('qrcode','${window.location.href.replace("/admin", "")}')`
    container.appendChild(qrGenerateScript)
    container.appendChild(qrDiv);

    return {
        run(ed) {
            modal.setTitle("QR code(우클릭 저장)");
            modal.setContent(container);
            container.parentElement!!.parentElement!!.style.backgroundColor = "white"
            modal.open().onceClose(() => {
                ed.stopCommand(cmdQrcode)
                container.parentElement!!.parentElement!!.style.backgroundColor = ""
            })
        },
        stop(ed) {
            modal.close();
        }
    };
};