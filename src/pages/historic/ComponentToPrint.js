import React from 'react';
import './Historic.css';

class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toDateString()
    };
  }

  render() {
    const { rows } = this.props;
    const { date } = this.state;

    return (
      <div>
        <div className="print-source" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            className="print-source"
            src="/static/logo_lmc.JPG"
            alt="Logo"
            style={{ width: 150, height: 150 }}
          />
          <div
            className="print-source"
            style={{ textAlign: 'center', color: 'blue', flexGrow: 0.7 }}
          >
            <p style={{ fontWeight: 700, fontSize: '22px' }}>Republique Démocratique du Congo</p>
            <p style={{ fontWeight: 700, fontSize: '22px' }}>LIGNES MARITIMES CONGOLAISES, SA</p>
            <p style={{ fontWeight: 600, fontSize: '22px' }}>Armement National</p>
            <hr style={{ opacity: 1, color: 'blue', backgroundColor: 'blue', height: '3px' }} />
          </div>
        </div>
        <h3 className="print-source" style={{ textAlign: 'center' }}>
          HISTORIQUE
        </h3>
        <div
          className="print-source"
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
            marginBottom: '2rem',
            width: '100%'
          }}
        >
          <table
            className="print-source"
            style={{ width: '100%', marginBottom: '2rem', textAlign: 'left' }}
          >
            <thead>
              <th>Nom</th>
              {/* <th>Fonction</th> */}
              <th>Motif</th>
              <th>Catégorie</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Approbation</th>
              <th>Heure</th>
              <th>Statut</th>
              {/* <th>Commentaire</th> */}
              <th>Insérer par</th>
            </thead>
            <tbody style={{ width: '100%' }}>
              {rows.map((value, key, order = 'desc', ordreBy) => {
                const {
                  name,
                  // fonction,
                  motif,
                  categorie,
                  phone,
                  date,
                  confirmation,
                  heure,
                  status,
                  // commentaire,
                  user
                } = value;
                return (
                  <tr key={key} order="desc" ordreBy="date" style={{ textAlign: 'left' }}>
                    <td>{name}</td>
                    {/* <td>{fonction}</td> */}
                    <td>{motif}</td>
                    <td>{categorie}</td>
                    <td>{phone}</td>
                    <td>{date}</td>
                    <td>{confirmation}</td>
                    <td>{heure}</td>
                    <td>{status}</td>
                    {/* <td>{commentaire}</td> */}
                    <td>{user}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div
          className="print-source"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 150,
            textAlign: 'center',
            margin: '3rem 0',
            fontSize: 10
          }}
        >
          {' '}
          <hr style={{ opacity: 1 }} />
          <p style={{ color: 'blue' }}>
            Société Anonyme Unipersonnelle avec Conseil d'Administration
          </p>
          <p style={{ color: 'blue' }}>au Capital de 16.474.900.000 CDF</p>
          <p>N°RCCM CD/RCCM/14-B-3622 - ID.NAT. : 01-715-A06030E - N°IMPOT : A0700620H</p>
          <p>
            Siège Social : Immeuble LMC - AMICONGO, 6ème étage, Avenue des Aviateurs, n°13 Place de
            la Poste,
          </p>
          <p>
            Commune de la Gombe, Courrier : <a href="mailto:info@lmc.cd">info@lmc.cd</a> Site web :{' '}
            <a href="www.lmc.cd">www.lmc.cd</a>
          </p>
        </div>
      </div>
    );
  }
}

export default ComponentToPrint;
