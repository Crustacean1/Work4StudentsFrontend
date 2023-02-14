import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useNavigate } from 'react-router-dom';
import { toDateTime } from '../../utils/timeConverter';
import { WorkOfferCardData } from '../../const/types.const';
import './WorkOfferCard.css';

const WorkOfferCard = ({ offer }: { offer: WorkOfferCardData }) => {
  const navigate = useNavigate();

  return (
    <Card id="workCard" sx={{ boxShadow: 10 }} onClick={() => navigate(`/work-offer/${offer.id}`)}>
      <CardContent id="workCardContent">
        <Typography id="offerTitle" gutterBottom>
          {offer.title}
        </Typography>
        <Typography id="offerDesc" color="text.secondary" gutterBottom>
          {offer.description}
        </Typography>
        <Box className="flexRow">
          {/* <Avatar
            id="companyLogo"
            alt="The company's logo."
            src={offer.company.logo}
          /> */}
          <Box>
            <Typography id="companyTitle">
              {offer.title}
            </Typography> 
            <Typography id="companyDesc" color="text.secondary">
              {offer.address.region}
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
            {toDateTime(new Date(offer.creationDate).getTime() / 1000)}
          </Typography> 
        </Box>
      </CardContent>
      {/* <CardActions>
        {offer.isFavourite ? <StarIcon /> : <StarOutlineIcon />}
      </CardActions> */}
    </Card>
  )
}

export default WorkOfferCard