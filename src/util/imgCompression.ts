import imageCompression from 'browser-image-compression'

const imgCompression = async (fileSrc: File) => {
  const options = {
    maxSizeMB: 0.6,
    maxWidthOrHeight: 600,
    useWebWorker: true,
  }
  try {
    const compressedFile = await imageCompression(fileSrc, options)
    console.log('compressed', compressedFile)
    return compressedFile
  } catch (error) {
    console.log(error)
    return fileSrc
  }
}
export default imgCompression
