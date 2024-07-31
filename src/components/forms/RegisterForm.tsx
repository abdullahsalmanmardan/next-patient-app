"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "../ui/CustomFormField";
import { userFormValidation } from "../../lib/validation";
import { useRouter } from "next/navigation";
import SubmitButton from "../ui/SubmitButton";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";

const RegisterForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof userFormValidation>) {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };

      const user = await createUser(userData);
      // console.log("user Created successfully", user);
      // if (userData) router.push(`/patients/${user.$id}/register`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="name"
            label="full name"
            placeholder="Enter the full name...."
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
