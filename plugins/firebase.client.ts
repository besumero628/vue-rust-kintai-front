import { initializeApp } from 'firebase/app'
import {defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig();
    const fbConfig = {
        apiKey: runtimeConfig.public.apiKey,
        authDomain: runtimeConfig.public.authDomain,
        projectId: runtimeConfig.public.projectId,
    };
    initializeApp(fbConfig)
})