"use client";
import React, { useEffect, useState } from "react";
import SidebarWithLayout from "../../layout-with-sidebar";
import { useGetOneBaseRolesControllerRoles, useRolesControllerAllRolesGetByIdForCrud } from "../../../backend/backendComponents";
import { useSearchParams } from "next/navigation";
import ManageRole from "../components/manage-roles-component";

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
  } = useRolesControllerAllRolesGetByIdForCrud(
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
          <ManageRole
            isEdit={isEdit}
            initialUserData={userDetails?.data || null}
            refetchUserDetails={refetchUserDetails}
          />
        )}
        {!isEdit && (
          <ManageRole
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

