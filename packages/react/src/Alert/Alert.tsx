export default function Alert({ text }: { text: string }) {
  return <div className="alert-mcgert">{text}</div>
}

export interface Alert {
  text: string
}
