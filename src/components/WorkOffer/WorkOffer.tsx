import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import './WorkOffer.css';

export interface WorkOfferData {
  title: string;
  description: string;
  region: string;
  company: {
    name: string;
    logo: string;
  }
  date: number;
  isFavourite: boolean;
}

const WorkOffer = ({ offer }: { offer: WorkOfferData }) => {
  const toDateTime = (secs: number) => {
    let time = new Date(1970, 0, 1);
    time.setSeconds(secs);
    console.log(time.getDate());
    return 'Opublikowano: ' + ('0' + time.getDate()).slice(-2) + '/'
    + ('0' + (time.getMonth()+1)).slice(-2) + '/'
    + time.getFullYear();
  };

  return (
    <Card id="workCard" sx={{ boxShadow: 10 }}>
      <CardContent id="workCardContent">
        <Typography id="offerTitle" gutterBottom>
          {offer.title}
        </Typography>
        <Typography id="offerDesc" color="text.secondary" gutterBottom>
          {offer.description}
        </Typography>
        <Box className="flexRow" id="companyInfo">
          <Avatar
            id="companyLogo"
            alt="The company's logo."
            src={offer.company.logo}
          />
          <Box>
            <Typography id="companyTitle">
              {offer.company.name}
            </Typography> 
            <Typography id="companyDesc" color="text.secondary">
              {offer.region}
            </Typography> 
          </Box>
        </Box>
        <Box className="flexRow" id="footnote">
          <Box className="flexRow">
            <FlashOnIcon />
            <Typography color="text.secondary">
              Aplikuj szybko
            </Typography> 
          </Box>
          <Typography color="text.secondary">
            {toDateTime(offer.date)}
          </Typography> 
        </Box>
      </CardContent>
      <CardActions>
        {offer.isFavourite ? <StarIcon /> : <StarOutlineIcon />}
      </CardActions>
    </Card>
  )
}

export default WorkOffer