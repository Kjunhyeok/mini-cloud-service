import React, {useEffect, useState} from "react";
import grapesjs from "grapesjs";
import Editor = grapesjs.Editor;
import {render} from "./plugin/render";
import {slideImage} from "./plugin/basic/slideImage";

interface Props {
    editor: Editor | undefined
}

export default function InnerView({editor}: Props) {
    const [css, setCss] = useState("")
    const [innerHtml, setInnerHtml] = useState(<div></div>)

    useEffect(() => {
        if (editor) {
            setCss(editor.getCss() as string)
            setInnerHtml(<div dangerouslySetInnerHTML={{__html: editor.getHtml()}} style={{overflow: "scroll", height: "100%"}}></div>)
        }
    }, [editor])

    useEffect(() => {
        render()
        slideImage()
    }, [innerHtml])

    return (
        <>
            <style>
                {css}
            </style>
            {innerHtml}
        </>
    )
}