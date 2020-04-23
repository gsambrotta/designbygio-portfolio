// ACTIVE CLASS ON NAV
window.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      onSectionInPage(entry)
    })
  })

  // observe all tag #section-sectionName
  document.querySelectorAll(`[id^='section-']`).forEach((section) => {
    observer.observe(section)
  })
})

function onSectionInPage(section) {
  const sectionId = section.target.id
  const link = document.querySelector(`.${sectionId}-link`)
  if (section.intersectionRatio > 0) {
    link.classList.add('active')
  } else {
    link.classList.remove('active')
  }
}

// COPY TO CLIPBOARD
const toCopyText = document.getElementById('copyEmail')
const copiedText = document.getElementById('emailCopied')
document.querySelector('#copyEmail').addEventListener('click', copyToClipboard)

function copyToClipboard() {
  const textarea = document.createElement('textarea')
  textarea.value = 'designbygio@pm.me'
  textarea.setAttribute('readonly', '') // not findable to screenreaders
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'

  document.body.appendChild(textarea)
  textarea.select()

  // copy to clipboard
  document.execCommand('copy')
  if (document.execCommand('copy')) {
    toCopyText.style.display = 'none'
    copiedText.style.display = 'inline-block'

    setTimeout(function () {
      toCopyText.style.display = 'inline-block'
      copiedText.style.display = 'none'
    }, 3000)
  }

  document.body.removeChild(textarea)
}

// PROJECTS ==========================
const projectsWrap = document.querySelectorAll('.projects-wrap')
const overlay = document.getElementById('overlayProject')
const titleOverlay = overlay.querySelector('h2')
const descriptionCompany = overlay.querySelector('#descriptionCompany')
const descriptionWork = overlay.querySelector('#descriptionWork')
const tagsDiv = overlay.querySelector('.tags')
const imgOverlay = overlay.querySelector('.img img')
const linksDiv = overlay.querySelector('.links')
const closeOverlayBtn = document.getElementById('closeOverlay')
const nextBtn = document.getElementById('next')
const prevBtn = document.getElementById('prev')
let projectIndex
let projects = []

// FETCH PROJECTS
window.onload = async function () {
  if (projects.length) return
  projects = await fetchProjects()

  nextBtn.addEventListener('click', function () {
    projectIndex = showNextProject(projectIndex)
  })
  prevBtn.addEventListener('click', function () {
    projectIndex = showPrevProject(projectIndex)
  })
}

async function fetchProjects() {
  try {
    const res = await fetch('./projects.json', { mode: 'no-cors' })
    if (res.ok) {
      const projectsJson = await res.json()
      return (projects = projectsJson)
    }
  } catch (err) {
    console.log(`there was an error fetching: ${err}`)
    // TODO: show fetch error
  }
}

// OPEN SINGLE PROJECT
document.querySelectorAll('.projects-container > div').forEach((div) => {
  div.addEventListener('click', (evt) => {
    const projectId = evt.target.id

    projectsWrap.forEach((container) => {
      container.classList.add('isClose')
    })
    overlay.classList.add('isOpen')
    overlay.scrollIntoView()

    projectIndex = projects.findIndex((proj) => proj.id === projectId)
    populateProject(projectIndex)

    if (projectIndex === projects.length - 1) {
      nextBtn.classList.add('disable')
    }
    if (projectIndex === 0) {
      prevBtn.classList.add('disable')
    }
    closeOverlayBtn.addEventListener('click', function () {
      closeOverlay(div)
    })
  })
})

// NEXT PROJECT
function showNextProject(projectIndex) {
  if (projectIndex === undefined) return

  if (projectIndex === projects.length - 2) {
    nextBtn.classList.add('disable')
  } else if (prevBtn.classList.contains('disable')) {
    prevBtn.classList.remove('disable')
  }
  const nextIndex = projectIndex + 1
  populateProject(nextIndex)

  return nextIndex
}

// PREV PROJECT
function showPrevProject(projectIndex) {
  if (projectIndex === undefined) return

  if (projectIndex === 1) {
    prevBtn.classList.add('disable')
  } else if (nextBtn.classList.contains('disable')) {
    nextBtn.classList.remove('disable')
  }
  const prevIndex = projectIndex - 1
  populateProject(prevIndex)

  return prevIndex
}

// CLOSE SINGLE PROJECT
function closeOverlay(div) {
  projectsWrap.forEach((container) => {
    container.classList.remove('isClose')
  })
  overlay.classList.remove('isOpen')
  cleanUpTemplate()
  nextBtn.classList.remove('disable')
  prevBtn.classList.remove('disable')

  div.scrollIntoView()
}

// POPULATE PROJECT
async function populateProject(projectIndex) {
  cleanUpTemplate()

  const project = projects[projectIndex]
  titleOverlay.innerHTML = project.title
  descriptionCompany.innerHTML = project.descriptionCompany
  descriptionWork.innerHTML = project.descriptionWork
  imgOverlay.src = project.backgroundImg

  project.links &&
    project.links.map((link) => {
      const a = document.createElement('a')
      a.appendChild(document.createTextNode(link))
      a.href = link
      linksDiv.appendChild(a)
    })

  project.tags &&
    project.tags.map((tag) => {
      const span = document.createElement('span')
      span.appendChild(document.createTextNode(tag))
      tagsDiv.appendChild(span)
    })
}

// CLEAN UP PROJECT
function cleanUpTemplate() {
  titleOverlay.innerHTML = ''
  descriptionCompany.innerHTML = ''
  descriptionWork.innerHTML = ''
  imgOverlay.src = '#'
  tagsDiv.innerHTML = ''
  linksDiv.innerHTML = ''
}
