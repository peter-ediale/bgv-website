/** Small typewriter label in brackets, e.g. ( CHAPTER II — EVOLVE ). */
export default function ChapterLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`meta ${className}`}>( {children} )</p>;
}
