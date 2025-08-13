import { useThemeStore } from "@/store/ThemeStore";

export const useSkeletonCommonProps = () => {
  const { theme } = useThemeStore();

  return {
    colorMode: theme.dark ? 'dark' : 'light',
    highlightColor: theme.dark ? "#3a3a3c" : "#f5f5f5",
    transition: {
      type: 'timing',
      duration: 1300,
    },
    backgroundColor: theme.colors.darkGray
  } as const;
};
