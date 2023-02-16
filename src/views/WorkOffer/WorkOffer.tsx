import { useParams } from 'react-router-dom';
import { Avatar, Backdrop, Box, Button, Card, TextField, Typography } from '@mui/material';
import { toDateTime } from '../../utils/timeConverter';
import './WorkOffer.css';
import strings from '../../const/strings';
import { useCallback, useEffect, useState } from 'react';
import { getOffer } from '../../functions/getOffer';
import { WorkOfferData } from '../../const/types.const';
import { emptyOffer } from '../../const/offers.const';
import { applyForOffer } from '../../functions/applyForOffer';
import { UserType, useStore } from '../../stores/store';
import { withdrawFromOffer } from '../../functions/withdrawFromOffer';
import { imgDefault } from '../../const/profileForm.const';

const WorkOffer = () => {
  const [offer, setOffer] = useState<WorkOfferData>(emptyOffer);
  
  const store = useStore();
  let { offerId } = useParams();

  const getOfferData = useCallback(async () => {
    const data = await getOffer(offerId || '');
    if (data) setOffer(data);
  }, []);

  useEffect(() => {
    getOfferData();
  }, []);

  const apply = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const applyData = {
      id: offer.id,
      message: data.get('message')?.toString() || '',
    };
    await applyForOffer(applyData);
  };

  const withdraw = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await withdrawFromOffer(offer.id);
  };

  const startingHour = offer.workingHours ? new Date(offer.workingHours[0]?.start).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }) : '';
  const endingHour = offer.workingHours ? new Date(offer.workingHours[0]?.end).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }) : '';

  const isCompany = store.userType === UserType.Company;

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
                {offer.company?.name}
              </Typography> 
              <Typography id="companyDesc" color="text.secondary">
                {offer.address?.city}, {offer.address?.region}, {offer.address?.country}
              </Typography> 
            </Box>
            <Avatar
              id="companyLogo"
              src={imgDefault}
              alt="The company's logo."
              sx={{ marginLeft: '10px', maxWidth: '40%' }}
            />
          </Box>
        </Box>
        <Box sx={{ height: '100%' }}>
          <Typography gutterBottom>
            {strings.workOffer.position} {offer.role}
          </Typography>
          <Typography gutterBottom>
            {`${strings.workOffer.rate} ${offer.payRange?.min} - ${offer.payRange?.max} zł/h`}
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
        {offer.applied ? (
          <div>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }} onSubmit={withdraw}>
              <Button 
                type="submit"
                variant="contained"
                disabled={isCompany}
                sx={{ width: '30%', alignSelf: 'center', borderRadius: 10 }}
              >
                Oceń pracodawcę
              </Button>
            </Box>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }} onSubmit={withdraw}>
              <Button 
                type="submit"
                variant="contained"
                disabled={isCompany}
                sx={{ width: '30%', alignSelf: 'center', borderRadius: 10 }}
              >
                {strings.workOffer.withdrawApplication}
              </Button>
            </Box>
          </div>
        ) : (
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }} onSubmit={apply}>
            <TextField
              rows={5}
              multiline
              name="message"
              disabled={isCompany}
              className='regFormField'
              label='Wiadomość dla rekrutera'
              sx={{ width: '90%', alignSelf: 'center' }}
            />
            <Button 
              type="submit"
              variant="contained"
              disabled={isCompany}
              sx={{ width: '20%', alignSelf: 'center', borderRadius: 10 }}
            >
              {strings.workOffer.sendApplication}
            </Button>
          </Box>
        )}
        <Box sx={{ height: '5%' }} className="flexRow" id="footnote">
          <div />
          <Typography color="text.secondary">
            {toDateTime(new Date(offer.creationDate).getTime() / 1000)}
          </Typography> 
        </Box>
      </Card>
    </Backdrop>
  )
}

export default WorkOffer
