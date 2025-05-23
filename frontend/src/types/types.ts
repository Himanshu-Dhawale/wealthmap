import { loginSchema } from "@/schema/loginSchema";
import { onboardingSchema } from "@/schema/onboardingSchema";
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
export type OnboardingFormData = z.infer<typeof onboardingSchema>;

export type PropertyType = "residential" | "commercial" | "land" | "all";

export type Property = {
  id: string;
  title: string;
  lat: number;
  lng: number;
  price: number;
  area: number;
  address: string;
  type: PropertyType;
  owner: string;
  netWorth?: number;
  lastSoldPrice?: number;
  yearBuilt?: number;
  image?: string;
  // Add more fields as needed
};

export type MapState = {
  selectedProperty: Property | null;
  setSelectedProperty: (p: Property | null) => void;
  properties: Property[];
  setProperties: (props: Property[]) => void;
  filteredProperties: Property[];
  mapStyle: "streets" | "satellite";
  toggleMapStyle: () => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  propertyType: PropertyType;
  setPropertyType: (type: PropertyType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterProperties: () => void;
  isLoading: boolean;
};

// member types
export type Member = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
  status: "active" | "pending" | "inactive";
  joinedAt: Date;
  lastActive?: string;
  permissions?: string[];
  dataAccess?: string[];
};

export type MembersState = {
  members: Member[];
  fetchMembers: () => Promise<void>;
  addMember: (member: Omit<Member, "id" | "joinedAt" | "status">) => void;
  updateMember: (id: string, updates: Partial<Member>) => void;
  removeMember: (id: string) => void;
  inviteMember: (email: string, role: "admin" | "member") => Promise<void>;
  acceptInvitaion: (invitationId: string | null, name: string) => void;
};


export interface Report {
  id: string;
  name: string;
  address: string;
  date: string;
  status: "New" | "Reviewed";
}

