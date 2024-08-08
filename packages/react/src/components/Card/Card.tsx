export default function Card({ text }: CardProps) {
  return <div className="fancy-card">{text}</div>
}

export interface CardProps {
  text: string
}
