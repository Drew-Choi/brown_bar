import List from '@mui/material/List';
import Box from '@mui/material/Box';
import React, { KeyboardEvent, ReactNode } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import { COLORS } from '@/asset/style';
import Typography from '@mui/material/Typography';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import InputText from '@/components/inputs/InputText';
import { FaRegEdit } from 'react-icons/fa';
import { GiConfirmed } from 'react-icons/gi';
import { SxProps } from '@mui/material';

interface CollapseBarMapProps {
  // 하위메뉴는 children으로 받음
  children: ReactNode;
  onClickEditMode?: () => void;
  onClickRemove?: () => void;
  onEdit?: boolean;
  openCollapseValue: boolean;
  onClickCollapse: () => void;
  title: string;
  editModeTitle?: string;
  editInputRef: (dom: HTMLInputElement | null) => void;
  onClickEditConfirm: () => void;
  onKeyDownEditConfirm: (e: KeyboardEvent<HTMLInputElement>) => void;
  sxBar?: SxProps;
  sxTitle?: SxProps;
  onClickPluse?: () => void;
  btnSubText?: string;
  inputLabelSx?: SxProps;
  inputConSx?: SxProps;
  inputTextSx?: SxProps;
  labelColor?: 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning';
  inputColor?: 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning';
  inputlabelFocused?: boolean;
}

const CollapseBarMap = ({
  children,
  onClickEditMode,
  onClickRemove,
  onEdit = false,
  openCollapseValue,
  onClickCollapse,
  title,
  editModeTitle = '수정 중',
  editInputRef,
  onClickEditConfirm,
  onKeyDownEditConfirm,
  sxBar,
  sxTitle,
  onClickPluse,
  btnSubText = '',
  inputLabelSx,
  inputConSx,
  inputTextSx,
  labelColor,
  inputColor,
  inputlabelFocused = true,
}: CollapseBarMapProps) => {
  return (
    <List
      component="ul"
      sx={{
        width: '100%',
        fontSize: '16px',
        padding: '10px 0',
        marginBottom: '0px',
      }}
    >
      <Box component="li" sx={{ marginBottom: '10px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '10px',
          }}
        >
          <FaRegEdit
            color={COLORS.text.secondary}
            size={25}
            style={{ cursor: 'pointer' }}
            onClick={onClickEditMode}
          />
          {!onEdit && (
            <>
              <FaMinus
                size={20}
                color={COLORS.text.secondary}
                style={{ cursor: 'pointer' }}
                onClick={onClickRemove}
              />
              {onClickPluse && (
                <FaPlus
                  size={20}
                  color={COLORS.text.secondary}
                  style={{ cursor: 'pointer' }}
                  onClick={onClickPluse}
                />
              )}
            </>
          )}
        </Box>
        {btnSubText && (
          <Typography sx={{ color: 'text.secondary', fontSize: '14px', textAlign: 'right' }}>
            {btnSubText}
          </Typography>
        )}

        <ListItemButton
          sx={{
            gap: '10px',
            justifyContent: 'space-between',
            fontWeight: '600',
            bgcolor: COLORS.primary,
            borderRadius: '10px',
            cursor: !onEdit ? 'pointer' : 'default',
            ...sxBar,
          }}
          selected={openCollapseValue || false}
          onClick={onClickCollapse}
        >
          {!onEdit ? (
            <Typography
              sx={{
                flex: '9',
                fontWeight: '600',
                fontSize: '16px',
                color: 'text.secondary',
                ...sxTitle,
              }}
            >
              {title}
            </Typography>
          ) : (
            <InputText
              labelFocused={inputlabelFocused}
              labelColor={labelColor}
              inputColor={inputColor}
              labelSx={{ ...inputLabelSx }}
              conSx={{ ...inputConSx }}
              title={editModeTitle}
              textSx={{
                color: 'text.secondary',
                fontSize: '16px',
                fontWeight: '600',
                ...inputTextSx,
              }}
              defaultValue={title}
              ref={editInputRef}
              onKeyUp={onKeyDownEditConfirm}
            />
          )}

          {openCollapseValue && !onEdit ? (
            <ExpandLess sx={{ flex: '1', justifySelf: 'right' }} />
          ) : !openCollapseValue && !onEdit ? (
            <ExpandMore sx={{ flex: '1', justifySelf: 'right' }} />
          ) : (
            <GiConfirmed
              size={30}
              color={COLORS.text.secondary}
              style={{ cursor: 'pointer', zindex: '10' }}
              onClick={onClickEditConfirm}
            />
          )}
        </ListItemButton>
        <Collapse
          sx={{
            bgcolor: COLORS.info,
            width: '95%',
            margin: 'auto',
            borderRadius: '0 0 10px 10px',
          }}
          in={openCollapseValue || false}
          timeout="auto"
          unmountOnExit
        >
          {children}
        </Collapse>
      </Box>
    </List>
  );
};

export default React.memo(CollapseBarMap);
