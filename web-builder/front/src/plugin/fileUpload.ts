import {api_url, config_file_name, deploy_file_name} from "../consts";
import axios from "axios";

export function uploadConfig(projects: any, storageKey: string): Promise<any> {
    return upload(projects, storageKey, config_file_name(storageKey))
}

export function uploadDeploy(projects: any, storageKey: string): Promise<any> {
    return upload(projects, storageKey, deploy_file_name(storageKey))
}

function upload(projects: any, storageKey: string, fileName: string): Promise<any> {
    return axios.post(`${api_url}?fileName=${fileName}`, {projects: projects})
}