import { loginSchema } from "@/schema/loginSchema";
import { onboardingSchema } from "@/schema/onboardingSchema";
import { reportSchema } from "@/schema/reportSchema";
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
export type ReportFormData = z.infer<typeof reportSchema>;

export type PropertyType = "residential" | "commercial" | "other" | "all";

export type MailingAddress = {
  addressLine1: string;
  city: string;
  state: string;
  zipCode: string;
};

export type OwnerDetails = {
  names: string[];
  type: "Individual" | "Company" | "Trust";
  mailingAddress: MailingAddress;
  email?: string;
};

export type OwnershipHistoryEntry = {
  owner: string;
  startDate: string;
  endDate: string | null;
  purchasePrice?: number;
  salePrice?: number;
  source: string;
};

export type Transaction = {
  date: string;
  type: "Purchase" | "Sale" | "Refinance" | "Transfer";
  amount: number;
  parties: string[];
  documentNumber: string;
};

export type Property = {
  id: string;
  formattedAddress: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  zipCode: string;
  county: string;
  latitude: number;
  longitude: number;
  propertyType: PropertyType;
  price: number;
  networth: number;
  lastSoldPrice: number;
  owner: OwnerDetails;
  image: string;
  ownershipHistory: OwnershipHistoryEntry[];
  transactions: Transaction[];
  squareFootage?: number;
  yearBuilt?: number;
};

export type BookMark = {
  id: string;
  bookmarkedAt: string;
  propertyId: string;
  property: Property;
};

export type MapState = {
  bookmarks: BookMark[];
  isBookmarking: boolean;
  selectedProperty: Property | null;
  setSelectedProperty: (p: Property | null) => void;
  properties: Property[];
  filteredProperties: Property[];
  mapStyle: "streets" | "satellite";
  showBookmarks: boolean;
  toggleShowBookmarks: () => void;
  toggleMapStyle: () => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  propertyType: PropertyType;
  setPropertyType: (type: PropertyType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterProperties: () => void;
  isLoading: boolean;
  fetchProperties: () => Promise<void>;
  fetchBookmarks: () => Promise<void>;
  toggleBookmark: (propertyId: string) => Promise<void>;
};

export enum Status {
  ACTIVE = "active",
  PENDING = "pending",
  INACIVE = "inactive",
}

// member types
export type Member = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
  status: Status;
  joinedAt: Date;
  lastActive?: string;
};

export type MembersState = {
  members: Member[];
  fetchMembers: () => Promise<void>;
  addMember: (member: Omit<Member, "id" | "joinedAt" | "status">) => void;
  updateMember: (id: string, updates: Partial<Member>) => void;
  removeMember: (id: string) => Promise<void>;
  inviteMember: (email: string, role: "admin" | "member") => Promise<void>;
  acceptInvitaion: (invitationId: string | null, name: string) => void;
};

// mfa
export enum TwoFAStatus {
  DISABLED = "DISABLED",
  PENDING_VERIFICATION = "PENDING_VERIFICATION",
  ENABLED = "ENABLED",
}

export type User = {
  id: string;
  email: string;
  twoFAStatus: TwoFAStatus;
  twoFASecret?: string;
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  enable2FA: (
    id: string,
    email: string
  ) => Promise<{ secret: string } | undefined>;
  verify2FA: (code: string) => Promise<void>;
  disable2FA: () => void;
  fetch2FAStatus: () => Promise<void>;
};

export interface Report {
  id: string;
  name: string;
  address: string;
  date: string;
  status: "New" | "Reviewed";
}

export type WealthAnalysisResult = {
  name: string;
  email: string;
  totalNetWorth: number;
  confidenceLevel: "low" | "medium" | "high";
  wealthSource: string;
  lastUpdated: string;
};

export type ReportPropertyType =
  | "LUXURY_HOME"
  | "COMMERCIAL"
  | "VACATION"
  | "INVESTMENT"
  | "SPECIAL_USE";

export enum ContactStatus {
  NEW = "NEW",
  REVIEWED = "REVIEWED",
}
export enum SourceOfWealth {
  REAL_ESTATE = "REAL_ESTATE",
  INHERITANCE = "INHERITANCE",
  ENTREPRENEURSHIP = "ENTREPRENEURSHIP",
  INVESTMENTS = "INVESTMENTS",
  TECH = "TECH",
  OTHER = "OTHER",
}
export interface CreateReportResponse {
  id: string;
  message: string;
  report?: {
    id: string;
    fullName: string;
    estimatedNetWorth: number;
    primaryLocation: string;
    contactEmail: string;
    primaryIndustry: string;
    sourceOfWealth: SourceOfWealth; 
    propertyTypes: ReportPropertyType[]; 
    description: string;
    propertyDetails: string;
    confidenceScore: number;
    lastContactDate: string; 
    status: ContactStatus; 
    createdById: string;
    companyId: string;
    createdAt: string; 
    updatedAt: string;
  };
}