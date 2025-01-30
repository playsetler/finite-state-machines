import { createMachine } from "xstate";
export const machine = createMachine(
    {
        id: "Untitled",
        initial: "DefaultState",
        states: {
            DefaultState: {
            description: "Default player state: reduced size, playback stopped",
            on: {
                eventOn: [
                    {
                        target: "PlayState",
                        actions: [],
                        meta: {},
                    },
                ],
            },
            },
            PlayState: {
                description: "Player status enabled: increased size, playback enabled",
                entry: {
                    type: "playVideo",
                },
                exit: {
                    type: "pauseVideo",
                },
                on: {
                    eventOff: [
                        {
                            target: "DefaultState",
                            actions: [],
                            meta: {},
                        },
                    ],
                },
            },
        },
    },
    {
    actions: {
        playVideo: ({ context, event }) => {},
        pauseVideo: ({ context, event }) => {},
    },
    actors: {},
    guards: {},
    delays: {},
    },
);