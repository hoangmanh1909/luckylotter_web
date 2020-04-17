const CustomeTrashIcon = ({ type, className, size = "md", ...restProps }) => (
  <svg className={`${className}`} style={{ width: 19, height: 20 }}>
    {/* <use xlinkHref={type} /> svg-sprite-loader@0.3.x */}
    <use xlinkHref={`#${type.default.id}`} /> {/* svg-sprite-loader@latest */}
  </svg>
);
export default CustomeTrashIcon;
