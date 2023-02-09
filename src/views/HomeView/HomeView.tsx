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
import { useStore } from '../../stores/store';
import { getOffers } from '../../functions/getOffers';
import { WorkOfferData } from '../../const/types.const';
import './HomeView.css';
import strings from '../../const/strings';

const Home = () => {
  const [page, setPage] = useState<number>(1);

  const store = useStore();
  const offers = getOffers({ page });
  const navigate = useNavigate();

  const testOffer: WorkOfferData = {
    id: '123',
    title: 'Test',
    description: 'Opis...',
    region: 'Warszawa, Śródmieście',
    company: {
      name: 'Firma',
      logo: 'https://spng.subpng.com/20180422/awe/kisspng-java-servlet-computer-icons-programming-language-java-5adce132b13b21.743013201524425010726.jpg',
    },
    date: 1672785010,
    isFavourite: true
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
              className='leftInputSide'
            />
            <FilledInput
              name="category"
              type="search"
              fullWidth
              id="category"
              placeholder="Kategoria"
              disableUnderline
            />
            <FilledInput
              name="type"
              type="search"
              fullWidth
              id="type"
              placeholder="Typ"
              disableUnderline
              className='rightInputSide'
            />
          </CardContent>
          <CardActions>
            <Button variant="contained" type="submit" id='searchButton'>
              {strings.homeView.search}
            </Button>
          </CardActions>
        </Card>
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
        <WorkOfferCard offer={testOffer} />
        <Box sx={{ display: 'flex', margin: '20px' }}>
          <Pagination 
            count={10}
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
