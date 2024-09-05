"use client";
import React, { useEffect, useState } from "react";
import SidebarWithLayout from "../../layout-with-sidebar";
import { 
  // useGetOneBaseModelControllerModel ,
  useModelControllerAllModelGetByIdForCrud } from "../../../backend/backendComponents";
import { useSearchParams } from "next/navigation";
import ManageModel from "../components/manage-model-component";

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
  } = useModelControllerAllModelGetByIdForCrud(
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
          <ManageModel
            isEdit={isEdit}
            initialUserData={userDetails?.data || null}
            refetchUserDetails={refetchUserDetails}
          />
        )}
        {!isEdit && (
          <ManageModel
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

