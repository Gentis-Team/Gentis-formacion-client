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

const NewStudent = () => {
  const [open, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formValues, setFormValues] = useState({
    nom: "",
    cognoms: "",
    telefon: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({
    nom: "",
    cognoms: "",
    telefon: "",
    email: "",
    isChecked,
  });

  const handleClickOpen = () => {
    if (
      formValues.nom !== "" &&
      formValues.cognoms !== "" &&
      formValues.telefon !== "" &&
      formValues.email !== "" &&
      isChecked
    ) {
      setOpen(true);
    } else {
      setFormErrors({
        nom: formValues.nom === "" ? "El camp Nom és obligatori" : "",
        cognoms:
          formValues.cognoms === "" ? "El camp Cognoms és obligatori" : "",
        telefon:
          formValues.telefon === "" ? "El camp Telèfon és obligatori" : "",
        email: formValues.email === "" ? "El camp Email és obligatori" : "",
        check: !formValues.check ? "Debes aceptar el aviso" : "",
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
          <Typography variant="h3">Preinscru-te</Typography>
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
              id="nom"
              label="Nom"
              InputLabelProps={{
                style: { color: "black" },
              }}
              InputProps={{ inputProps: { style: { color: "black" } } }}
              focused
              type="text"
              required
              value={formValues.nom}
              onChange={handleChange}
            />
            {formErrors.nom !== "" && (
              <p style={{ color: "red" }}>{formErrors.nom}</p>
            )}

            <TextField
              sx={{ m: 2, width: 300, bgcolor: "white" }}
              id="cognoms"
              label="Cognoms"
              InputLabelProps={{
                style: { color: "black" },
              }}
              InputProps={{ inputProps: { style: { color: "black" } } }}
              focused
              required
              value={formValues.cognoms}
              onChange={handleChange}
            />
            {formErrors.cognoms !== "" && (
              <p style={{ color: "red" }}>{formErrors.cognoms}</p>
            )}
            <TextField
              required
              sx={{ m: 2, width: 300, bgcolor: "white" }}
              id="telefon"
              label="Teléfon"
              type="number"
              InputLabelProps={{
                style: { color: "black" },
              }}
              InputProps={{ inputProps: { style: { color: "black" } } }}
              focused
              value={formValues.telefon}
              onChange={handleChange}
            />
            {formErrors.telefon !== "" && (
              <p style={{ color: "red" }}>{formErrors.telefon}</p>
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
            <Grid sx={{display: "flex",flexDirection: "row",
              justifyItems: "center",
              alignItems: "center" ,color:'black'}}>
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
            <Typography variant="h7"> Confirmo que he leído este aviso.</Typography>
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
            onClick={handleClickOpen}
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
