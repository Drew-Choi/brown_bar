'use client';
import { COLORS } from '@/asset/style';
import Empty from '@/components/Empty';
import ButtonNomal from '@/components/buttons/ButtonNomal';
import ContentBox from '@/components/layout/ContentBox';
import { USE_MUTATE_POINT, USE_QUERY_POINT } from '@/constant/END_POINT';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import { usePopup } from '@/hook/usePopup/usePopup';
import { useMutationInstance } from '@/react-query/useMutationInstance';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React from 'react';

const Settings = () => {
  const { openPopup } = usePopup();

  const {
    data: { data: memberList } = { data: [] },
    isError,
    refetch,
  } = useQueryInstance<{
    data: MemberType[];
  }>({
    queryKey: [QUERY_KEY.MEMBER_LIST],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.MEMBER,
  });

  const { mutate: memberEditAPI } = useMutationInstance<
    undefined,
    undefined,
    { id: string; is_admin: boolean }
  >({
    apiMethod: 'post',
    apiEndPoint: USE_MUTATE_POINT.MEMBER_EDIT,
    onErrorFn: (err: any) => {
      console.error(err);
      if (err.response.status === 400)
        return openPopup({ title: '오류', content: err.response.data.message });
      openPopup({ title: '오류', content: '다시 시도해주세요.' });
    },
    onSuccessFn: () => {
      refetch();
    },
  });

  if (isError) return <Box color="text.secondary">Fetching Error</Box>;

  return (
    <Box sx={{ width: '100%', padding: { xs: '40px 20px', sm: '40px 50px' } }}>
      <ContentBox sx={{ padding: '20px' }}>
        <Grid
          container
          color={COLORS.info}
          sx={{ fontSize: { xs: '14px', sm: '15px' }, marginBottom: '10px' }}
        >
          <Grid xs={3} display="flex" alignItems="center" justifyContent="center" sx={{}}>
            프로필사진
          </Grid>
          <Grid xs={3} display="flex" alignItems="center" justifyContent="center">
            닉네임
          </Grid>
          <Grid xs={3} display="flex" alignItems="center" justifyContent="center">
            관리자여부
          </Grid>
          <Grid xs={3} display="flex" alignItems="center" justifyContent="center">
            권한변경
          </Grid>
        </Grid>
        <Grid
          container
          color="text.secondary"
          sx={{ fontSize: { xs: '14px', sm: '16px' }, marginBottom: '10px' }}
        >
          {memberList?.length === 0 ? (
            <Empty title="맴버가 없습니다." />
          ) : (
            memberList.map((el) => (
              <React.Fragment key={el.id}>
                <Grid xs={3} display="flex" alignItems="center" justifyContent="center">
                  <Image
                    priority
                    style={{ borderRadius: '10px' }}
                    src={String(el?.profile_img)}
                    width={80}
                    height={80}
                    alt="회원프로필사진"
                  />
                </Grid>
                <Grid xs={3} display="flex" alignItems="center" justifyContent="center">
                  <Typography sx={{ fontSize: 'inherit', wordBreak: 'break-all' }}>
                    {el.nick_name}
                  </Typography>
                </Grid>
                <Grid
                  xs={3}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ fontSize: '18px', fontWeight: '600' }}
                >
                  {!el.is_admin ? 'X' : 'O'}
                </Grid>
                <Grid xs={3} display="flex" alignItems="center" justifyContent="center">
                  <ButtonNomal
                    sx={{ padding: '0', fontSize: { xs: '14px', sm: '16px' }, fontWeight: '600' }}
                    onClickEvent={() =>
                      openPopup({
                        title: '안내',
                        content: '권한을 정말 변경하시겠습니까?',
                        onConfirm: () =>
                          memberEditAPI({ apiBody: { id: el.id, is_admin: !el.is_admin } }),
                      })
                    }
                  >
                    변경
                  </ButtonNomal>
                </Grid>
              </React.Fragment>
            ))
          )}
        </Grid>
      </ContentBox>
    </Box>
  );
};

export default Settings;
