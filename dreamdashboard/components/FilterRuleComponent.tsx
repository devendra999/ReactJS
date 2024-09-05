import React, { useState } from 'react';
import { Box, Grid } from "@mui/material";
import MultipleSelectPlaceholder from "./FilterDropdown";
import InputField from "./InputField";
import AddIcon from "@mui/icons-material/Add";
import ButtonItem from "./ButtonItem";

export const FilterRuleComponent = (props: any) => {
  const [filterRule, setFilterRule] = useState([
    <Box className="boxContainer mb-3" key={0}>
      <Grid container spacing={2} className="gridRightSpacing">
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
              <MultipleSelectPlaceholder
                className="dropdownComponent"
                dropdownTitle="Select Column"
                options={[
                  { label: "Select Column 1", value: "sc1" },
                  { label: "Select Column 2", value: "sc2" },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
              <MultipleSelectPlaceholder
                className="dropdownComponent"
                dropdownTitle="Select Operator"
                options={[
                  { label: "Operator 1", value: "operator1" },
                  { label: "Operator 2", value: "operator2" },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
              <InputField
                placeholder="Value"
                name="value"
                type="text"
                defaultValue=""
                className="dropdownComponent"
              />
            </Grid>
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
        </Grid>
      </Grid>
      <AddIcon className="addIcon" onClick={props.handleAddRuleFilter} />
    </Box>,
  ]);

  const handleAddRuleFilter = (e: any) => {
    e.preventDefault();
    setFilterRule([
      ...filterRule,
      <Box className="boxContainer mb-3" key={filterRule.length}>
        <Grid container spacing={2} className="gridRightSpacing">
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
                <MultipleSelectPlaceholder
                  className="dropdownComponent"
                  dropdownTitle="Select Column"
                  options={[
                    { label: "Select Column 1", value: "sc1" },
                    { label: "Select Column 2", value: "sc2" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
                <MultipleSelectPlaceholder
                  className="dropdownComponent"
                  dropdownTitle="Select Operator"
                  options={[
                    { label: "Operator 1", value: "operator1" },
                    { label: "Operator 2", value: "operator2" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
                <InputField
                  placeholder="Value"
                  name="value"
                  type="text"
                  defaultValue=""
                  className="dropdownComponent"
                />
              </Grid>
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
          </Grid>
        </Grid>
        <ButtonItem onClick={handleAddRuleFilter}>
          <AddIcon className="addIcon" />
        </ButtonItem>
      </Box>,
      //   <FilterRuleComponent key={filterRule.length} />,
    ]);
  };

  return (
    <>
      <Grid item xs={12} sm={12} md={10} lg={10} xl={12}>
        {filterRule}
      </Grid>
    </>
  );
};
