import { useRef, useState } from 'react';
import axios from 'axios';

import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import editOutline from '@iconify/icons-eva/edit-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/styles';
// material
import {
  TextField,
  Select,
  Button,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    overflowY: 'auto',
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

export default function UserMoreMenu({
  idUser,
  nameUser,
  usernameUser,
  emailUser,
  passwordUser,
  sendInformation
}) {
  const classes = useStyles();

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const [name, setName] = useState(nameUser);
  const [username, setUsername] = useState(usernameUser);
  const [email, setEmail] = useState(emailUser);
  const [password, setPassword] = useState(passwordUser);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const deleteUser = () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/user/${idUser}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
        }
      })
      .then((value) => {
        console.log('Delete User success !');
        sendInformation(value);
      })
      .catch(() => {});
  };

  const modifyUser = () => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/user/${idUser}`,
        {
          name,
          username,
          email,
          password
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
          }
        }
      )
      .then((value) => {
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
          overflow-y="scroll"
          className={classes.modal}
          max-width="calc(100vw - 2rem)"
          max-height="calc(100vh - 2rem)"
          position="relative"
          border="1px solid #ccc"
          border-radius="0.3rem"
          flexGrow="1"
          height="100%"
          // overflow="hidden"
          open={openModal}
          onClose={handleClose}
        >
          <div className={classes.paper}>
            <h2 id="simple-modal-title">Editer un user</h2>
            <TextField
              label="Saisissez le nom de user"
              variant="outlined"
              style={{ marginTop: 20, marginBottom: 20 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Saisissez le username du user"
              variant="outlined"
              style={{ marginTop: 20, marginBottom: 20 }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Saisissez l'email du user"
              variant="outlined"
              style={{ marginTop: 20, marginBottom: 20 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Saisissez le password du user"
              variant="outlined"
              style={{ marginTop: 20, marginBottom: 20 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <Select
              value={2}
              style={{ marginTop: 20, marginBottom: 40 }}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={2}>User</MenuItem>
            </Select> */}
            <Button onClick={() => modifyUser()} variant="contained">
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
        <MenuItem sx={{ color: 'red' }} onClick={() => deleteUser()}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Supprimer" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem sx={{ color: 'blue' }} onClick={() => handleOpen()}>
          <ListItemIcon>
            <Icon icon={editOutline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Modifier" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
