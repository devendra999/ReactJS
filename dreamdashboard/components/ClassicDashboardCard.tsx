import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  Divider,
  Box,
  CardActions,
  Table,
} from "@mui/material";
import Image from "next/image";

interface ClassicDashboardCardProps {
  cardSectionTitle: string | any[];
  kpiList: any;
  cardIcon: string;
  seeMore: any;
}

export const ClassicDashboardCard: React.FC<ClassicDashboardCardProps> = (
  props
) => {

  return (
    <Card className="dashboard-item">
      <CardContent className="content">
        <Box className="flex items-center justify-between">
          <Typography variant="h5">{props.cardSectionTitle}</Typography>
          <Image
            src={"/assets/icons/" + props.cardIcon + ".png"}
            alt={props.cardIcon}
            width={"50"}
            height={"50"}
            className="icon-img"
            unoptimized
          />
        </Box>
        <Divider className="divider" />
        <Table className="list-view tableScroll">{props.kpiList}</Table>
      </CardContent>
      <CardActions className="seeMoreContainer">{props.seeMore}</CardActions>
    </Card>
  );
};

export default ClassicDashboardCard;
