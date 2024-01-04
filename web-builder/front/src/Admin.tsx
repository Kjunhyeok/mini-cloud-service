import React from "react";
import HGrapesjs from "./HGrapesjs";
import {useParams} from "react-router-dom";

export default function Admin() {
    const { page } = useParams()

    return (
        <HGrapesjs
            id='page-sjs'
            storageKey={`${page}-page-store`} />
    )
}