<template>
	<div :class="['container', { 'full-size': full }]">
		<Header />
		<Main />
	</div>
</template>

<script>
import Header from './components/layout/Header.vue'
import Main from './components/layout/Main.vue'
import { useTheme } from '@/hooks/useTheme'

export default {
	components: {
		Header,
		Main
	},
    setup() {
		const { full } = useTheme()

		return { full }
    },
}
</script>

<style scoped>
</style>
