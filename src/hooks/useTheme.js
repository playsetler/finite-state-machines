import { ref, watch } from "vue";

const theme = ref(false)
const full = ref(false)

export function useTheme() {
    theme.value = localStorage.getItem("theme") == 'DARK'

    const getStringTheme = (themeValue) => themeValue ? 'DARK' : 'LIGHT'

    const toggleTheme = () => {
        theme.value = !theme.value
    }

    watch(theme, (newTheme) => {
        localStorage.setItem("theme", getStringTheme(newTheme));
        document.body.className = getStringTheme(newTheme);
    }, { immediate: true })

    return {
        toggleTheme,
        theme,
        full
    }
}

export default useTheme