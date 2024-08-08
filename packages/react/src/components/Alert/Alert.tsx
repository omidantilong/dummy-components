export default function Alert({ text }: AlertProps) {
  return <div className="alert-mcgert">{text}</div>
}

export interface AlertProps {
  text: string
}
