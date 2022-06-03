import fs from 'fs'

export const getComponentHtml = (path) => {
    const html = fs.readFileSync(path, 'utf8')
    console.log(html);
}