// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    css: [
        "bootstrap/dist/css/bootstrap.min.css",
        "bootstrap-icons/font/bootstrap-icons.css",
        '~/assets/styles/main.css'
    ],
    runtimeConfig: {
        public: {
            apiKey: '',
            authDomain: '',
            projectId: '',
            storageBucket: '',
            messagingSenderId: '',
            appId: ''
        }
    }
})
