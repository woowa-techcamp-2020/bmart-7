const rootMargin: string = '60px'
const threshold: number = 0

export const makeIntersectionObserver = (loadData) => {
  return new IntersectionObserver(
    (entries, observer) => {
      entries.map((entry) => {
        if (!entry.isIntersecting) {
          return
        }
        const target = entry.target
        loadData()
        observer.unobserve(target)
      })
    },
    {
      threshold,
      rootMargin,
    }
  )
}
