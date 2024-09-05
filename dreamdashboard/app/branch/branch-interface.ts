import { Brand } from "@root/backend/backendSchemas";

export interface BranchData {
  name?: string;
  email?: string;
  contactPerson?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  contactNumber?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: number;
  updatedBy?: number;
  brandId?: number | null;
  duplicateName?: string[];
  brand?: Brand;
}
