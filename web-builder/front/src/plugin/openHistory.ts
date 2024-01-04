import grapesjs from 'grapesjs';
import {cmdHistoryLoad} from './consts';
import axios from "axios";
import {api_url} from "../consts";
import moment from "moment/moment";
import 'moment/locale/ko'

type CommandInterface = Parameters<grapesjs.Commands["add"]>[1];

export default function openHistory (editor: grapesjs.Editor): CommandInterface {
    const modal = editor.Modal;
    const page = editor.Storage.getCurrent()
    const container = document.createElement('div');
    const templateModal = document.createElement('div')
    const listGroup = document.createElement("div")
    listGroup.className = "list-group"
    templateModal.append(listGroup)

    function projectLoad(storageKey: string, fileName: string) {
        axios.get(`${api_url}?fileName=${storageKey}/${fileName}`).then(({data}) => {
            editor.loadProjectData(data.projects[0].data)
        })
    }

    return {
        run(editor) {
            listGroup.innerHTML = ""
            axios.get(`${api_url}/history/list?pageName=${page}`).then(({data}) => {
                const historyList = data as Array<string>
                historyList.map(value => {
                    const btn = document.createElement("button")
                    btn.className = "list-group-item"
                    if (value === "deploy.json") {
                        btn.innerHTML = "배포중"
                        btn.onclick = () => projectLoad(page, value)
                    } else {
                        const fileName = value.replace("config-", "").replace(".json", "")
                        const date = new Date(Number(fileName))
                        btn.innerHTML = moment(date).fromNow()
                        btn.onclick = () => projectLoad(page, `history/${value}`)
                    }
                    listGroup.append(btn)
                })
            })
            container.appendChild(templateModal!!);
            modal.setTitle("배포내역 (재시작 전까지 유지)");
            modal.setContent(container);
            modal.open().onceClose(() => editor.stopCommand(cmdHistoryLoad))
        },
        stop() {
            modal.close();
        }
    };
};