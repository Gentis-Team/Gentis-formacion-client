import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Checkbox from "@mui/material/Checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudentFn } from "@/api/studentsApi";
import { toast } from "react-toastify";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const newTheme = createTheme();

newTheme.typography.h3 = {
  fontSize: '2rem',
  '@media (min-width:600px)': {
    fontSize: '4rem',
  },
  [newTheme.breakpoints.up('md')]: {
    fontSize: '4rem',
  },
};

const NewStudent = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    isChecked,
  });

  const queryClient = useQueryClient();
  const { mutate: createStudent } = useMutation(
    (student) => createStudentFn(student),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["courses"]);
        toast.success("T'has apuntat correctament!");
        navigate('/')
      },
      onError: (error) => {
        if (Array.isArray(error.response.data.error)) {
          error.data.error.forEach((el) =>
            toast.error(el.message, {
              position: "top-right",
            })
          );
        } else {
          toast.error(error.response.data.message, {
            position: "top-right",
          });
        }
      },
    }
  );


  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      formValues.name !== "" &&
      formValues.surname !== "" &&
      formValues.phone !== "" &&
      formValues.email !== "" &&
      isChecked
    ) {
      createStudent(formValues);
    } else {
      setFormErrors({
        name: formValues.name === "" ? "El camp Nom és obligatori" : "",
        surname:
          formValues.surname === "" ? "El camp Cognoms és obligatori" : "",
        phone:
          formValues.phone === "" ? "El camp Telèfon és obligatori" : "",
        email: formValues.email === "" ? "El camp Email és obligatori" : "",
        check: !formValues.check ? "Has d'acceptar que ho has llegit" : "",
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    if (event.target.id === "check") {
      setIsChecked(event.target.checked);
    } else {
      setFormValues({
        ...formValues,
        [event.target.id]: event.target.value,
      });
    }
  };




  return (
    <form>
      <Box
        sx={{
          bgcolor: "white",
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid sx={{ ml: -10, color: "black" }}>
          <Typography variant="h3">Preinscriu-te</Typography>
          <Typography variant="h4">al curs</Typography>
        </Grid>
        <Grid
          sx={{
            borderRadius: "8px",
            my: 4,
            bgcolor: "#F4F8DD",
            width: 350,
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ m: 2 }}>
            <TextField
              sx={{ m: 2, width: 300, bgcolor: "white" }}
              id="name"
              label="Nom"
              InputLabelProps={{
                style: { color: "black" },
              }}
              InputProps={{ inputProps: { style: { color: "black" } } }}
              focused
              type="text"
              required
              value={formValues.name}
              onChange={handleChange}
            />
            {formErrors.name !== "" && (
              <p style={{ color: "red" }}>{formErrors.name}</p>
            )}

            <TextField
              sx={{ m: 2, width: 300, bgcolor: "white" }}
              id="surname"
              label="Cognoms"
              InputLabelProps={{
                style: { color: "black" },
              }}
              InputProps={{ inputProps: { style: { color: "black" } } }}
              focused
              required
              value={formValues.surname}
              onChange={handleChange}
            />
            {formErrors.surname !== "" && (
              <p style={{ color: "red" }}>{formErrors.surname}</p>
            )}
            <TextField
              required
              sx={{ m: 2, width: 300, bgcolor: "white" }}
              id="phone"
              label="Teléfon"
              type="number"
              InputLabelProps={{
                style: { color: "black" },
              }}
              InputProps={{ inputProps: { style: { color: "black" } } }}
              focused
              value={formValues.phone}
              onChange={handleChange}
            />
            {formErrors.phone !== "" && (
              <p style={{ color: "red" }}>{formErrors.phone}</p>
            )}
            <TextField
              sx={{ m: 2, width: 300, bgcolor: "white" }}
              id="email"
              label="Email"
              type="email"
              InputLabelProps={{
                style: { color: "black" },
              }}
              InputProps={{ inputProps: { style: { color: "black" } } }}
              focused
              required
              value={formValues.email}
              onChange={handleChange}
            />
            {formErrors.email !== "" && (
              <p style={{ color: "red" }}>{formErrors.email}</p>
            )}
          </Box>
        </Grid>
        <Box sx={{ bgcolor: "#F4F8DD", color: "black" }}>
          <Typography
            sx={{
              m: 2,
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              alignItems: "center",
            }}
            variant="h7"
          >
            En compliment del que disposa la Llei Orgànica 3/2018, de 5 de
            desembre, de protecció de dades personals i garantia dels drets
            digitals, s'informa que les dades personals i tractament dels
            mateixos té com a finalitat facilitar les actuacions de control i
            millora dels procediments de tramitació de documentació d'espanyols,
            i té un caràcter exclusivament administratiu als efectes. D'acord
            amb el que preveu la Llei orgànica esmentada, pot exercitar els seus
            drets a través  https://www.gentis.org/politica-gentis/ o dirigiendo
            escrito a la persona usuària podrà revocar el consentiment i
            exercitar els seus drets d’accés, rectificació, limitació de
            tractament, portabilitat, cancel·lació i oposició dirigint-se a
            l’adreça de correu electrònic: lopd@plataformaeducativa.org o a
            l’adreça següent:FUNDACIÓ PRIVADA GENTIS C/ GARROTXA, 7 17006 –
            GIRONA
          </Typography>
          <Box sx={{ m: 1, }}>
            <Grid sx={{
              display: "flex", flexDirection: "row",
              justifyItems: "center",
              alignItems: "center", color: 'black'
            }}>
              <Checkbox
                sx={{
                  color: "black",
                  "&.Mui-checked": {
                    color: "#BED730",
                  },
                }}
                required
                value={isChecked}
                onChange={handleChange}
                id="check"
                name="Confirmo que he leído este aviso."

              />
              <Typography variant="h7"> Confirmo que he llegit aquest avís.</Typography>
            </Grid>
            {formErrors.check !== "" && (
              <p style={{ color: "red" }}>{formErrors.check}</p>
            )}
          </Box>
        </Box>
        <Grid sx={{ my: 3 }}>
          <Button
            type="submit"
            sx={{
              width: 300,
              color: "black",
              bgcolor: "#BED730",
              borderRadius: "16px",
            }}
            variant="outlined"
            onClick={handleSubmit}
          >
            Confirma la preinscripciò
          </Button>
          <Dialog
            sx={{}}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              sx={{
                textAlign: "center",
                color: "black",
                bgcolor: "#F4F8DD",
                fontSize: "40px",
              }}
              id="alert-dialog-title"
            >
              {"T'has inscrit al curs"}
            </DialogTitle>
            <DialogContent
              sx={{
                bgcolor: "#F4F8DD",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DialogContentText
                sx={{ color: "black", fontSize: "30px" }}
                id="alert-dialog-description"
              >
                Correctament!!!
              </DialogContentText>
              <DialogContentText
                sx={{ p: 2, color: "black", fontSize: "15px" }}
                id="alert-dialog-description"
              >
                Comprova el teu correu!
              </DialogContentText>
              <MailOutlineIcon sx={{ color: "#BED730" }} />
            </DialogContent>
          </Dialog>
        </Grid>
      </Box>
    </form>
  );
};

export default NewStudent;
