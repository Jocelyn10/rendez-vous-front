import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TextField,
  Autocomplete
} from '@material-ui/core';

// Modal Importations
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/styles';

// components
import { Route, link } from 'react-router-dom';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead } from '../../components/_dashboard/user';
import {
  RendezvousdgMoreMenu,
  RendezvousdgListToolbar
} from '../../components/_dashboard/rendezvousdg';
import EditRendezvousdg from '../EditRendezvousdg';

import { numberValidation } from '../../utils/validate';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'fonction', label: 'Fonction', alignRight: false },
  { id: 'motif', label: 'Motif', alignRight: false },
  { id: 'categorie', label: 'Catégorie', alignRight: false },
  { id: 'phone', label: 'Téléphone', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

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
export default function Rendezvousdg() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [rendezvousdgTab, setRendezvousdgTab] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [fonctionInput, setFonctionInput] = useState('');
  const [motifInput, setMotifInput] = useState('');
  // const [categorieInput, setCategorieInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [dataChange, setDataChange] = useState(false);

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/rendezvousdg/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setRendezvousdgTab(value.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/rendezvousdg/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setRendezvousdgTab(value.data);
      })
      .catch(() => {});
  }, [dataChange]);

  /**
   * Informations for Type
   */
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

  const addRendezvousdg = (
    nameInput,
    fonctionInput,
    motifInput,
    choixInput,
    phoneInput,
    dateInput
  ) => {
    if (nameInput !== '' && nameInput !== null && motifInput !== '' && motifInput !== null)
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/rendezvousdg/`,
          {
            name: nameInput,
            fonction: fonctionInput,
            motif: motifInput,
            categorie: choixInput,
            phone: phoneInput,
            date: dateInput
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
            }
          }
        )
        .then(() => {
          isDataChange();
          handleClose();

          setNameInput('');
          setFonctionInput('');
          setMotifInput('');
          setChoixInput('');
          setPhoneInput('');
          setDateInput('');
        })
        .catch(() => {
          setNameInput('');
          setFonctionInput('');
          setMotifInput('');
          setChoixInput('');
          setPhoneInput('');
          setDateInput('');
        });
    // axios.post(
    //   `${process.env.REACT_APP_BASE_URL}/historiquedg/`,
    //   {
    //     name: nameInput,
    //     fonction: fonctionInput,
    //     motif: motifInput,
    //     categorie: choixInput,
    //     phone: phoneInput,
    //     date: dateInput
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
    //     }
    //   }
    // );
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = setRendezvousdgTab.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - setRendezvousdgTab.length) : 0;

  const filteredRendezvousdg = applySortFilter(
    rendezvousdgTab,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredRendezvousdg.length === 0;

  return (
    <Page title="Rendez-vous | LMC App">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Rendez-vous
          </Typography>
          <Button
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => handleOpen()}
          >
            Nouveau Rendez vous
          </Button>
        </Stack>

        {openModal ? (
          <Modal
            aria-describedby="simple-modal-description"
            className={classes.modal}
            open={openModal}
            onClose={handleClose}
          >
            <div className={classes.paper}>
              <h2 id="simple-modal-title">Ajouter un rendez-vous</h2>
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
                    <TextField {...params} label="Sélectionner la Catégorie" variant="outlined" />
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
              <Button
                onClick={() =>
                  addRendezvousdg(
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
                Ajouter
              </Button>
            </div>
          </Modal>
        ) : null}

        <Card>
          <RendezvousdgListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={setRendezvousdgTab.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredRendezvousdg
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, fonction, motif, categorie, phone, date } = row;
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
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {fonction}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {motif}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {categorie}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {phone}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {date}
                              </Typography>
                            </Stack>
                          </TableCell>
                          {/* <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                <Button
                                  onClick={() => EditRendezvousdg(row.id)}
                                  variant="contained"
                                  color="primary"
                                >
                                  EDIT
                                </Button>
                              </Typography>
                            </Stack>
                          </TableCell> */}
                          <TableCell align="right">
                            <RendezvousdgMoreMenu
                              idRendezvous={id}
                              sendInformation={(value) => isDataChange(value)}
                            />
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
            count={setRendezvousdgTab.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}