<template>
    <div class="page">
        <Transition name="fade">
            <div v-show="snapshot.value.Playback != 'Playing'" class="text">
                <h1>PlayerView</h1>
                <p>Это страница с плеером</p>
                <button
                    :class="['button', {
                        pause: snapshot.value.Playback != 'Playing'
                    }]"
                    @click="send({
                        type: (snapshot.value.Playback != 'Playing') ? 'PLAY' : 'PAUSE'
                    })"
                >
                    <svg
                        v-if="snapshot.value.Playback != 'Playing'"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="icon icon-tabler icons-tabler-filled icon-tabler-player-play"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
                    </svg>

                    <svg
                        v-if="snapshot.value.Playback == 'Playing'"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24" 
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="icon icon-tabler icons-tabler-filled icon-tabler-player-pause"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
                        <path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
                    </svg>
                </button>
                
            </div>
        </Transition>
        <div class="panel">
            <button
                :class="['button', { pause: snapshot.value.Playback != 'Playing' }]"
                @click="send({
                    type: (snapshot.value.Playback != 'Playing') ? 'PLAY' : 'PAUSE'
                })"
            >
                <IconPlayerPause
                    v-if="snapshot.value.Playback == 'Playing'"
                    stroke={3}
                />

                <IconPlayerPlay
                    v-if="snapshot.value.Playback != 'Playing'"
                    stroke={3}
                />
            </button>

            <button
                class="button mute"
                @click="send({ type: snapshot.value.Controls.Volume == 'Unmute' ? 'MUTE' : 'UNMUTE' })"
            >
                <IconVolume2
                    v-if="snapshot.value.Controls.Volume == 'Unmute'"
                    stroke={3}
                />

                <IconVolume3
                    v-if="snapshot.value.Controls.Volume == 'Mute'"
                    stroke={3}
                />
            </button>
            
            <button
                class="button size"
                @click="send({ type: snapshot.value.Controls.Size == 'Closed' ? 'FULL' : 'MINI' })"
            >
                <IconArrowsMinimize
                    v-if="snapshot.value.Controls.Size == 'Opened'"
                    stroke={3}
                />

                <IconArrowsMaximize
                    v-if="snapshot.value.Controls.Size == 'Closed'"
                    stroke={3}
                />
            </button>
        </div>
        <video class="video" ref="player">
            <source src="@/assets/intro.mp4" type='video/mp4' />
        </video>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { createMachine } from "xstate"
import { useMachine } from '@xstate/vue'
import { useTheme } from '@/hooks/useTheme'
import {
    IconPlayerPlay,
    IconPlayerPause,
    IconArrowsMaximize,
    IconArrowsMinimize,
    IconVolume2,
    IconVolume3
} from '@tabler/icons-vue';

export default {
    components: {
        IconPlayerPlay,
        IconPlayerPause,
        IconArrowsMaximize,
        IconArrowsMinimize,
        IconVolume2,
        IconVolume3
    },
    setup() {
        const { full } = useTheme()
        const player = ref(null)

        const videoStateMachine = createMachine({
            id: 'Video Player',
            initial: 'Playback',
            states: {
                Playback: {
                    initial: 'Paused',
                    states: {
                        Playing: {
                            entry: { type: 'playVideo' },
                            on: {
                                PAUSE: [{
                                    target: 'Paused',
                                    reenter: true
                                }]
                            }
                        },
                        Paused: {
                            entry: { type: 'pauseVideo' },
                            on: {
                                PLAY: [{
                                    target: 'Playing',
                                    reenter: true
                                }]
                            }
                        },
                        Stopped: {
                            entry: { type: 'stopVideo' },
                            on: {
                                PLAY: [{
                                    target: 'Playing',
                                    reenter: true
                                }]
                            }
                        }
                    }
                },
                Controls: {
                    states: {
                        Volume: {
                            initial: 'Unmute',
                            states: {
                                Mute: {
                                    entry: { type: 'mute' },
                                    on: {
                                        UNMUTE: [{
                                            target: 'Unmute',
                                            reenter: true
                                        }]
                                    }
                                },
                                Unmute: {
                                    entry: { type: 'unMute' },
                                    on: {
                                        MUTE: [{
                                            target: 'Mute',
                                            reenter: true
                                        }]
                                    }
                                }
                            }
                        },
                        Size: {
                            initial: 'Closed',
                            states: {
                                Closed: {
                                    entry: { type: 'miniSize' },
                                    on: {
                                        FULL: [{
                                            target: 'Opened',
                                            reenter: true
                                        }]
                                    }
                                },
                                Opened: {
                                    entry: { type: 'fullSize' },
                                    on: {
                                        MINI: [{
                                            target: 'Closed',
                                            reenter: true
                                        }]
                                    }
                                }
                            }
                        }
                    },
                    type: "parallel",
                }
            },
            type: "parallel",
            on: {
                STOP: [{
                    target: '.Playback.Stopped',
                    reenter: true
                }]
            },
            predictableActionArguments: true,
            preserveActionOrder: true,
        },
        {
            actions: {
                stopVideo: () => {
                    player.value.currentTime = 0
                },
                playVideo: () => {
                    player.value.play()
                },
                pauseVideo: () => {
                    player.value.pause()
                },
                mute: () => {
                    player.value.muted = true
                },
                unMute: () => {
                    player.value.muted = false
                },
                fullSize: () => {
                    full.value = true
                },
                miniSize: () => {
                    full.value = false
                }
            }
        })

        const { snapshot, send } = useMachine(videoStateMachine)

        onMounted(() => {
            player.value.addEventListener("ended", () => {
                send({ type: 'STOP' })
            })
        })

        return {
            snapshot,
            send,
            player
        }
    }
}
</script>

<style scoped>
.page {
    position: relative;
    overflow: hidden;
}
.text {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(0, 0, 0, 0.8);
    z-index: 1;
}
.button {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    background-color: #aaa;
}
.button:hover {
    background-color: #fff;
}
.panel {
    position: absolute;
    bottom: 0;
    z-index: 1;
    padding: 10px;
    display: flex;
    flex-flow: row nowrap;
    gap: 10px;
}
.panel .button {
    flex: 0 0 28px;
    width: 28px;
    height: 28px;
    padding: 4px;
    color: #fff;
    background-color: var(--color-accent);
    transition: all 0.2s ease-in-out;
}
.panel .button:hover {
    background-color: var(--color-accent-light);
    transform: scale(1.2);
}
.video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.fade-enter-active, .fade-move {
  transition: all .3s cubic-bezier(.17,.67,.4,1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>