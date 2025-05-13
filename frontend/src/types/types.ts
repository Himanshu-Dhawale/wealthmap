import { loginSchema } from "@/schema/loginSchema";
import { signupSchema } from "@/schema/signupSchema";
import { ReactElement } from "react";
import { z } from "zod";

export type IFeatures = {
  title: string;
  description: string;
  icon: ReactElement;
};

export interface Testimonial {
  name: string;
  quote: string;
  title: string;
  avatar: string;
  rating: number;
}

export interface ISteps {
  number: number;
  title: string;
  description: string;
}

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;