import React, {useEffect, useState} from "react";
import grapesjs from "grapesjs";
import Editor = grapesjs.Editor;
import {useParams} from "react-router-dom";
import plugin from "./plugin/plugin";
import InnerView from "./InnerView";
import axios from "axios";
import {api_url, deploy_file_name} from "./consts";
import {showLoading, closeLoading} from "./loading";

export default function View() {
    const [editor, setEditor] = useState<Editor>()
    const { page } = useParams()

    useEffect(() => {
        showLoading()
        const storageKey = `${page}-page-store`
        axios.get(`${api_url}?fileName=${deploy_file_name(storageKey)}`).then(({data}) => {
            const projects = data.projects as any[]
            const e = grapesjs.init({
                container: `#container`,
                storageManager: {type: storageKey, onLoad: (result, editor) => {
                        setEditor(editor)
                        return result.data
                    }},
                autorender: false,
                plugins: [plugin],
                wrapperIsBody: false
            })
            e.Storage.add(storageKey, {
                async load() {
                    return projects.filter((value) => {
                        return value.id === storageKey
                    })[0]
                },
                async store() {},
            });
        })
        closeLoading()
    }, [page])
    return (
        <InnerView editor={editor} />
    )
}