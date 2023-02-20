import { Box, Button, Card, CardActions, CardContent, 
  FilledInput, Pagination } from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import strings from '../../const/strings';
import UserCard from '../../components/UserCard';
import WorkOfferCard from '../../components/WorkOfferCard';
import { getUsers } from '../../functions/getUsers';
import { getOffers } from '../../functions/getOffers';
import './AdminPanel.css';

const PAGE_SIZE = 5;

const AdminPanel = () => {
  const [offerPage, setOfferPage] = useState<number>(1);
  const [userPage, setUserPage] = useState<number>(1);
  const [searchOfferText, setSearchOfferText] = useState<string>('');
  const [searchUserText, setSearchUserText] = useState<string>('');

  const { data: offerData, refetch: offerRefetch } = useQuery({
    queryKey: ['offers', offerPage],
    queryFn: () => getOffers({ page: offerPage, keywords: searchOfferText, size: PAGE_SIZE }),
    keepPreviousData : true
  });

  const { data: userData, refetch: userRefetch } = useQuery({
    queryKey: ['users', userPage],
    queryFn: () => getUsers({ page: userPage, size: PAGE_SIZE }),
    keepPreviousData : true
  });

  const searchOffers = () => {
    offerRefetch();
    setOfferPage(1);
  };

  const searchUsers = () => {
    userRefetch();
    setUserPage(1);
  };

  return (
    <Box id="rootBox">
      <Card id="card" sx={{ boxShadow: 10 }}>
        <CardContent id="cardContent">
          <FilledInput
            name="searchPhrase"
            type="search"
            fullWidth
            id="searchPhrase"
            placeholder="Szukaj wśród ofert"
            disableUnderline
            className='leftInputSide rightInputSide'
            value={searchOfferText}
            onChange={(event) => setSearchOfferText(event.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            type="submit"
            id='searchButton'
            onClick={searchOffers}
          >
            {strings.homeView.search}
          </Button>
        </CardActions>
      </Card>
      {offerData?.items && offerData.items.map((item: any) => <WorkOfferCard key={item.id} offer={item} />) }
      <Box sx={{ display: 'flex', margin: '20px' }}>
        <Pagination 
          count={offerData?.metaData?.pageCount ?? 1}
          page={offerPage}
          color="primary"
          sx={{ margin: 'auto' }} 
          onChange={(_, page) => setOfferPage(page)}
        />
      </Box>
      <Card id="card" sx={{ boxShadow: 10 }}>
        <CardContent id="cardContent">
          <FilledInput
            name="searchPhrase"
            type="search"
            fullWidth
            id="searchPhrase"
            placeholder="Szukaj wśród użytkowników"
            disableUnderline
            className='leftInputSide rightInputSide'
            value={searchUserText}
            onChange={(event) => setSearchUserText(event.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            type="submit"
            id='searchButton'
            onClick={searchUsers}
          >
            {strings.homeView.search}
          </Button>
        </CardActions>
      </Card>
      {userData?.items && userData.items.map((item: any) => <UserCard key={item.userId} user={item} />) }
      <Box sx={{ display: 'flex', margin: '20px' }}>
        <Pagination 
          count={userData?.metaData?.pageCount ?? 1}
          page={userPage}
          color="primary"
          sx={{ margin: 'auto' }} 
          onChange={(_, page) => setUserPage(page)}
        />
      </Box>
    </Box>
  )
}

export default AdminPanel;
