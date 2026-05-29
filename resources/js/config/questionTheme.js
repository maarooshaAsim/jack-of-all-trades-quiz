export function getQuestionTheme(categoryId) {
  const themes = {
    engagement_pattern: {
      card: '#19385B',
      accent: '#69B2F5',
      accentText: '#0F2D4A',
    },
    education: {
      card: '#6B4414',
      accent: '#F4BE21',
      accentText: '#4C330D',
    },
    decision_drivers: {
      card: '#516E12',
      accent: '#A9D90A',
      accentText: '#324509',
    },
    regret_reflection: {
      card: '#7B1F1C',
      accent: '#F8453D',
      accentText: '#4A1513',
    },
    identity_self_perception: {
      card: '#7D2B17',
      accent: '#FF5A2C',
      accentText: '#571D10',
    },
    agency_energy: {
      card: '#5F149B',
      accent: '#9B21F0',
      accentText: '#3C0D61',
    },
  }

  return themes[categoryId] ?? themes.engagement_pattern
}
