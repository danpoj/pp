import axios from 'axios'

export const updateCupPlayCountAndItemWinCount = async ({ cupId, itemId }: { cupId: string; itemId: string }) => {
  const increaseCupPlayCount = axios.patch(`/api/cup/${cupId}/playcount`)
  const increaseItemWinCount = axios.patch(`/api/item/${itemId}/wincount`)

  await Promise.all([increaseCupPlayCount, increaseItemWinCount])
}
