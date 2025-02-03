<template>
	<div :class="['container', { 'full-size': full }]">
		<Header />
		<Main />
	</div>
</template>

<script>
import Header from './components/layout/Header.vue'
import Main from './components/layout/Main.vue'
import Footer from './components/layout/Footer.vue'
import { useTheme } from '@/hooks/useTheme'

export default {
	components: {
		Header,
		Main,
		Footer
	},
    setup() {
		const { full } = useTheme()

		return { full }
    },
}
</script>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
