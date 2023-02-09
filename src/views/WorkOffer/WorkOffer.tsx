import { useParams } from 'react-router-dom';
import { Avatar, Backdrop, Box, Button, Card, Typography } from '@mui/material';
import { toDateTime } from '../../utils/timeConverter';
import './WorkOffer.css';
import strings from '../../const/strings';

const WorkOffer = () => {
  let { offerId } = useParams();

  return (
    <Backdrop open className="registerBackground">
      <Card id="offerCard">
        <Box sx={{ height: '15%' }} id="offerHeader">
          <Typography id="offerTitle" gutterBottom>
            Test
          </Typography>
          <Box className="flexRow">
            <Box>
              <Typography id="offerCompanyTitle">
                Name
              </Typography> 
              <Typography id="companyDesc" color="text.secondary">
                Warszawa, Polska
              </Typography> 
            </Box>
            <Avatar
              sx={{ marginLeft: '10px', maxWidth: '40%' }}
              id="companyLogo"
              alt="The company's logo."
              src='https://spng.subpng.com/20180422/awe/kisspng-java-servlet-computer-icons-programming-language-java-5adce132b13b21.743013201524425010726.jpg'
            />
          </Box>
        </Box>
        <Box sx={{ height: '100%' }}>
          <Typography gutterBottom>
            {strings.workOffer.position} IT
          </Typography>
          <Typography gutterBottom>
            {strings.workOffer.rate} 22 zł/h
          </Typography>
          <Typography id="offerDescTitle">
            {strings.workOffer.description}
          </Typography>
          <Typography gutterBottom>
            asdahfcuoaeshfeifhnuiaebgfaerbgfiuaebrfguvbaegfbvauirbgvirabfvgb
          </Typography>
        </Box>
        <Box sx={{ height: '10%' }} textAlign='center' id="offerButton">
          <Button variant="contained" sx={{ borderRadius: 10 }}>
            {strings.workOffer.sendApplication}
          </Button>
        </Box>
        <Box sx={{ height: '5%' }} className="flexRow" id="footnote">
          <div />
          <Typography color="text.secondary">
            {toDateTime(1000)}
          </Typography> 
        </Box>
      </Card>
    </Backdrop>
  )
}

export default WorkOffer
