import faker from 'faker';
import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useRef, useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { set, sub, formatDistanceToNow } from 'date-fns';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
// material
import { alpha } from '@material-ui/core/styles';
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  ListItem,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar
} from '@material-ui/core';

import axios from 'axios';
import jwt from 'jsonwebtoken';

// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      Mr(s) {notification.name}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; est en attente de confirmation de rendez-vous
      </Typography>
    </Typography>
  );

  return {
    avatar: <img alt="notification_image" src="/static/icons/ic_notification_mail.svg" />,
    title
  };
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired
};

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItem
      disableGutters
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected'
        })
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled'
            }}
          >
            <Box component={Icon} icon={clockFill} sx={{ mr: 0.5, width: 16, height: 16 }} />
            {formatDistanceToNow(new Date(notification.createdAt))}
          </Typography>
        }
      />
    </ListItem>
  );
}

export default function NotificationsPopover() {
  const notificationTab = [];
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [totalUnRead, setTotalUnRead] = useState(0);
  const [notificationArray, setNotificationArray] = useState([]);

  const navigate = useNavigate();
  const userInfo = useRef(null);

  useEffect(async () => {
    const tokenData = localStorage.getItem('lmc_token');

    if (tokenData) {
      const user = jwt.verify(JSON.parse(tokenData), process.env.REACT_APP_JWT_KEY);
      userInfo.current = user;
    }

    if (!userInfo.current) {
      localStorage.removeItem('lmc_token');
      navigate('/', { replace: true });
    }

    // For PCA
    if (userInfo.current.role_id === 1 || userInfo.current.role_id === 6) {
      const notif = await axios(`${process.env.REACT_APP_BASE_URL}/rendezvouspca/`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
        }
      });

      notificationTab.push(...notif.data);
    }

    // For DG
    if (userInfo.current.role_id === 1 || userInfo.current.role_id === 4) {
      const notif = await axios(`${process.env.REACT_APP_BASE_URL}/rendezvousdg/`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
        }
      });

      notificationTab.push(...notif.data);
    }

    // For DGA
    if (userInfo.current.role_id === 1 || userInfo.current.role_id === 5) {
      const notif = await axios(`${process.env.REACT_APP_BASE_URL}/rendezvousdga/`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
        }
      });

      notificationTab.push(...notif.data);
    }

    setTotalUnRead(
      notificationTab.filter((item) => item.confirmation == null && item.status == null).length
    );
    setNotificationArray(notificationTab);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*
  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false
      }))
    );
  };
  */

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        color={open ? 'primary' : 'default'}
        sx={{
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        <Badge badgeContent={totalUnRead > 5 ? '+5' : totalUnRead} color="error">
          <Icon icon={bellFill} width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Vous avez {totalUnRead} notifications non lue{totalUnRead > 1 ? 's' : ''}
            </Typography>
          </Box>

          {/*
          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Icon icon={doneAllFill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
          */}
        </Box>

        <Divider />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List disablePadding>
            {notificationArray.slice(0, 5).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
