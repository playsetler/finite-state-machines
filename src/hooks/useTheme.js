import { ref, watch, onBeforeMount } from "vue";

const theme = ref(false)

export function useTheme() {
    const getStringTheme = (themeValue) => themeValue ? 'DARK' : 'LIGHT'

    const toggleTheme = () => {
        theme.value = !theme.value
    }

    watch(theme, (newTheme) => {
        localStorage.setItem("theme", getStringTheme(newTheme));
        document.body.className = getStringTheme(newTheme);
    }, { immediate: true })

    onBeforeMount(() => {
        theme.value = localStorage.getItem("theme") == 'DARK'
    })

    return {
        toggleTheme,
        theme
    }
}

export default useTheme