
export const api_url = "/web-builder/config"
export const config_file_name = (storageKey: string) => {
    return `${storageKey}/config.json`
}
export const deploy_file_name = (storageKey: string) => {
    return `${storageKey}/deploy.json`
}