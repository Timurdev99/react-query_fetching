import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { CompanyType } from "src/types/company";

interface CompanyCardPropType {
  company: CompanyType;
}

export const CompanyCard: React.FC<CompanyCardPropType> = ({ company }) => {
  return (
    <Card elevation={6} sx={{ width: "300" }}>
      <CardMedia
        component="img"
        height="150"
        image="http://placekitten.com/300/150"
        alt="Country Logo"
      />
      <CardContent>
        <Typography
          variant="h6"
          color="primary"
          sx={{ textAlign: "center", marginBottom: "5px" }}
        >
          {company.name}
        </Typography>
        <Typography
          sx={{ marginBottom: "2px" }}
        >{`Speciality: ${company.speciality}`}</Typography>
        <Typography>{`City: ${company.city}`}</Typography>
      </CardContent>
    </Card>
  );
};
