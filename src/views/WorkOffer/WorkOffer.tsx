import { useParams } from 'react-router-dom';
import { Avatar, Backdrop, Box, Button, Card, IconButton, Pagination, Rating, TextField, Typography } from '@mui/material';
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
import { reviewOffer } from '../../functions/reviewOffer';
import { useQuery } from 'react-query';
import { getOfferApplications } from '../../functions/getOfferApplications';
import { Document } from 'react-pdf';
import { getResume } from '../../functions/getResume';
import { reviewStudent } from '../../functions/reviewStudent';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { rejectApplication } from '../../functions/rejectApplication';
import { acceptApplication } from '../../functions/acceptApplication';

const WorkOffer = () => {
  const [offer, setOffer] = useState<WorkOfferData>(emptyOffer);
  const [CV, setCV] = useState<string>('');
  const [currentApplication, setCurrentApplication] = useState<string>('');
  const [applicationsPage, setApplicationsPage] = useState<number>(1);
  
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
    if (offer.applicationId) await withdrawFromOffer(offer.applicationId);
  };

  const rate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const reviewData = {
      id: store.userType === UserType.Student ? offer.id : currentApplication || '',
      title: data.get('title')?.toString() || '',
      message: data.get('message')?.toString() || '',
      rating: Number(data.get('rating')?.toString()) || 0
    };
    if (store.userType === UserType.Student) {
      await reviewOffer(reviewData);
    } else {
      await reviewStudent(reviewData);
    }
  };

  const { data: applicationsData } = store.userType === UserType.Company ? useQuery({
    queryKey: ['offerApplications', applicationsPage, offer.id],
    queryFn: () => getOfferApplications({ id: offer.id, page: applicationsPage }),
    keepPreviousData : true
  }) : { data: [] };

  const findCV = async (studentId: string, applicationId: string) => {
    const data = await getResume(studentId);
    setCV(data.resume);
    setCurrentApplication(applicationId);
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
              <Typography id="offerCompanyDesc" color="text.secondary">
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

        {offer.created && applicationsData?.items && applicationsData.items.length > 0 && (
          <div>
            <Typography variant="h6" gutterBottom>Aplikacje:</Typography>
            {applicationsData.items.map((item: any) => (
                <Card 
                  key={item.id}
                  id="applicationsCard"
                  sx={{ boxShadow: 10 }} 
                  onClick={() => findCV(item.studentId, item.status === 'Closed' ? item.id : '')}
                >
                <Typography noWrap alignSelf='center'>{item.message} ({item.status})</Typography>
                <IconButton onClick={async () => { await rejectApplication(item.id) }}>
                  <CloseIcon />
                </IconButton>
                {item.status === 'Submitted' && (
                  <IconButton onClick={async () => { await acceptApplication(item.id) }}>
                    <DoneIcon />
                  </IconButton>
                )}
                </Card>
            ))}
            <Box sx={{ display: 'flex', margin: '20px' }}>
            <Pagination 
              count={applicationsData?.metaData?.pageCount ?? 1}
              page={applicationsPage}
              color="primary"
              sx={{ margin: 'auto' }} 
              onChange={(_, page) => setApplicationsPage(page)}
            />
            </Box>
            {CV && CV !== null ? (
              <Document file={CV} />

            ) : 
              (CV === null 
                ? <Typography gutterBottom>Nie znaleziono CV</Typography>
                : <Typography gutterBottom>Wybierz CV z listy</Typography>)
            }
          </div>
        )}

        {(offer.applied && store.userType === UserType.Student) || 
          (CV && CV !== null && offer.created && currentApplication) && (
          <div>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }} onSubmit={rate}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TextField
                  name="title"
                  className='regFormField'
                  label='Tytuł'
                  sx={{ width: '70%' }}
                />
                <Rating 
                  name="rating"
                  size="large"
                  precision={0.5}
                  sx={{ width: '20%' }}
                />
              </Box>
              <TextField
                rows={5}
                multiline
                name="message"
                className='regFormField'
                label={offer.created ? 'Opinia o studencie' : 'Opinia o pracodawcy'}
                sx={{ width: '90%', alignSelf: 'center' }}
              />
              <Button 
                type="submit"
                variant="contained"
                sx={{ width: '30%', alignSelf: 'center', borderRadius: 10 }}
              >
                {offer.created ? 'Oceń studenta' : 'Oceń pracodawcę'}
              </Button>
            </Box>
          </div>
        )}

        {(offer.applied && store.userType === UserType.Student) && (
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
        )}

        {!offer.applied && store.userType === UserType.Student && (
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
