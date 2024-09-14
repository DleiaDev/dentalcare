interface SvgProps extends React.SVGAttributes<HTMLOrSVGElement> {
  name: string;
  className?: string;
  height?: number;
  width?: number;
  title?: string;
}

export default function Svg({
  name,
  className,
  title,
  width,
  height,
  ...props
}: SvgProps) {
  return (
    <svg {...props} className={className} height={height} width={width}>
      {title && <title>{title}</title>}
      <use href={`#${name}`} />
    </svg>
  );
}
