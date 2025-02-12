export default function Alert({ text }: AlertProps) {
  return <div className="alert-mcgert alert-test">{text}</div>
}

export interface AlertProps {
  text: string
}
