import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, ColorSchemeName } from 'react-native';

const LightTheme = {
  dark: false,
  colors: {
    background: '#E9E9E9',
    text: '#000000',
  },
};

const DarkTheme = {
  dark: true,
  colors: {
    background: '#001524',
    text: '#ffffff',
  },
};

type ThemeType = typeof LightTheme | typeof DarkTheme;
type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: ThemeType;
  preference: ThemePreference;
  toggleTheme: () => void;
  setPreference: (preference: ThemePreference) => Promise<void>;
  initializeTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set, get) => {
    // Helper to apply theme based on preference
    const applyTheme = (pref: ThemePreference, systemScheme?: ColorSchemeName) => {
        let themeToApply: ThemeType;

        if (pref === 'dark') {
            themeToApply = DarkTheme;
        } else if (pref === 'light') {
            themeToApply = LightTheme;
        } else {
            const systemColorScheme = systemScheme ?? Appearance.getColorScheme();
            themeToApply = systemColorScheme === 'dark' ? DarkTheme : LightTheme;
        }

        set({ theme: themeToApply });
    };

  // Listener for system theme changes
  const handleAppearanceChange = (preferences:  { colorScheme: ColorSchemeName }) => {
    const pref = get().preference;
    if (pref === 'system') {
      applyTheme('system', preferences.colorScheme);
    }
  };

  Appearance.addChangeListener(handleAppearanceChange);

  return {
    theme: LightTheme,
    preference: 'light', // Default

    toggleTheme: async () => {
      const currentPref = get().preference;

      // Cycle through: light -> dark -> system -> light...
      const newPref: ThemePreference =
        currentPref === 'light' ? 'dark' : currentPref === 'dark' ? 'system' : 'light';

      await get().setPreference(newPref);
    },

    setPreference: async (pref: ThemePreference) => {
        set({ preference: pref });
        applyTheme(pref);
        await AsyncStorage.setItem('userTheme', pref);
    },

    initializeTheme: async () => {
      const savedPref = (await AsyncStorage.getItem('userTheme')) as ThemePreference | null;
      const preference: ThemePreference = savedPref ?? 'light';
      set({ preference });
      applyTheme(preference);
    },
  };
});
