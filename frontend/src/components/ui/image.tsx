type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  className?: string;
  src: string;
  alt: string;
  height?: number | string;
  width?: number | string;
};

const Image: React.FC<ImageProps> = ({
  className,
  src = "",
  alt = "",
  height,
  width,
  ...restProps
}) => {
  return (
    <img
      className={`${className}`}
      src={src}
      alt={alt}
      height={height}
      width={width}
      {...restProps}
    ></img>
  );
};

export { Image };
