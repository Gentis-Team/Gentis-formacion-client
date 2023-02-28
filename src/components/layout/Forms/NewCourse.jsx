import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import DateInput from "../Forms/inputs/DateInput";
import TimeInput from "../Forms/inputs/TimeInput";
import Checkboxe from "./inputs/Checkbox";

export default function ColorButtons() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      direction="column"
      sx={{ bgcolor: "white", p:'16px', width:'100%' }}
    >
      <Stack
        justifyContent="center"
        direction="row"
        spacing={2}
        sx={{ p: 2, m: 2,  }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: "#BED730",
            color: "black",
            borderRadius: "16px",
            width: 130,
          }}
        >
          Edita Curs
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#BED730",
            color: "black",
            "&:hover": {
              borderColor: "red",
            },
            borderRadius: "16px",
            width: 130,
          }}
        >
          Tanca
        </Button>
      </Stack>
      <List direction="column" sx={{ color: "black", width: 300 }}>
        Categoría
        <Stack sx={{ my: 1, bgcolor: "#E9F9FB", p: 2 }}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="Administració i gestió"
                control={
                  <Radio
                    sx={{
                      color: "black",
                      "&.Mui-checked": {
                        color: "#BED730",
                      },
                    }}
                  />
                }
                label="Administració i gestió"
              />
              <FormControlLabel
                value="Textil"
                control={
                  <Radio
                    sx={{
                      color: "black",
                      "&.Mui-checked": {
                        color: "#BED730",
                      },
                    }}
                  />
                }
                label="Textil"
              />
              <FormControlLabel
                value="Informatica"
                control={
                  <Radio
                    sx={{
                      color: "black",
                      "&.Mui-checked": {
                        color: "#BED730",
                      },
                    }}
                  />
                }
                label="Informatica"
              />
            </RadioGroup>
          </FormControl>
        </Stack>
      </List>
      <List sx={{ color: "black" }}>
        Codi
        <Stack sx={{ bgcolor: "#E9F9FB", alignItems: "center", my: 1 }}>
          <TextField
            placeholder="Escriu el codi del curs aquí"
            sx={{ width: 300,  }}
            id="demo-helper-text-aligned-no-helper"
            
            InputLabelProps={{
              style: { color: "black" },
            }}
            InputProps={{ inputProps: { style: { color: "black" } } }}
            focused
          />
        </Stack>
      </List>
      <List sx={{ color: "black" }}>
        Titol
        <Stack sx={{ bgcolor: "#E9F9FB", alignItems: "center", my: 2 }}>
          <TextField
            sx={{ width: 300,  }}
            id="demo-helper-text-aligned-no-helper"
            placeholder="Escriu el títol del curs aquí"
            InputLabelProps={{
              style: { color: "black" },
            }}
            InputProps={{ inputProps: { style: { color: "black" } } }}
            focused
          />
        </Stack>
      </List>
      <List sx={{ color: "black" }}>
        Seu
        <Stack
          sx={{ flexGrow: 1, my: 1, bgcolor: "#E9F9FB", my: 2, width: 300 }}
        >
          <FormControl>
            <RadioGroup
              row
              container
              spacing={2}
              columns={16}
              sx={{
                flexWrap: "wrap",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                sx={{ p: 3.7 }}
                value="Girona"
                control={
                  <Radio
                    sx={{
                      color: "black",
                      "&.Mui-checked": {
                        color: "#BED730",
                      },
                    }}
                  />
                }
                label="Girona"
              />
              <FormControlLabel
                sx={{}}
                value="Barcelona"
                control={
                  <Radio
                    sx={{
                      color: "black",
                      "&.Mui-checked": {
                        color: "#BED730",
                      },
                    }}
                  />
                }
                label="Barcelona"
              />
              <FormControlLabel
                sx={{ m: 2.4 }}
                value="Tarragona"
                control={
                  <Radio
                    sx={{
                      color: "black",
                      "&.Mui-checked": {
                        color: "#BED730",
                      },
                    }}
                  />
                }
                label="Tarragona"
              />
              <FormControlLabel
                sx={{}}
                value="Salt"
                control={
                  <Radio
                    sx={{
                      color: "black",
                      "&.Mui-checked": {
                        color: "#BED730",
                      },
                    }}
                  />
                }
                label="Salt"
              />
            </RadioGroup>
          </FormControl>
        </Stack>
      </List>
      <List sx={{ color: "black" }}>
        Hores Teoria
        <Stack sx={{ bgcolor: "#E9F9FB", alignItems: "center", my: 2 }}>
          <Stack
            direction="row"
            sx={{
              width: 300,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
             placeholder="800"
              sx={{ width: 120 }}
              id="demo-helper-text-aligned-no-helper"
              InputLabelProps={{
                style: { color: "black" },
              }}
              InputProps={{ inputProps: { style: { color: "black" } } }}
              focused
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    sx={{
                      color: "black",
                      "&.Mui-checked": {
                        color: "#BED730",
                      },
                    }}
                  />
                }
                label="Cap teoria"
              />
            </FormGroup>
          </Stack>
        </Stack>
      </List>
      <List sx={{ color: "black" }}>
        Hores pràctica
        <Stack sx={{ bgcolor: "#E9F9FB", alignItems: "center", my: 2 }}>
          <Stack
            direction="row"
            sx={{
              width: 300,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              sx={{ width: 120 }}
              id="demo-helper-text-aligned-no-helper"
              InputLabelProps={{
                style: { color: "black" },
              }}
              placeholder="800"
              InputProps={{ inputProps: { style: { color: "black" } } }}
              focused
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    sx={{
                      color: "black",
                      "&.Mui-checked": {
                        color: "#BED730",
                      },
                    }}
                  />
                }
                label="Cap pràctica"
              />
            </FormGroup>
          </Stack>
        </Stack>
      </List>
      <List sx={{ color: "black" }}>
        Data d’inici
        <Stack sx={{ bgcolor: "#E9F9FB", alignItems: "center", my: 2 }}>
          <Stack
            direction="row"
            sx={{
              width: 300,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <DateInput sxDate={{ input: { color: "black" } }} />
          </Stack>
        </Stack>
      </List>
      <List sx={{ color: "black" }}>
        Horari
        <Stack sx={{ bgcolor: "#E9F9FB", alignItems: "center", my: 2 }}>
          <Stack
            sx={{
              width: 300,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TimeInput direction="row" sxTime={{ input: { color: "black" } }} />
          </Stack>
        </Stack>
      </List>
      <List sx={{ color: "black" }}>
        Descripció
        <Stack sx={{ bgcolor: "#E9F9FB", alignItems: "center", my: 2 }}>
          <Stack
            sx={{
              width: 300,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              sx={{ width: 300,  }}
              id="demo-helper-text-aligned-no-helper"
              InputLabelProps={{
                style: { color: "black" },
              }}
              placeholder="Escriu la descripció del curs aquí."
              InputProps={{ inputProps: { style: { color: "black" } } }}
              focused
            />
          </Stack>
        </Stack>
      </List>
      <List sx={{ color: "black" }}>
        Sortides professionals
        <Stack sx={{ bgcolor: "#E9F9FB", alignItems: "center", my: 2 }}>
          <Stack
            sx={{
              
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              sx={{ width: 300,  }}
              id="demo-helper-text-aligned-no-helper"
              InputLabelProps={{
                style: { color: "black" },
              }}
              placeholder="Escriu examples de sortides professionals aquí."
              InputProps={{ inputProps: { style: { color: "black" } } }}
              focused
            />
          </Stack>
        </Stack>
      </List>
      <List sx={{ color: "black" }}>
        Requisits
        <Stack  sx={{ bgcolor: "#E9F9FB", my: 2,  alignContent:'flex-start' , p:2 }}>
          <Checkboxe variant="subtitle1" checkStile={{fontSize: '1rem'}}   name='Cap'/>
          <Checkboxe   name='Títol ESO '/>
          <Checkboxe   name='Estudis equivalents ESO'/>
          <Checkboxe   name='Certificat professionalitat 1'/>
          <Checkboxe   name='Certificat professionalitat 2'/>
          <Checkboxe   name='Prova d’accés cicles formatius de grau mitjà'/>
          <Checkboxe  checkStile={{ }}  name='Prova d’accés universitat per a més grans de 25 anys i/o 45 anys'/>
          <Checkboxe   name='Prova d’avaluació de les competències claus de nivell 2'/>
        </Stack>
      </List>
      <Stack
        justifyContent="center"
        direction="row"
        spacing={2}
        sx={{ p: 2, m: 2,  }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: "#BED730",
            color: "black",
            borderRadius: "16px",
            width: 130,
          }}
        >
          Desa
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: "red",
            color: "black",
            "&:hover": {
              borderColor: "#BED730",
            },
            borderRadius: "16px",
            width: 130,
          }}
        >
          Descarta
        </Button>
      </Stack>
    </Grid>
  );
}
