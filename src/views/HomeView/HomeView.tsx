import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FilledInput from '@mui/material/FilledInput';
import './HomeView.css';
import WorkOffer, { WorkOfferData } from '../../components/WorkOffer/WorkOffer';
import Header from '../../components/Header/Header';
import { useStore } from '../../stores/store';

const Home = () => {
  const store = useStore();

  const testOffer: WorkOfferData = {
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
      <Header />
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
              Szukaj
            </Button>
          </CardActions>
        </Card>
        <WorkOffer offer={testOffer} />
      </Box>
    </Box>
  )
}

export default Home
