"use client";

import { useEffect } from "react";

export default function ScrollFix() {
    useEffect(() => {
        // Force the browser to handle scroll restoration automatically,
        // which usually works better without 'scroll-behavior: smooth' on the html element.
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'auto';
        }
    }, []);

    return null;
}
