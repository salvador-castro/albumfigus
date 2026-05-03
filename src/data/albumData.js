export const SPECIAL_STICKERS = [
  { id: '00', label: '00', category: 'special' },
  ...Array.from({ length: 19 }, (_, i) => ({
    id: `FWC${i + 1}`,
    label: `FWC${i + 1}`,
    category: 'special',
  })),
]

export const COCA_COLA_STICKERS = Array.from({ length: 14 }, (_, i) => ({
  id: `CC${i + 1}`,
  label: `CC${i + 1}`,
  category: 'coca_cola',
}))

export const GROUPS = [
  {
    name: 'Grupo A',
    teams: [
      { code: 'MEX', name: 'México', flag: '🇲🇽' },
      { code: 'SAF', name: 'Sudáfrica', flag: '🇿🇦' },
      { code: 'KOR', name: 'Corea del Sur', flag: '🇰🇷' },
      { code: 'CZE', name: 'República Checa', flag: '🇨🇿' },
    ],
  },
  {
    name: 'Grupo B',
    teams: [
      { code: 'CAN', name: 'Canadá', flag: '🇨🇦' },
      { code: 'BIH', name: 'Bosnia-Herzegovina', flag: '🇧🇦' },
      { code: 'QAT', name: 'Qatar', flag: '🇶🇦' },
      { code: 'SUI', name: 'Suiza', flag: '🇨🇭' },
    ],
  },
  {
    name: 'Grupo C',
    teams: [
      { code: 'BRA', name: 'Brasil', flag: '🇧🇷' },
      { code: 'MAR', name: 'Marruecos', flag: '🇲🇦' },
      { code: 'HAI', name: 'Haití', flag: '🇭🇹' },
      { code: 'SCO', name: 'Escocia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
    ],
  },
  {
    name: 'Grupo D',
    teams: [
      { code: 'USA', name: 'Estados Unidos', flag: '🇺🇸' },
      { code: 'PAR', name: 'Paraguay', flag: '🇵🇾' },
      { code: 'AUS', name: 'Australia', flag: '🇦🇺' },
      { code: 'TUR', name: 'Turquía', flag: '🇹🇷' },
    ],
  },
  {
    name: 'Grupo E',
    teams: [
      { code: 'GER', name: 'Alemania', flag: '🇩🇪' },
      { code: 'CUW', name: 'Curazao', flag: '🇨🇼' },
      { code: 'CIV', name: 'Costa de Marfil', flag: '🇨🇮' },
      { code: 'ECU', name: 'Ecuador', flag: '🇪🇨' },
    ],
  },
  {
    name: 'Grupo F',
    teams: [
      { code: 'NED', name: 'Países Bajos', flag: '🇳🇱' },
      { code: 'JPN', name: 'Japón', flag: '🇯🇵' },
      { code: 'SWE', name: 'Suecia', flag: '🇸🇪' },
      { code: 'TUN', name: 'Túnez', flag: '🇹🇳' },
    ],
  },
  {
    name: 'Grupo G',
    teams: [
      { code: 'BEL', name: 'Bélgica', flag: '🇧🇪' },
      { code: 'EGY', name: 'Egipto', flag: '🇪🇬' },
      { code: 'IRN', name: 'Irán', flag: '🇮🇷' },
      { code: 'NZL', name: 'Nueva Zelanda', flag: '🇳🇿' },
    ],
  },
  {
    name: 'Grupo H',
    teams: [
      { code: 'ESP', name: 'España', flag: '🇪🇸' },
      { code: 'CPV', name: 'Cabo Verde', flag: '🇨🇻' },
      { code: 'KSA', name: 'Arabia Saudita', flag: '🇸🇦' },
      { code: 'URU', name: 'Uruguay', flag: '🇺🇾' },
    ],
  },
  {
    name: 'Grupo I',
    teams: [
      { code: 'FRA', name: 'Francia', flag: '🇫🇷' },
      { code: 'SEN', name: 'Senegal', flag: '🇸🇳' },
      { code: 'IRQ', name: 'Irak', flag: '🇮🇶' },
      { code: 'NOR', name: 'Noruega', flag: '🇳🇴' },
    ],
  },
  {
    name: 'Grupo J',
    teams: [
      { code: 'ARG', name: 'Argentina', flag: '🇦🇷' },
      { code: 'ALG', name: 'Argelia', flag: '🇩🇿' },
      { code: 'AUT', name: 'Austria', flag: '🇦🇹' },
      { code: 'JOR', name: 'Jordania', flag: '🇯🇴' },
    ],
  },
  {
    name: 'Grupo K',
    teams: [
      { code: 'POR', name: 'Portugal', flag: '🇵🇹' },
      { code: 'COD', name: 'RD Congo', flag: '🇨🇩' },
      { code: 'UZB', name: 'Uzbekistán', flag: '🇺🇿' },
      { code: 'COL', name: 'Colombia', flag: '🇨🇴' },
    ],
  },
  {
    name: 'Grupo L',
    teams: [
      { code: 'ENG', name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      { code: 'CRO', name: 'Croacia', flag: '🇭🇷' },
      { code: 'GHA', name: 'Ghana', flag: '🇬🇭' },
      { code: 'PAN', name: 'Panamá', flag: '🇵🇦' },
    ],
  },
]

export const ALL_TEAMS = GROUPS.flatMap((g) => g.teams)

export function getTeamStickers(teamCode) {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `${teamCode}-${i + 1}`,
    label: `${i + 1}`,
    category: 'team',
    teamCode,
  }))
}

export function getAllStickerIds() {
  const ids = []
  SPECIAL_STICKERS.forEach((s) => ids.push(s.id))
  COCA_COLA_STICKERS.forEach((s) => ids.push(s.id))
  ALL_TEAMS.forEach((t) => {
    for (let i = 1; i <= 20; i++) ids.push(`${t.code}-${i}`)
  })
  return ids
}
