"use client";
import { E164Number } from "libphonenumber-js/core";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "../forms/PatientForm";
import { platform } from "os";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimesSelect?: boolean;
  children?: React.ReactNode;
  // this is for the loading state,
  renderSkeletons?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { control, fieldType, name, label, placeholder, iconSrc, iconAlt } =
    props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.TEXTAREA:
      return <textarea {...field} {...props} />;
    case FormFieldType.CHECKBOX:

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return <Input {...field} {...props} />;
    case FormFieldType.SELECT:
      return <Input {...field} {...props} />;
    case FormFieldType.SKELETON:
      return props.renderSkeletons?.(field);
    default:
      return <Input type="input" {...field} {...props} />;
  }

  return (
    <Input
      type="input"
      placeholder={props.placeholder}
      className="text-black"
    />
  );
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          // <FormItem>
          //   <FormLabel>Username</FormLabel>
          //   <FormControl>
          //     <Input placeholder="shadcn" {...field} />
          //   </FormControl>
          //   <FormDescription>This is your public display name.</FormDescription>
          //   <FormMessage />
          // </FormItem>

          <FormItem className="flex-1">
            {fieldType !== FormFieldType.CHECKBOX && label && (
              <FormLabel> {label}</FormLabel>
            )}

            {/* then we create different functional componets for different inputs */}
            <RenderField field={field} props={props} />
            <FormMessage className="shad-error" />
          </FormItem>
        )}
      />
    </>
  );
};

export default CustomFormField;
