import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {dirname, resolve} from 'node:path'


// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    // base: "/static/integration-badges-ui-react",
    // publicDir: "/static/integration-badges-ui-react",
    build: {
        manifest: true,
        outDir: "../static/integration-badges-ui-react/"
    }
})
