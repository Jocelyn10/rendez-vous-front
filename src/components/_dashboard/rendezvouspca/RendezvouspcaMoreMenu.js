import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import editOutline from '@iconify/icons-eva/edit-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';

// modal
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/styles';
// material

// material
import {
  Autocomplete,
  TextField,
  Select,
  Button,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

// import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

// ----------------------------------------------------------------------

export default function RendezvouspcaMoreMenu({
  idRendezvous,
  nameDg,
  fonctionDg,
  motifDg,
  categorieDg,
  phoneDg,
  DateDg,
  confirmationDg,
  heureDg,
  statusDg,
  commentaireDg,
  sendInformation
}) {
  const classes = useStyles();

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const [name, setName] = useState(nameDg);
  const [fonction, setFonction] = useState(fonctionDg);
  const [motif, setMotif] = useState(motifDg);
  const [categorie, setCategorie] = useState(categorieDg);
  const [phone, setPhone] = useState(phoneDg);
  const [date, setDate] = useState(DateDg);
  // const [confirmation, setConfirmation] = useState(confirmationDg);
  const [heure, setHeure] = useState(heureDg);
  // const [status, setStatus] = useState(statusDg);
  const [commentaire, setCommentaire] = useState(commentaireDg);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const deleteAgence = () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/rendezvouspca/${idRendezvous}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
        }
      })
      .then((value) => {
        console.log('Delete Invite success !');
        sendInformation(value);
      })
      .catch(() => {});
  };

  /**
   * Informations for Confirmation
   */

  const [confirmationTab, setConfirmationTab] = useState([]);
  // const [confirmationInput, setConfirmationInput] = useState(null);
  const [confirmation, setConfirmation] = useState(confirmationDg);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/confirmationpca/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setConfirmationTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Status
   */

  const [statusTab, setStatusTab] = useState([]);
  // const [statusInput, setStatusInput] = useState(null);
  const [status, setStatus] = useState(statusDg);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/status/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setStatusTab(value.data);
      })
      .catch(() => {});
  }, []);

  const modifyRendezvouspca = () => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/rendezvouspca/${idRendezvous}`,
        {
          name,
          fonction,
          motif,
          categorie,
          phone,
          date,
          confirmation,
          heure,
          status,
          commentaire
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
          }
        }
      )
      .then((value) => {
        console.log('Value : ', value);
        sendInformation(value.data);
        setIsOpen(false);
        handleClose();
      })
      .catch(() => {});
  };

  return (
    <>
      {openModal ? (
        <Modal
          aria-describedby="simple-modal-description"
          className={classes.modal}
          open={openModal}
          onClose={handleClose}
        >
          <div className={classes.paper}>
            <h2 id="simple-modal-title">Confirmation Rendez-vous</h2>
            <TextField
              label="Saisissez le nom de user"
              variant="outlined"
              style={{ marginTop: 5, marginBottom: 5 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* <TextField
              label="Saisissez la fonction"
              variant="outlined"
              style={{ marginTop: 5, marginBottom: 5 }}
              value={fonction}
              onChange={(e) => setFonction(e.target.value)}
            /> */}
            <TextField
              label="Saisissez le nom de user"
              variant="outlined"
              style={{ marginTop: 5, marginBottom: 5 }}
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
            />
            {/* <TextField
              label="Saisissez le nom de user"
              variant="outlined"
              style={{ marginTop: 5, marginBottom: 5 }}
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
            /> */}
            <div className="input-label-wrapper">
              {/* Catégorie:{' '} */}
              <Autocomplete
                className="combo-box-completion"
                options={confirmationTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setConfirmation(newType.name);
                  } else {
                    setConfirmation(null);
                  }
                }}
                // value={setConfirmation}
                getOptionLabel={(option) => option.name}
                style={{ marginTop: 2, marginBottom: 2 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              {/* Date:{' '} */}
              <TextField
                className="basic-input"
                // label="Saisissez la date de la derniere inspectin"
                type="date"
                variant="outlined"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              {/* Catégorie:{' '} */}
              <Autocomplete
                className="combo-box-completion"
                options={statusTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setStatus(newType.name);
                  } else {
                    setStatus(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ marginTop: 2, marginBottom: 2 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              {/* Date:{' '} */}
              <TextField
                className="basic-input"
                // label="Saisissez la date de la derniere inspectin"
                type="time"
                style={{ width: 200 }}
                variant="outlined"
                value={heure}
                onChange={(e) => {
                  setHeure(e.target.value);
                }}
              />
            </div>
            <TextField
              label="Saisissez un Commentaire"
              variant="outlined"
              style={{ marginTop: 5, marginBottom: 5 }}
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
            />
            <Button onClick={() => modifyRendezvouspca()} variant="contained">
              Sauvegarder
            </Button>
          </div>
        </Modal>
      ) : null}
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'blue' }} onClick={() => handleOpen()}>
          <ListItemIcon>
            <Icon icon={editOutline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Approbation" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem sx={{ color: 'red' }} onClick={() => deleteAgence()}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Supprimer" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
