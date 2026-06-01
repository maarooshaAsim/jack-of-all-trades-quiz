async function inlineImage(image) {
  const source = image.getAttribute('src')

  if (!source || source.startsWith('data:')) {
    return
  }

  const response = await fetch(source)
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

export async function downloadElementAsJpeg(element, filename = 'joat-result.jpeg') {
  const clone = element.cloneNode(true)
  copyComputedStyles(element, clone)
  clone.querySelectorAll('[data-export-hidden="true"]').forEach((node) => node.remove())

  await Promise.all(Array.from(clone.querySelectorAll('img')).map(inlineImage))

  const width = Math.ceil(element.getBoundingClientRect().width)
  const height = Math.ceil(element.getBoundingClientRect().height)
  const serializedNode = new XMLSerializer().serializeToString(clone)
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">${serializedNode}</div>
      </foreignObject>
    </svg>
  `

  const svgUrl = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }))

  try {
    const image = new Image()

    await new Promise((resolve, reject) => {
      image.onload = resolve
      image.onerror = reject
      image.src = svgUrl
    })

    const scale = Math.max(2, window.devicePixelRatio || 1)
    const canvas = document.createElement('canvas')
    canvas.width = width * scale
    canvas.height = height * scale

    const context = canvas.getContext('2d')
    context.fillStyle = '#f4f4f3'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.scale(scale, scale)
    context.drawImage(image, 0, 0)

    const jpegUrl = canvas.toDataURL('image/jpeg', 0.92)
    const link = document.createElement('a')
    link.href = jpegUrl
    link.download = filename
    link.click()
  } finally {
    URL.revokeObjectURL(svgUrl)
  }
}
