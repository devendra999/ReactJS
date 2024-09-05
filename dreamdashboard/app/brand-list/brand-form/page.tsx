"use client";
import React, { useEffect, useState } from "react";
import SidebarWithLayout from "../../layout-with-sidebar";
import { useGetOneBaseBrandControllerBrand, useBrandControllerAllBrandGetByIdForCrud } from "../../../backend/backendComponents";
import { useSearchParams } from "next/navigation";
import ManageUser from "../components/manage-brand-component";

interface UserFormProps {
  isEdit: boolean;
  initialUserData: any;
}

const UserForm: React.FC<UserFormProps> = () => {
  const [isEdit, setIsEdit] = useState(false);
  const searchParams = useSearchParams();
  const [editUserId, setEditUserId] = useState(searchParams.get("id"));

  const {
    data: userDetails,
    refetch: refetchUserDetails,
    isLoading,
  } = useBrandControllerAllBrandGetByIdForCrud(
    {
      pathParams: {
        id: editUserId as unknown as number,
      },
    },
    { enabled: false }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetchUserDetails();
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    if (editUserId && editUserId !== null) {
      setIsEdit(true);
      fetchData();
    }
  }, [editUserId, refetchUserDetails]);

  return (
    <>
      <SidebarWithLayout>
        {!isLoading && isEdit && (
          <ManageUser
            isEdit={isEdit}
            initialUserData={userDetails?.data || null}
            refetchUserDetails={refetchUserDetails}
          />
        )}
        {!isEdit && (
          <ManageUser
            isEdit={isEdit}
            initialUserData={null}
            refetchUserDetails={refetchUserDetails}
          />
        )}
      </SidebarWithLayout>
    </>
  );
};
export default UserForm;

