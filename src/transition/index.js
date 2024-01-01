import { crossfade } from "svelte/transition";

export const [send, recieve] = crossfade({duration:300});