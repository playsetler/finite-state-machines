<template>
    <main>
        <router-view v-slot="{ Component, route }">
            <transition name="fade">
                <Suspense>
                    <component :is="Component" :key="route.path" />
                </Suspense>
            </transition>
        </router-view>
    </main>
</template>

<script>
export default {
    setup() {
        
    },
}
</script>

<style scoped>

</style>