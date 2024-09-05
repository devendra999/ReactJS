import React, { useState } from 'react';
import { Box, Grid } from "@mui/material";
import MultipleSelectPlaceholder from "./FilterDropdown";
// import ButtonItem from "./ButtonItem";
import { FilterRuleComponent } from "./FilterRuleComponent";
import dynamic from 'next/dynamic';

const ButtonItem = dynamic(
  () => import("./ButtonItem")
);

export const FilterComponent = () => {
  const [filterRule, setFilterRule] = useState([
    <FilterRuleComponent key={0} />,
  ]);

  const handleAddFilter = (e: any) => {
    e.preventDefault();
    setFilterRule([
      ...filterRule,
      <FilterRuleComponent key={filterRule.length} />,
    ]);
  };

  return (
    <>
      <Box>
        <Grid container spacing={2} className="mb-3">
          <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
            <MultipleSelectPlaceholder
              className="dropdownComponent"
              dropdownTitle="And/Or"
              options={[
                { label: "AND", value: "and" },
                { label: "OR", value: "or" },
              ]}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={10} lg={10} xl={11}>
            {filterRule}
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={1}>
            <ButtonItem
              ButtonTitle="Add"
              type="button"
              className="containBtn mx-1 my-5"
              onClick={handleAddFilter}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
