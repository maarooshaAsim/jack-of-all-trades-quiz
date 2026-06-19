async function inlineImage(image) {
  const source = image.getAttribute('src')

  if (!source || source.startsWith('data:')) {
    return
  }

  const response = await fetch(new URL(source, window.location.href))

  if (!response.ok) {
    throw new Error(`Could not load image for export: ${source}`)
  }

  const blob = await response.blob()

  await new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      image.setAttribute('src', reader.result)
      resolve()
    }

    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

function copyComputedStyles(source, target) {
  const computedStyle = window.getComputedStyle(source)

  for (const property of computedStyle) {
    target.style.setProperty(
      property,
      computedStyle.getPropertyValue(property),
      computedStyle.getPropertyPriority(property),
    )
  }

  Array.from(source.children).forEach((sourceChild, index) => {
    copyComputedStyles(sourceChild, target.children[index])
  })
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)

        return
      }

      reject(new Error('Could not create image blob.'))
    }, type, quality)
  })
}

export async function downloadElementAsJpeg(element, filename = 'joat-result.jpeg') {
  await document.fonts?.ready

  const bounds = element.getBoundingClientRect()
  const clone = element.cloneNode(true)
  copyComputedStyles(element, clone)
  clone.querySelectorAll('[data-export-hidden="true"]').forEach((node) => node.remove())

  clone.style.boxSizing = 'border-box'
  clone.style.width = `${Math.ceil(bounds.width)}px`
  clone.style.minWidth = `${Math.ceil(bounds.width)}px`
  clone.style.maxWidth = `${Math.ceil(bounds.width)}px`
  clone.style.background = '#f4f4f3'

  const host = document.createElement('div')
  host.style.position = 'fixed'
  host.style.left = '-10000px'
  host.style.top = '0'
  host.style.zIndex = '-1'
  host.style.pointerEvents = 'none'
  host.appendChild(clone)
  document.body.appendChild(host)

  try {
    await Promise.all(Array.from(clone.querySelectorAll('img')).map(inlineImage))

    const width = Math.ceil(clone.scrollWidth || bounds.width)
    const height = Math.ceil(clone.scrollHeight || bounds.height)
    const serializedNode = new XMLSerializer().serializeToString(clone)
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <foreignObject width="${width}" height="${height}">
          <div xmlns="http://www.w3.org/1999/xhtml">${serializedNode}</div>
        </foreignObject>
      </svg>
    `

    const svgUrl = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }))

    try {
      const image = new Image()

      await new Promise((resolve, reject) => {
        image.onload = resolve
        image.onerror = () => reject(new Error('Could not render export SVG.'))
        image.src = svgUrl
      })

      const scale = Math.max(2, window.devicePixelRatio || 1)
      const canvas = document.createElement('canvas')
      canvas.width = width * scale
      canvas.height = height * scale

      const context = canvas.getContext('2d')

      if (!context) {
        throw new Error('Could not create export canvas.')
      }

      context.fillStyle = '#f4f4f3'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.scale(scale, scale)
      context.drawImage(image, 0, 0)

      const jpegBlob = await canvasToBlob(canvas, 'image/jpeg', 0.92)
      const jpegUrl = URL.createObjectURL(jpegBlob)

      const link = document.createElement('a')
      link.href = jpegUrl
      link.download = filename
      link.rel = 'noopener'
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      link.remove()

      window.setTimeout(() => URL.revokeObjectURL(jpegUrl), 60_000)
    } finally {
      URL.revokeObjectURL(svgUrl)
    }
  } finally {
    host.remove()
  }
}
