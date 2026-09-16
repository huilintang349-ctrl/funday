const STORAGE_KEY = 'funday-app-state-v1';

export const initialState = {
  preferences: [],
  duration: 3,
  currentPlan: null,
  favorites: [],
  registeredActivities: [],
  hostedActivities: [],
};

function readState() {
  if (typeof window === 'undefined') return initialState;
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return saved ? { ...initialState, ...saved } : initialState;
  } catch {
    return initialState;
  }
}

export function createAppStore(setState) {
  const update = patch => setState(prev => ({ ...prev, ...patch }));
  return {
    setPreferences: preferences => update({ preferences }),
    setDuration: duration => update({ duration }),
    setCurrentPlan: currentPlan => update({ currentPlan }),
    toggleFavorite: id => setState(prev => ({
      ...prev,
      favorites: prev.favorites.includes(id)
        ? prev.favorites.filter(item => item !== id)
        : [...prev.favorites, id],
    })),
    registerActivity: id => setState(prev => ({
      ...prev,
      registeredActivities: prev.registeredActivities.includes(id)
        ? prev.registeredActivities
        : [...prev.registeredActivities, id],
    })),
    addHostedActivity: activity => setState(prev => ({
      ...prev,
      hostedActivities: [...prev.hostedActivities, activity],
    })),
  };
}

export function loadAppState() {
  return readState();
}

export function persistAppState(state) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage may be unavailable in private/restricted browser contexts.
  }
}
