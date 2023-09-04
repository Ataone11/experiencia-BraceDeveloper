import { useState } from 'react'

export const useFetchPagination = ({
  functionFetcher,
  params
}: {
  functionFetcher: any
  params?: any
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const paginator = async ({ page }: { page: number }) => {
    setIsLoading(true)
    await functionFetcher({ ...params, page })
    setIsLoading(false)
  }

  return { paginator, isLoading }
}
