import Image from 'next/image';

type BrandLogoProps = {
  size?: number;
  showWordmark?: boolean;
  className?: string;
  wordmarkClassName?: string;
};

export function BrandLogo({
  size = 28,
  showWordmark = true,
  className = '',
  wordmarkClassName = 'font-retro text-sm',
}: BrandLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src="/icons/jobscout-icon-128.png"
        alt="JobScout"
        width={size}
        height={size}
        className="pixelated shrink-0"
        style={{ imageRendering: 'pixelated' }}
        priority
      />
      {showWordmark ? (
        <span className={wordmarkClassName}>JOBSCOUT</span>
      ) : null}
    </span>
  );
}
