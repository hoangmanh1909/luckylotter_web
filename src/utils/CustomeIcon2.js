const CustomIcon2 = ({ type, className, size = 'md', ...restProps }) => (
    <svg  className = {`${className}`} style={{width:15,height:15, paddingRight:"10px"}}>
      {/* <use xlinkHref={type} /> svg-sprite-loader@0.3.x */}
      <use xlinkHref={`#${type.default.id}`} /> {/* svg-sprite-loader@latest */}
    </svg>
);
export default CustomIcon2;