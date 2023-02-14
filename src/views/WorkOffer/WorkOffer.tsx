import { useParams } from 'react-router-dom';
import { Avatar, Backdrop, Box, Button, Card, Typography } from '@mui/material';
import { toDateTime } from '../../utils/timeConverter';
import './WorkOffer.css';
import strings from '../../const/strings';
import { useCallback, useEffect, useState } from 'react';
import { getOffer } from '../../functions/getOffer';
import { WorkOfferData } from '../../const/types.const';
import { emptyOffer } from '../../const/offers.const';
import { applyForOffer } from '../../functions/applyForOffer';

const WorkOffer = () => {
  const [offer, setOffer] = useState<WorkOfferData>(emptyOffer);
  
  let { offerId } = useParams();

  const getOfferData = useCallback(async () => {
    const data = await getOffer(offerId || '');
    if (data.items) setOffer(data.items[0]);
  }, []);

  useEffect(() => {
    getOfferData();
  }, []);

  const apply = async () => {
    await applyForOffer(offer.id);
  };

  const startingHour = new Date(offer.workingHours[0]?.start).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const endingHour = new Date(offer.workingHours[0]?.end).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Backdrop open className="registerBackground">
      <Card id="offerCard">
        <Box sx={{ height: '15%' }} id="offerHeader">
          <Typography id="offerTitle" gutterBottom>
            {offer.title}
          </Typography>
          <Box className="flexRow">
            <Box>
              <Typography id="offerCompanyTitle">
                Oferta
              </Typography> 
              <Typography id="companyDesc" color="text.secondary">
                {offer.address.city}, {offer.address.country}
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
            {strings.workOffer.position} {offer.role}
          </Typography>
          <Typography gutterBottom>
            {`${strings.workOffer.rate} ${offer.payRange.min} - ${offer.payRange.max} zł/h`}
          </Typography>
          <Typography gutterBottom>
            Godziny pracy:
            {startingHour && endingHour ? ` ${startingHour} - ${endingHour}` : ` do uzgodnienia`}
          </Typography>
          <Typography id="offerDescTitle">
            {strings.workOffer.description}
          </Typography>
          <Typography gutterBottom>
            {offer.description}
          </Typography>
        </Box>
        <Box sx={{ height: '10%' }} textAlign='center' id="offerButton">
          <Button variant="contained" sx={{ borderRadius: 10 }} onClick={apply}>
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
