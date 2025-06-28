import "./index.scss";

function CheckboxCustom({
  id,
  onChange,
  checked,
}: {
  id: string;
  onChange?: () => void;
  checked: boolean;
}) {
  return (
    <input
      id={id}
      type="checkbox"
      onChange={() => onChange?.()}
      value=""
      checked={checked}
      className="custom-checkbox w-[22px] h-[22px]"
    />
  );
}

export default CheckboxCustom;
