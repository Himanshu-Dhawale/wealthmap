import { ReactElement } from "react";

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
    number:number;
    title: string;
    description: string;
}