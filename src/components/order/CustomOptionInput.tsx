
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface CustomOptionInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const CustomOptionInput = ({ label, value, onChange }: CustomOptionInputProps) => {
  return (
    <div className="mt-2" data-aos="fade-up">
      <Label htmlFor={`custom-${label}`}>Custom {label}</Label>
      <Textarea
        id={`custom-${label}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter your custom ${label.toLowerCase()} details`}
        className="mt-1"
      />
    </div>
  );
};

export default CustomOptionInput;
