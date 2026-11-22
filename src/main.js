const header = document.querySelector('[data-header]')
const menuToggle = document.querySelector('[data-menu-toggle]')
const mobileNav = document.querySelector('[data-mobile-nav]')
const filters = document.querySelectorAll('[data-works-filter]')
const works = document.querySelectorAll('[data-works-grid] .work')
const deepLinks = document.querySelectorAll('[data-filter]')

function onScroll() {
  if (!header) return
  header.classList.toggle('is-scrolled', window.scrollY > 12)
}

function setFilter(category) {
  filters.forEach((btn) => {
    const active = btn.dataset.worksFilter === category
    btn.classList.toggle('is-active', active)
    btn.setAttribute('aria-pressed', String(active))
  })

  works.forEach((item) => {
    const show = category === 'all' || item.dataset.cat === category
    item.classList.toggle('is-hidden', !show)
  })
}

menuToggle?.addEventListener('click', () => {
  const open = mobileNav?.hasAttribute('hidden')
  if (!mobileNav) return
  if (open) {
    mobileNav.removeAttribute('hidden')
    menuToggle.setAttribute('aria-expanded', 'true')
  } else {
    mobileNav.setAttribute('hidden', '')
    menuToggle.setAttribute('aria-expanded', 'false')
  }
})

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.setAttribute('hidden', '')
    menuToggle?.setAttribute('aria-expanded', 'false')
  })
})

filters.forEach((btn) => {
  btn.addEventListener('click', () => setFilter(btn.dataset.worksFilter || 'all'))
})

deepLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const category = link.dataset.filter
    if (category) setFilter(category)
  })
})

const revealTargets = document.querySelectorAll(
  '.direction, .work, .master-body, .master-media, .booking-panel, .section-intro',
)

revealTargets.forEach((el) => el.classList.add('reveal'))

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
  )

  revealTargets.forEach((el) => io.observe(el))
} else {
  revealTargets.forEach((el) => el.classList.add('is-in'))
}

window.addEventListener('scroll', onScroll, { passive: true })
onScroll()
