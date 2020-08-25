export function formatPrice(amount) {
  return amount
    .toString()
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const rootMargin: string = '10px'
const threshold: number = 0.1

export const makeIntersectionObserver = (loadData) => {
  return new IntersectionObserver(
    (entries, observer) => {
      entries.map((entry) => {
        if (!entry.isIntersecting) {
          return
        }
        const target = entry.target
        console.log(target)
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
