const S = 'https://infobae.com/assets/images/sports/eventos-deportivos/soccer/logos/shields/'

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
      { code: 'MEX', name: 'México',           flag: '🇲🇽', logo: `${S}mexico-sam.svg` },
      { code: 'SAF', name: 'Sudáfrica',        flag: '🇿🇦', logo: `${S}south-africa-eur.svg` },
      { code: 'KOR', name: 'Corea del Sur',    flag: '🇰🇷', logo: `${S}korea-republic-eur.svg` },
      { code: 'CZE', name: 'Rep. Checa',       flag: '🇨🇿', logo: `${S}czechia-eur.svg` },
    ],
  },
  {
    name: 'Grupo B',
    teams: [
      { code: 'CAN', name: 'Canadá',           flag: '🇨🇦', logo: `${S}canada-sam.svg` },
      { code: 'BIH', name: 'Bosnia-Herz.',     flag: '🇧🇦', logo: `${S}bosnia-herzegovina-eur.svg` },
      { code: 'QAT', name: 'Qatar',            flag: '🇶🇦', logo: `${S}qatar-eur.svg` },
      { code: 'SUI', name: 'Suiza',            flag: '🇨🇭', logo: `${S}switzerland-eur.svg` },
    ],
  },
  {
    name: 'Grupo C',
    teams: [
      { code: 'BRA', name: 'Brasil',           flag: '🇧🇷', logo: `${S}brazil-sam.svg` },
      { code: 'MAR', name: 'Marruecos',        flag: '🇲🇦', logo: `${S}morocco-eur.svg` },
      { code: 'HAI', name: 'Haití',            flag: '🇭🇹', logo: `${S}haiti-nca.svg` },
      { code: 'SCO', name: 'Escocia',          flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', logo: `${S}scotland-eur.svg` },
    ],
  },
  {
    name: 'Grupo D',
    teams: [
      { code: 'USA', name: 'Estados Unidos',   flag: '🇺🇸', logo: `${S}united-states-sam.svg` },
      { code: 'PAR', name: 'Paraguay',         flag: '🇵🇾', logo: `${S}paraguay-sam.svg` },
      { code: 'AUS', name: 'Australia',        flag: '🇦🇺', logo: `${S}australia-eur.svg` },
      { code: 'TUR', name: 'Turquía',          flag: '🇹🇷', logo: `${S}turkiye-eur.svg` },
    ],
  },
  {
    name: 'Grupo E',
    teams: [
      { code: 'GER', name: 'Alemania',         flag: '🇩🇪', logo: `${S}germany-eur.svg` },
      { code: 'CUW', name: 'Curazao',          flag: '🇨🇼', logo: `${S}curacao-nca.svg` },
      { code: 'CIV', name: 'Costa de Marfil',  flag: '🇨🇮', logo: `${S}cote-d-ivoire-eur.svg` },
      { code: 'ECU', name: 'Ecuador',          flag: '🇪🇨', logo: `${S}ecuador-sam.svg` },
    ],
  },
  {
    name: 'Grupo F',
    teams: [
      { code: 'NED', name: 'Países Bajos',     flag: '🇳🇱', logo: `${S}netherlands-eur.svg` },
      { code: 'JPN', name: 'Japón',            flag: '🇯🇵', logo: `${S}japan-eur.svg` },
      { code: 'SWE', name: 'Suecia',           flag: '🇸🇪', logo: `${S}sweden-eur.svg` },
      { code: 'TUN', name: 'Túnez',            flag: '🇹🇳', logo: `${S}tunisia-eur.svg` },
    ],
  },
  {
    name: 'Grupo G',
    teams: [
      { code: 'BEL', name: 'Bélgica',          flag: '🇧🇪', logo: `${S}belgium-eur.svg` },
      { code: 'EGY', name: 'Egipto',           flag: '🇪🇬', logo: `${S}egypt-eur.svg` },
      { code: 'IRN', name: 'Irán',             flag: '🇮🇷', logo: `${S}ir-iran-eur.svg` },
      { code: 'NZL', name: 'Nueva Zelanda',    flag: '🇳🇿', logo: `${S}new-zealand-eur.svg` },
    ],
  },
  {
    name: 'Grupo H',
    teams: [
      { code: 'ESP', name: 'España',           flag: '🇪🇸', logo: `${S}spain-eur.svg` },
      { code: 'CPV', name: 'Cabo Verde',       flag: '🇨🇻', logo: `${S}cabo-verde-eur.svg` },
      { code: 'KSA', name: 'Arabia Saudita',   flag: '🇸🇦', logo: `${S}saudi-arabia-eur.svg` },
      { code: 'URU', name: 'Uruguay',          flag: '🇺🇾', logo: `${S}uruguay-sam.svg` },
    ],
  },
  {
    name: 'Grupo I',
    teams: [
      { code: 'FRA', name: 'Francia',          flag: '🇫🇷', logo: `${S}france-eur.svg` },
      { code: 'SEN', name: 'Senegal',          flag: '🇸🇳', logo: `${S}senegal-eur.svg` },
      { code: 'IRQ', name: 'Irak',             flag: '🇮🇶', logo: `${S}iraq-eur.svg` },
      { code: 'NOR', name: 'Noruega',          flag: '🇳🇴', logo: `${S}norway-eur.svg` },
    ],
  },
  {
    name: 'Grupo J',
    teams: [
      { code: 'ARG', name: 'Argentina',        flag: '🇦🇷', logo: `${S}argentina-sam.svg` },
      { code: 'ALG', name: 'Argelia',          flag: '🇩🇿', logo: `${S}algeria-eur.svg` },
      { code: 'AUT', name: 'Austria',          flag: '🇦🇹', logo: `${S}austria-eur.svg` },
      { code: 'JOR', name: 'Jordania',         flag: '🇯🇴', logo: `${S}jordan-eur.svg` },
    ],
  },
  {
    name: 'Grupo K',
    teams: [
      { code: 'POR', name: 'Portugal',         flag: '🇵🇹', logo: `${S}portugal-eur.svg` },
      { code: 'COD', name: 'RD Congo',         flag: '🇨🇩', logo: `${S}congo-dr-eur.svg` },
      { code: 'UZB', name: 'Uzbekistán',       flag: '🇺🇿', logo: `${S}uzbekistan-eur.svg` },
      { code: 'COL', name: 'Colombia',         flag: '🇨🇴', logo: `${S}colombia-sam.svg` },
    ],
  },
  {
    name: 'Grupo L',
    teams: [
      { code: 'ENG', name: 'Inglaterra',       flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', logo: `${S}england-eur.svg` },
      { code: 'CRO', name: 'Croacia',          flag: '🇭🇷', logo: `${S}croatia-eur.svg` },
      { code: 'GHA', name: 'Ghana',            flag: '🇬🇭', logo: `${S}ghana-eur.svg` },
      { code: 'PAN', name: 'Panamá',           flag: '🇵🇦', logo: `${S}panama-sam.svg` },
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
