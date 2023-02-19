import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FilledInput from '@mui/material/FilledInput';
import ForwardIcon from '@mui/icons-material/Forward';
import { useState } from 'react';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WorkOfferCard from '../../components/WorkOfferCard';
import { UserType, useStore } from '../../stores/store';
import { getOffers } from '../../functions/getOffers';
import './HomeView.css';
import strings from '../../const/strings';
import { useQuery } from 'react-query';

const Home = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>('');

  const store = useStore();
  const navigate = useNavigate();

  const { data, refetch } = useQuery({
    queryKey: ['offers', page],
    queryFn: () => getOffers({ page, keywords: searchText }),
    keepPreviousData : true
  });

  const searchOffers = () => {
    refetch();
    setPage(1);
  };

  return (
    <Box sx={{ 
      width: '100%',
      height: '100%'
    }}>
      <Box id="rootBox">
        <Card id="card" sx={{ boxShadow: 10 }}>
          <CardContent id="cardContent">
            <FilledInput
              name="searchPhrase"
              type="search"
              fullWidth
              id="searchPhrase"
              placeholder="Stanowisko, firma, słowo kluczowe"
              disableUnderline
              className='leftInputSide rightInputSide'
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
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
        {store.userType != UserType.Student && (
          <Box textAlign="center">
            <Button 
              size="large"
              id="addOffer"
              color="inherit"
              variant="contained"
              endIcon={<ForwardIcon />}
              onClick={() => navigate('/add-offer')}
            >
              {strings.homeView.addOffer}
            </Button>
          </Box>
        )}
        {data?.items && data.items.map((item: any) => <WorkOfferCard key={item.id} offer={item} />) }
        <Box sx={{ display: 'flex', margin: '20px' }}>
          <Pagination 
            count={data?.metaData?.pageCount ?? 1}
            page={page}
            color="primary"
            sx={{ margin: 'auto' }} 
            onChange={(_, page) => setPage(page)}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Home
