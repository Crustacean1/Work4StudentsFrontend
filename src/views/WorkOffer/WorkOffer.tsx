import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Avatar, Backdrop, Box, Button, Card, CircularProgress, 
  IconButton, Pagination, Rating, TextField, Typography } from '@mui/material';
import strings from '../../const/strings';
import PDFViewer from '../../components/PDFViewer';
import { getImage } from '../../functions/getImage';
import { getOffer } from '../../functions/getOffer';
import { getResume } from '../../functions/getResume';
import { emptyOffer } from '../../const/offers.const';
import { toDateTime } from '../../utils/timeConverter';
import { UserType, useStore } from '../../stores/store';
import { reviewOffer } from '../../functions/reviewOffer';
import { imgDefault } from '../../const/profileForm.const';
import { applyForOffer } from '../../functions/applyForOffer';
import { reviewStudent } from '../../functions/reviewStudent';
import { DaysOfWeek, WorkOfferData } from '../../const/types.const';
import { acceptApplication } from '../../functions/acceptApplication';
import { rejectApplication } from '../../functions/rejectApplication';
import { withdrawFromOffer } from '../../functions/withdrawFromOffer';
import { getOfferApplications } from '../../functions/getOfferApplications';
import './WorkOffer.css';
import { deleteOffer } from '../../functions/deleteOffer';

const WorkOffer = () => {
  const [offer, setOffer] = useState<WorkOfferData>(emptyOffer);
  const [CV, setCV] = useState<string>('');
  const [offerPic, setOfferPic] = useState<string>('');
  const [currentApplication, setCurrentApplication] = useState<string>('');
  const [applicationsPage, setApplicationsPage] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  const store = useStore();
  const navigate = useNavigate();
  let { offerId } = useParams();

  const getOfferData = useCallback(async () => {
    const data = await getOffer(offerId || '');
    if (data) setOffer(data);

    const newPic = await getImage(data.company.id);
    setOfferPic(newPic.photo);
  }, []);

  useEffect(() => {
    getOfferData();
  }, []);

  const apply = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isProcessing) return;
    setIsProcessing(true);

    const data = new FormData(event.currentTarget);
    const applyData = {
      id: offer.id,
      message: data.get('message')?.toString() || '',
    };
    await applyForOffer(applyData).then(response => {
      setIsProcessing(false);
      if (!Array.isArray(response)) setOffer({ ...offer, applied: true });
    });
  };

  const withdraw = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isProcessing) return;
    setIsProcessing(true);

    if (offer.applicationId) await withdrawFromOffer(offer.applicationId).then(response => {
      setIsProcessing(false);
      if (!Array.isArray(response)) setOffer({ ...offer, applied: false });
    });
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

  const findCV = async (studentId: string, applicationId: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    const data = await getResume(studentId);
    setCV(`data:application/pdf;base64,${data.resume}`);
    setCurrentApplication(applicationId);
    setIsProcessing(false);
  };

  const rejectCV = async (id: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    await rejectApplication(id).then(_ => {
      setIsProcessing(false);
    });
  };

  const acceptCV = async (id: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    await acceptApplication(id).then(_ => {
      setIsProcessing(false);
    });
  };

  const removeOffer = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    await deleteOffer(offer.id).then(response => {
      setIsProcessing(false);
      if (!Array.isArray(response)) navigate('/admin-panel');
    });
  };

  const workingHoursElement = (el: any) => {
    return el.duration ? (
      <Typography key={el.dayOfWeek} gutterBottom>
        {DaysOfWeek[el.dayOfWeek]}: {el.startHour} - {el.startHour + el.duration}
      </Typography>
    ) : null;
  };

  const { data: applicationsData } = store.userType === UserType.Company ? useQuery({
    queryKey: ['offerApplications', applicationsPage, offer.id],
    queryFn: () => getOfferApplications({ id: offer.id, page: applicationsPage }),
    keepPreviousData : true
  }) : { data: [] };

  const isCompany = store.userType === UserType.Company;
  const isAdmin = store.userType === UserType.Admin;

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
              src={offerPic ? `data:image/jpeg;base64,${offerPic}` : imgDefault}
              alt="The company's logo."
              sx={{ marginLeft: '10px', maxWidth: '40%' }}
              onClick={() => navigate(isAdmin ? `/profile/1/${offer.company.id}` : `/profile/${offer.company.id}`)}
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
          <Typography id="offerDescTitle" gutterBottom>
            Godziny pracy:
          </Typography>
          {offer.workingHours.map((el) => workingHoursElement(el))}
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
                <Typography marginX={1} noWrap alignSelf='center'>
                  {`${item.message} (${Math.round(item.distance)} km)`} 
                </Typography>
                <Typography marginX={1} noWrap alignSelf='center'>
                  {`Status: ${item.status}`} 
                </Typography>
                <Typography marginX={1} noWrap alignSelf='center'>
                  {`Pokrycie czasowe: ${item.workTimeOverlap * 100}%`} 
                </Typography>
                {item.status === 'Submitted' && !isProcessing && (
                  <div>
                    <IconButton onClick={() => rejectCV(item.id)}>
                      <CloseIcon />
                    </IconButton>
                    <IconButton onClick={() => acceptCV(item.id)}>
                      <DoneIcon />
                    </IconButton>
                  </div>
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
              <PDFViewer url={CV} />
            ) : 
              (CV === null 
                ? <Typography gutterBottom>Nie znaleziono CV</Typography>
                : <Typography gutterBottom>{isProcessing ? 'Ładowanie...' : 'Wybierz CV z listy'}</Typography>)
            }
          </div>
        )}

        {((offer.applied && store.userType === UserType.Student) || 
          (CV && CV !== null && offer.created && currentApplication)) && (
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
              {isProcessing && <CircularProgress id="offerSpinner" size={25} color='inherit' />}
              {!isProcessing && strings.workOffer.withdrawApplication}
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
              {isProcessing && <CircularProgress id="offerSpinner" size={25} color='inherit' />}
              {!isProcessing && strings.workOffer.sendApplication}
            </Button>
          </Box>
        )}

        {isAdmin && (
          <Button 
            type="submit"
            variant="contained"
            color="error"
            sx={{ width: '30%', alignSelf: 'center', borderRadius: 10 }}
            onClick={removeOffer}
          >
            Usuń ofertę
          </Button>
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
