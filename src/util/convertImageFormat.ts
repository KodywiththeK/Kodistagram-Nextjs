function checkWebPSupport() {
  const elem = document.createElement('canvas')
  if (!!(elem.getContext && elem.getContext('2d'))) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
  }
  return false
}

export async function convertToWebPFile(file: File) {
  let type = 'image/jpeg'
  if (checkWebPSupport()) type = 'image/webp'

  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.onload = function (event) {
      const image = new Image()
      image.onload = function () {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = image.width
        canvas.height = image.height
        context?.drawImage(image, 0, 0)
        canvas.toBlob(
          function (blob) {
            resolve(blob)
          },
          type,
          0.8
        )
      }
      image.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  })
}
