export const dashboardChartPalette = [
  '#DDA931',
  '#E9CB68',
  '#A7B9D4',
  '#96BDA8',
  '#D2A092',
  '#B7A7D4',
  '#8FB7C4',
  '#C9B57E',
  '#B4C67A',
  '#CFA4B5',
  '#A7AFBC',
  '#DDD0A8'
]

export const dashboardChartOtherColor = '#B8BEC8'

export const tokenUsageTrendColors = {
  input: '#A7B9D4',
  output: '#96BDA8',
  cacheCreation: '#DDA931',
  cacheRead: '#B7A7D4',
  cacheHitRate: '#D2A092'
}

export const getDashboardChartColors = (count: number): string[] => {
  if (count <= 0) return []
  return Array.from({ length: count }, (_, index) => (
    dashboardChartPalette[index % dashboardChartPalette.length]
  ))
}
