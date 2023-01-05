import React, { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";

import { CompanyCard } from "./components/companyCard";
import { GetSpecialities } from "src/query/speciality";
import { GetCompanies } from "src/query/company";
import { CompanyType } from "src/types/company";
import { SpecialityType } from "src/types/speciality";

export const Home: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>(
    []
  );
  const [search, setSearch] = useState<string>("");

  const {
    isLoading: isSpecialitiesLoading,
    isError: isSpecialitiesError,
    data: specialitiesData,
  } = useQuery("specialities", GetSpecialities);
  console.log('sp:', specialitiesData);
  const {
    isLoading: isCompaniesLoading,
    isError: isCompaniesError,
    data: companiesData,
  } = useQuery("companies", GetCompanies);
  console.log('com:', companiesData);

  const specialities = useMemo(
    () =>
      specialitiesData?.data
        ? (specialitiesData.data.specialities as SpecialityType[])
        : [],
    [specialitiesData]
  );

  const companies = useMemo(
    () =>
      companiesData?.data
        ? (companiesData.data.companies as CompanyType[])
        : [],
    [companiesData]
  );

  const filteredCompanies = useMemo(
    () =>
      companies
        .filter(
          (company) =>
            !selectedSpecialities.length ||
            selectedSpecialities.includes(company.speciality)
        )
        .filter(
          (company) =>
            !search ||
            company.name.toLowerCase().includes(search.trim().toLowerCase())
        ),
    [companies, search, selectedSpecialities]
  );

  const handleChange = (
    event: SelectChangeEvent<typeof selectedSpecialities>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedSpecialities(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Box sx={{ paddingX: "16px" }}>
      <Box
        sx={{
          maxWidth: "960px",
          paddingY: "50px",
          marginX: "auto",
        }}
      >
        <Typography
          variant="h2"
          color="secondary"
          sx={{ fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}
        >
          Country List
        </Typography>
        {isCompaniesError || isSpecialitiesError ? (
          <Typography
            variant="h4"
            color="danger"
            sx={{ "&:hover": { cursor: "pointer" }, textAlign: "center" }}
            onClick={() => {
              queryClient.invalidateQueries();
            }}
          >
            Error Occured. Retry?
          </Typography>
        ) : isCompaniesLoading || isSpecialitiesLoading ? (
          <Typography variant="h4" color="primary" sx={{ textAlign: "center" }}>
            Loading...
          </Typography>
        ) : (
          <Box>
            <Box
              sx={{
                position: "sticky",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                top: "5px",
                background: "white",
                padding: "8px",
              }}
            >
              <FormControl sx={{ flexGrow: 1, marginRight: "50px" }}>
                <InputLabel
                  id="select-speciality-label"
                  sx={{
                    marginTop: "-5px",
                    "&.MuiInputLabel-shrink": { marginTop: 0 },
                  }}
                >
                  Select Specialities
                </InputLabel>
                <Select
                  labelId="select-speciality-label"
                  multiple
                  size="small"
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Select Specialities"
                      size="small"
                    />
                  }
                  value={selectedSpecialities}
                  onChange={handleChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {specialities.map((speciality) => (
                    <MenuItem key={speciality.id} value={speciality.name}>
                      {speciality.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                size="small"
                label="Search name..."
                value={search}
                onChange={handleSearch}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                marginY: "30px",
              }}
            >
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
