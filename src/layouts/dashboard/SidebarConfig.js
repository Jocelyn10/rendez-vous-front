import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import personFill from '@iconify/icons-eva/person-fill';
import awardFill from '@iconify/icons-eva/award-fill';
import compassFill from '@iconify/icons-eva/compass-fill';
import flagFill from '@iconify/icons-eva/flag-fill';
import listFill from '@iconify/icons-eva/list-fill';

import jwt from 'jsonwebtoken';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;
let sidebarConfig = null;

export default function SidebarConfig() {
  // Check User Auth
  const tokenData = localStorage.getItem('lmc_token');

  if (tokenData) {
    const user = jwt.verify(JSON.parse(tokenData), process.env.REACT_APP_JWT_KEY);

    console.log('user : ', user);

    if (!user) {
      localStorage.removeItem('lmc_token');
      sidebarConfig = [];
    } else if (user && user.role_id === 1) {
      sidebarConfig = [
        {
          title: 'dashboard',
          path: '/dashboard/app',
          icon: getIcon(pieChart2Fill)
        },
        {
          title: 'Rendez-vous PCA',
          path: '/dashboard/rendezvouspca',
          icon: getIcon(peopleFill)
        },
        {
          title: 'Rendez-vous DG',
          path: '/dashboard/rendezvousdg',
          icon: getIcon(peopleFill)
        },
        {
          title: 'Rendez-vous DGA',
          path: '/dashboard/rendezvousdga',
          icon: getIcon(peopleFill)
        },
        {
          title: 'Réception PCA',
          path: '/dashboard/rendezvouspcareception',
          icon: getIcon(peopleFill)
        },
        {
          title: 'Réception DG',
          path: '/dashboard/rendezvousdgreception',
          icon: getIcon(peopleFill)
        },
        {
          title: 'Réception DGA',
          path: '/dashboard/rendezvousdgareception',
          icon: getIcon(peopleFill)
        },
        {
          title: 'Historique PCA',
          path: '/dashboard/historicpca',
          icon: getIcon(listFill)
        },
        {
          title: 'Historique DG',
          path: '/dashboard/historique',
          icon: getIcon(listFill)
        },
        {
          title: 'historique DGA',
          path: '/dashboard/historicdga',
          icon: getIcon(listFill)
        },
        {
          title: 'Utilisateur',
          path: '/dashboard/user',
          icon: getIcon(peopleFill)
        }
      ];
    } else if (user && user.role_id === 2) {
      sidebarConfig = [
        {
          title: 'dashboard',
          path: '/dashboard/app',
          icon: getIcon(pieChart2Fill)
        },
        {
          title: 'Rendez-vous PCA Réception',
          path: '/dashboard/rendezvouspcareception',
          icon: getIcon(peopleFill)
        }
        // {
        //   title: 'Rendez-vous DG Réception',
        //   path: '/dashboard/rendezvousdgreception',
        //   icon: getIcon(peopleFill)
        // },
        // {
        //   title: 'Rendez-vous DGA Réception',
        //   path: '/dashboard/rendezvousdgareception',
        //   icon: getIcon(peopleFill)
        // }
      ];
    } else if (user && user.role_id === 3) {
      sidebarConfig = [
        {
          title: 'dashboard',
          path: '/dashboard/app',
          icon: getIcon(pieChart2Fill)
        },
        // {
        //   title: 'Rendez-vous PCA Réception',
        //   path: '/dashboard/rendezvouspcareception',
        //   icon: getIcon(peopleFill)
        // },
        {
          title: 'Rendez-vous DG Réception',
          path: '/dashboard/rendezvousdgreception',
          icon: getIcon(peopleFill)
        },
        {
          title: 'Rendez-vous DGA Réception',
          path: '/dashboard/rendezvousdgareception',
          icon: getIcon(peopleFill)
        }
      ];
    } else if (user && user.role_id === 4) {
      sidebarConfig = [
        {
          title: 'dashboard',
          path: '/dashboard/app',
          icon: getIcon(pieChart2Fill)
        },
        {
          title: 'Rendez-vous',
          path: '/dashboard/rendezvousdg',
          icon: getIcon(peopleFill)
        },
        {
          title: 'Historique',
          path: '/dashboard/historique',
          icon: getIcon(listFill)
        }
      ];
    } else if (user && user.role_id === 5) {
      sidebarConfig = [
        {
          title: 'dashboard',
          path: '/dashboard/app',
          icon: getIcon(pieChart2Fill)
        },
        {
          title: 'Rendez-vous',
          path: '/dashboard/rendezvousdga',
          icon: getIcon(peopleFill)
        },
        {
          title: 'Historique',
          path: '/dashboard/historicdga',
          icon: getIcon(listFill)
        }
      ];
    } else if (user && user.role_id === 6) {
      sidebarConfig = [
        {
          title: 'dashboard',
          path: '/dashboard/app',
          icon: getIcon(pieChart2Fill)
        },
        {
          title: 'Rendez-vous',
          path: '/dashboard/rendezvouspca',
          icon: getIcon(peopleFill)
        },
        {
          title: 'Historique',
          path: '/dashboard/historicpca',
          icon: getIcon(listFill)
        }
      ];
    } else if (user && user.role_id === 7) {
      sidebarConfig = [
        // {
        //   title: 'dashboard',
        //   path: '/dashboard/app',
        //   icon: getIcon(pieChart2Fill)
        // },
        // {
        //   title: 'Rendez-vous DG',
        //   path: '/dashboard/rendezvousdg',
        //   icon: getIcon(peopleFill)
        // },
        // {
        //   title: 'Rendez-vous DGA',
        //   path: '/dashboard/rendezvousdga',
        //   icon: getIcon(peopleFill)
        // },
        // {
        //   title: 'Historique DG',
        //   path: '/dashboard/historique',
        //   icon: getIcon(listFill)
        // },
        // {
        //   title: 'historique DGA',
        //   path: '/dashboard/historicdga',
        //   icon: getIcon(listFill)
        // },
        // {
        //   title: 'Utilisateur',
        //   path: '/dashboard/user',
        //   icon: getIcon(peopleFill)
        // }
      ];
    } else if (user && user.role_id === 8) {
      sidebarConfig = [
        {
          title: 'dashboard',
          path: '/dashboard/app',
          icon: getIcon(pieChart2Fill)
        },
        {
          title: 'Rendez-vous PCA',
          path: '/dashboard/rendezvouspca',
          icon: getIcon(peopleFill)
        },
        {
          title: 'Historique PCA',
          path: '/dashboard/historicpca',
          icon: getIcon(listFill)
        }
      ];
    } else if (user && user.role_id === 9) {
      sidebarConfig = [
        {
          title: 'dashboard',
          path: '/dashboard/app',
          icon: getIcon(pieChart2Fill)
        },
        {
          title: 'Rendez-vous DG',
          path: '/dashboard/rendezvousdg',
          icon: getIcon(peopleFill)
        },
        {
          title: 'Historique DG',
          path: '/dashboard/historique',
          icon: getIcon(listFill)
        }
      ];
    } else if (user && user.role_id === 10) {
      sidebarConfig = [
        {
          title: 'dashboard',
          path: '/dashboard/app',
          icon: getIcon(pieChart2Fill)
        },
        {
          title: 'Rendez-vous DGA',
          path: '/dashboard/rendezvousdga',
          icon: getIcon(peopleFill)
        },
        {
          title: 'historique DGA',
          path: '/dashboard/historicdga',
          icon: getIcon(listFill)
        }
      ];
    } else if (user && user.role_id === 11) {
      sidebarConfig = [
        {
          title: 'dashboard',
          path: '/dashboard/app',
          icon: getIcon(pieChart2Fill)
        },
        {
          title: 'Rendez-vous PCA',
          path: '/dashboard/rendezvouspca',
          icon: getIcon(peopleFill)
        },
        {
          title: 'Historique PCA',
          path: '/dashboard/historicpca',
          icon: getIcon(listFill)
        }
      ];
    } else if (user && user.role_id === 12) {
      sidebarConfig = [
        {
          title: 'dashboard',
          path: '/dashboard/app',
          icon: getIcon(pieChart2Fill)
        },
        {
          title: 'Rendez-vous DG',
          path: '/dashboard/rendezvousdg',
          icon: getIcon(peopleFill)
        },
        {
          title: 'Historique DG',
          path: '/dashboard/historique',
          icon: getIcon(listFill)
        }
      ];
    } else if (user && user.role_id === 13) {
      sidebarConfig = [
        {
          title: 'dashboard',
          path: '/dashboard/app',
          icon: getIcon(pieChart2Fill)
        },
        {
          title: 'Rendez-vous DGA',
          path: '/dashboard/rendezvousdga',
          icon: getIcon(peopleFill)
        },
        {
          title: 'historique DGA',
          path: '/dashboard/historicdga',
          icon: getIcon(listFill)
        }
      ];
    }
  } else {
    sidebarConfig = [];
  }

  return sidebarConfig;
}
