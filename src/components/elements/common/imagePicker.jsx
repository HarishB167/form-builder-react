import "./imagePicker.css";

const ImagePicker = ({ label, image, onChange }) => {
  return (
    <div className="imagePicker">
      <span className="imagePicker__label">{label}</span>
      <input
        className="imagePicker__input"
        type="file"
        value={image}
        onChange={onChange}
      />
    </div>
  );
};

export default ImagePicker;
