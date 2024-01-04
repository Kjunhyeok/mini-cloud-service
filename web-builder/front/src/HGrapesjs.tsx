import plugin from "./plugin/plugin"
import React, {useEffect, useState} from "react";
import 'grapesjs/dist/css/grapes.min.css';
import ko from "./translate"
import grapesjs from "grapesjs";
import axios from "axios";
import {api_url, config_file_name} from "./consts";
import {showLoading, closeLoading} from "./loading";
import {uploadConfig} from "./plugin/fileUpload";
import Editor = grapesjs.Editor;
import addDragListener from "./dragEvent";

interface HGrapesjsProps {
    id: string,
    storageKey: string
}

export default function HGrapesjs(props: HGrapesjsProps) {
    const [editor, setEditor] = useState<Editor>()
    const storageKey = props.storageKey
    useEffect(() => {
        showLoading()
        axios.get(`${api_url}?fileName=${config_file_name(storageKey)}`).then(({data}) => {
            const projects = data.projects as any[]
            const e = grapesjs.init({
                container: `#${props.id}`,
                height: '100%',
                storageManager: {type: storageKey},
                plugins: [plugin],
                avoidDefaults: true,
                selectorManager: {
                    componentFirst: true
                },
                i18n: {messages: {ko}},
                nativeDnD: true,
                multipleSelection: true,
                canvas: {
                    styles: ['https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css']
                },
            })
            e.Storage.add(storageKey, {
                async load() {
                    const pageData = projects.filter((value) => {
                        return value.id === storageKey
                    })
                    return pageData[0].data
                },
                async store(data) {
                    const pageData = projects.filter((value) => {
                        return value.id === storageKey
                    })
                    if (pageData.length === 0) {
                        projects.push({
                            id: storageKey,
                            data: data
                        })
                    }
                    const saveData = projects.map((value) => {
                        if (value.id === storageKey) {
                            value.data = data
                        }
                        return value
                    })
                    await uploadConfig(saveData, storageKey)
                }
            });
            setEditor(e)
            closeLoading()
        })
    }, [props, storageKey])

    useEffect(() => {
        if (editor) {
            addDragListener()
        }
    }, [editor])

    return (
        <>
            <div id={props.id} ></div>
        </>
    )
}