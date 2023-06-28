import reactDom from 'react-dom'
type Props = {
  children: React.ReactNode
}

export default function ModalPortal({ children }: Props) {
  if (typeof window === 'undefined') return null
  let divEl = document.getElementById('portal')
  if (!divEl) {
    divEl = document.createElement('div')
    divEl.id = 'portal'
    const htmlEl = document.getElementsByTagName('html')[0]
    htmlEl.appendChild(divEl)
  }
  return reactDom.createPortal(children, divEl)
}
