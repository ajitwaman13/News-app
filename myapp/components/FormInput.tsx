import { Controller } from "react-hook-form";
import { TextInput, Text, View } from "react-native";
import { FormInputProps } from "@/constants/type";

export default function FormInput({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  style,
}: FormInputProps) {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={[
                style,
                { borderColor: error ? "red" : "#ccc", borderWidth: 1 },
              ]}
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              secureTextEntry={secureTextEntry}
            />
            {error && <Text style={{ color: "red" }}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
}
