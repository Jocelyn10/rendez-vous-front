import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import axios from 'axios';
// material
import {
  Box,
  Button,
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  Autocomplete,
  TableBody,
  TableCell,
  Container,
  TextField,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';

// Modal Importations
import Modal from '@material-ui/core/Modal';

// Modal Importations
import { makeStyles } from '@material-ui/styles';

import ReactToPrint from 'react-to-print';
import ComponentToPrintDga from './ComponentToPrintDga';

// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead } from '../../components/_dashboard/user';
import { HistoricDgaListToolbar } from '../../components/_dashboard/historicdga';
import { CheckUserAuth } from '../../utils/auth';

import './Historic.css';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nom', alignRight: false },
  { id: 'fonction', label: 'Fonction', alignRight: false },
  { id: 'motif', label: 'Motif', alignRight: false },
  { id: 'categorie', label: 'Catégorie', alignRight: false },
  { id: 'phone', label: 'Téléphone', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'confirmation', label: 'Approbation', alignRight: false },
  { id: 'heure', label: 'Heure', alignRight: false },
  { id: 'status', label: 'Statut', alignRight: false },
  { id: 'commentaire', label: 'Commentaire', alignRight: false },
  { id: 'user', label: 'Inserer par', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

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

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [historicdga, setHistoricdga] = useState([]);
  const componentRef = useRef();

  const [orderBy, setOrderBy] = useState('date');

  const [rendezvousdgTab, setRendezvousdgTab] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [fonctionInput, setFonctionInput] = useState('');
  const [motifInput, setMotifInput] = useState('');
  // const [categorieInput, setCategorieInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [heure, setHeure] = useState('');
  const [status, setStatus] = useState('');
  const [user, setUser] = useState('');
  const [dataChange, setDataChange] = useState(false);

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/rendezvousdga/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setHistoricdga(value.data);
      })
      .catch(() => {});
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = historicdga.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const isDataChange = () => {
    if (dataChange) {
      setDataChange(false);
    } else {
      setDataChange(true);
    }
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const [choixTab, setChoixTab] = useState([]);
  const [choixInput, setChoixInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/choix/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setChoixTab(value.data);
      })
      .catch(() => {});
  }, []);

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - historicdga.length) : 0;

  const isUserNotFound = historicdga.length === 0;

  return (
    <Page title="Historique | LMC App">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Historique
          </Typography>
        </Stack>

        <CheckUserAuth />

        <Card>
          <HistoricDgaListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                  rowCount={historicdga.length}
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {openModal ? (
                    <Modal
                      aria-describedby="simple-modal-description"
                      className={classes.modal}
                      open={openModal}
                      onClose={handleClose}
                    >
                      <div className={classes.paper}>
                        <h2 id="simple-modal-title">Confirmer un rendez-vous</h2>
                        <TextField
                          label="Saisissez le nom"
                          variant="outlined"
                          style={{ marginTop: 20, marginBottom: 20 }}
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                        />
                        <TextField
                          label="Saisissez la fonction"
                          variant="outlined"
                          style={{ marginTop: 20, marginBottom: 20 }}
                          value={fonctionInput}
                          onChange={(e) => setFonctionInput(e.target.value)}
                        />
                        <TextField
                          label="Saisissez le motif"
                          variant="outlined"
                          style={{ marginTop: 20, marginBottom: 20 }}
                          value={motifInput}
                          onChange={(e) => setMotifInput(e.target.value)}
                        />
                        <TextField
                          label="Saisissez le Numéro Téléphone"
                          variant="outlined"
                          style={{ marginTop: 20, marginBottom: 20 }}
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                        />
                        <div className="input-label-wrapper">
                          {/* Catégorie:{' '} */}
                          <Autocomplete
                            className="combo-box-completion"
                            options={choixTab}
                            onChange={(event, newType) => {
                              if (newType) {
                                setChoixInput(newType.name);
                              } else {
                                setChoixInput(null);
                              }
                            }}
                            getOptionLabel={(option) => option.name}
                            style={{ width: 400 }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Sélectionner la Catégorie"
                                variant="outlined"
                              />
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
                            value={dateInput}
                            onChange={(e) => {
                              setDateInput(e.target.value);
                            }}
                          />
                        </div>
                        {/* <Button
                          onClick={() =>
                            EditRendezvousdg(
                              nameInput,
                              fonctionInput,
                              motifInput,
                              choixInput,
                              phoneInput,
                              dateInput
                            )
                          }
                          variant="contained"
                          startIcon={<Icon icon={plusFill} />}
                        >
                          EDIT
                        </Button> */}
                      </div>
                    </Modal>
                  ) : null}
                  {historicdga
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        name,
                        fonction,
                        motif,
                        categorie,
                        phone,
                        date,
                        confirmation,
                        heure,
                        status,
                        commentaire,
                        user
                      } = row;

                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="right">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="right">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {fonction}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="right">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {motif}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="right">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {categorie}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="right">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {phone}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="right">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {date}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="right">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {confirmation}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="right">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {heure}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="right">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {status}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="right">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {commentaire}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="right">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {user}
                              </Typography>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={historicdga.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        {historicdga.length > 0 ? (
          <Card className="card-botton-wrapper-2">
            <Box className="box-botton-wrapper" />
            <div>
              <ReactToPrint
                // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                // to the root node of the returned component as it will be overwritten.
                trigger={() => (
                  <Button variant="contained" color="primary">
                    Imprimer
                  </Button>
                )}
                content={() => componentRef.current}
                suppressErrors
              />
              <ComponentToPrintDga ref={componentRef} rows={historicdga} />
            </div>
          </Card>
        ) : null}
      </Container>
    </Page>
  );
}
