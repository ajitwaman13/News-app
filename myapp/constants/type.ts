import { Control, FieldValues } from "react-hook-form";
import { StyleProp, TextStyle } from "react-native";

export type Article = {
  title: string;
  description: string;
  author?: string;
  url?: string;
  urlToImage?: string;
};

export type FormInputProps = {
  control: Control<FieldValues>;
  name: string;
  rules?: object;
  placeholder: string;
  secureTextEntry?: boolean;
  style?: StyleProp<TextStyle>;
};