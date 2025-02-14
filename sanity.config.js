import {defineConfig } from "sanity";
import {deskTool} from 'sanity/desk';
import schemas from "./sanity/schemas";

const config = defineConfig({
    projectId: '6fnwq7k5',
    dataset: 'production',
    title: 'rgbibel-shop',
    apiVersion: '2023-11-21',
    basePath: '/admin',
    plugins: [deskTool()],
    schema: {types: schemas},
})

export default config;