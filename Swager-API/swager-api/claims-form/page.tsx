"use client";
import React, { useEffect, useState } from "react";
import { useGetOneBaseClaimsControllerClaims } from "../../../backend/backendComponents";
import { useSearchParams } from "next/navigation";
import ManageClaim from "../components/manage-claim-component";

interface ClaimFormProps {
  isEdit: boolean;
  initialClaimData: any;
}

const ClaimForm: React.FC<ClaimFormProps> = () => {
  const [isEdit, setIsEdit] = useState(false);
  const searchParams = useSearchParams();
  const [editUserId, setEditUserId] = useState(searchParams?.get("id"));

  const {
    data: claimDetails,
    refetch: refetchClaimDetails,
    isLoading,
  } = useGetOneBaseClaimsControllerClaims(
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
        await refetchClaimDetails();
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    if (editUserId && editUserId !== null) {
      setIsEdit(true);
      fetchData();
    }
  }, [editUserId, refetchClaimDetails]);

  return (
    <>
      {!isLoading && isEdit && (
        <ManageClaim
          isEdit={isEdit}
          initialClaimData={claimDetails || null}
          refetchClaimDetails={refetchClaimDetails}
        />
      )}
      {!isEdit && (
        <ManageClaim
          isEdit={isEdit}
          initialClaimData={null}
          refetchClaimDetails={refetchClaimDetails}
        />
      )}
    </>
  );
};
export default ClaimForm;
