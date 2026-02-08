/// <reference types="vite/client" />

declare module '*.png' {
    const pngPath: string;
    export default pngPath;
}

declare module '*.svg' {
    const svgPath: string;
    export default svgPath;
}

declare module '*.jpeg' {
    const jpegPath: string;
    export default jpegPath;
}

declare module '*.jpg' {
    const jpgPath: string;
    export default jpgPath;
}

// Add ImportMetaEnv interface without duplicating other modules
interface ImportMetaEnv {
    readonly VITE_RAZORPAY_KEY_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
