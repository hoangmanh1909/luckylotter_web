const CustomIcon = ({ type, className, size = 'md', ...restProps }) => (
    <svg  className = {`${className}`} style={{width:22,height:22}}>
      {/* <use xlinkHref={type} /> svg-sprite-loader@0.3.x */}
      <use xlinkHref={`#${type.default.id}`} /> {/* svg-sprite-loader@latest */}
    </svg>
);
export default CustomIcon;