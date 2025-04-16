
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface CustomOptionInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const CustomOptionInput = ({ label, value, onChange }: CustomOptionInputProps) => {
  return (
    <div className="space-y-2" data-aos="fade-up">
      <Label 
        htmlFor={`custom-${label}`}
        className="text-sm font-medium text-foreground"
      >
        Custom {label}
      </Label>
      <Textarea
        id={`custom-${label}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter your custom ${label.toLowerCase()} details`}
        className="min-h-[80px] bg-background resize-none"
      />
    </div>
  );
};

export default CustomOptionInput;
