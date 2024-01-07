'use client';
import ContentBox from '@/components/layout/ContentBox';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';

//패칭해야함
const data = [
  { label: '와인', category_idx: 1, total: 10 },
  { label: '안주', category_idx: 2, total: 10 },
  { label: '위스키', category_idx: 3, total: 10 },
  { label: '데킬라', category_idx: 4, total: 10 },
  { label: '와인', category_idx: 5, total: 10 },
];

const MenuWrite = () => {
  const [openValues, setOpenValues] = useState<boolean>(false);

  return (
    <Box sx={{ width: '100%', padding: { xs: '30px 20px', sm: '30px 50px' } }}>
      <ContentBox>
        <List component="ul" sx={{ fontSize: '16px', padding: '10px 0' }}>
          <Box component="li" sx={{ marginBottom: '10px' }}>
            <ListItemButton
              sx={{
                gap: '10px',
                fontWeight: '600',
                whiteSpace: 'nowrap',
              }}
              onClick={() => setOpenValues((cur) => !cur)}
            >
              1뎁스
              {openValues ? (
                <ExpandLess sx={{ flex: '0.5', justifySelf: 'right' }} />
              ) : (
                <ExpandMore sx={{ flex: '0.5', justifySelf: 'right' }} />
              )}
            </ListItemButton>
            <Collapse in={openValues || false} timeout="auto" unmountOnExit>
              <List
                component="ul"
                sx={{
                  position: 'relative',
                  width: '100%',
                  margin: 'auto',
                  padding: '0 0 20px 25px',
                }}
              >
                <ListItemButton dense component="li" sx={{ whiteSpace: 'nowrap' }}>
                  두번째 뎁
                </ListItemButton>
              </List>
            </Collapse>
          </Box>
        </List>
      </ContentBox>
    </Box>
  );
};

export default MenuWrite;
