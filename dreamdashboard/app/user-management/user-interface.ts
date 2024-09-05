import { Brand } from "@root/backend/backendSchemas";

export interface UserData {
  fullName?: string;
  username?: string;
  emailId?: string;
  contactNumber?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  password?: string;
  userId?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  branches?: number[];
  doj?: Date | null;
  dol?: Date | null;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  dateOfJoining?: Date | null;
  dateOfLeaving?: Date | null;
  createdBy?: number;
  updatedBy?: number;
  roleId?: number | null;
  brandId?: number | null;
  dealerId?: number | null;
  duplicateFullName?: string[];
  brand?: Brand;
  dealer?: Brand;
  key_cloak_id?: number | null;
}
