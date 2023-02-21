import LockIcon from '@mui/icons-material/Lock';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Backdrop, Box, Button, Card, CircularProgress, 
  IconButton, Pagination, Rating, Typography } from '@mui/material';
import strings from '../../const/strings';
import PDFViewer from '../../components/PDFViewer';
import { getImage } from '../../functions/getImage';
import { useAuth } from '../../contexts/AuthContext';
import { DaysOfWeek, ProfileData } from '../../const/types.const';
import { closeOffer } from '../../functions/closeOffer';
import { getProfile } from '../../functions/getProfile';
import { getReviews } from '../../functions/getReviews';
import { UserType, useStore } from '../../stores/store';
import { deleteOffer } from '../../functions/deleteOffer';
import { imgDefault } from '../../const/profileForm.const';
import { deleteAccount } from '../../functions/deleteAccount';
import { data as profileForm } from '../../const/register.const';
import { getApplications } from '../../functions/getApplications';
import { withdrawFromOffer } from '../../functions/withdrawFromOffer';
import { getRecruiterOffers } from '../../functions/getRecruiterOffers';
import './ProfileView.css';
import { deleteReview } from '../../functions/deleteReview';
import { deleteApplication } from '../../functions/deleteApplication';

const Profile = () => {
  const [applicationsPage, setApplicationsPage] = useState<number>(1);
  const [offersPage, setOffersPage] = useState<number>(1);
  const [reviewsPage, setReviewsPage] = useState<number>(1);
  const [profileData, setProfileData] = useState<ProfileData>();
  const [profilePic, setProfilePic] = useState<string>('');
  const [viewPdf, setViewPdf] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const auth = useAuth();
  const store = useStore();
  const navigate = useNavigate();
  const { id, type }: { id?: string; type?: number;} = useParams();

  const isAdmin = store.userType === UserType.Admin;
  const viewAllowance = isAdmin || !id;
  const isStudent = (type == UserType.Student && isAdmin) || store.userType === UserType.Student;
  const isCompany = (type == UserType.Company && isAdmin) || store.userType === UserType.Company;

  const profileElement = (item: { name: string[]; label: string; delimiter?: any[]; type?: UserType }) => {
    let value = '';
    item.name.map((el, index) => {
      const key = Object.keys(profileData ?? {}).findIndex(value => value === el);
      value += `${Object.values(profileData ?? {})[key]}${
        (item.delimiter && item.delimiter[index]) ? item.delimiter[index] : ''
      }
      ${(index !== item.name.length - 1) ? ' ' : ''}`
    });

    if (item.name.includes('resume') 
      && (store.userType === item.type || (isAdmin && type === item.type))) { 
        return (
        <div key={item.label}>
          <Typography variant="h6" gutterBottom>
            {item.label}:
          </Typography>
          {!viewPdf && viewPdf !== 'data:application/pdf;base64,' 
            ? <PDFViewer url={viewPdf} /> 
            : <Typography gutterBottom>Nie dodano jeszcze CV</Typography>}
        </div>
      );
    }

    return item.type === undefined || (item.type !== undefined 
      && store.userType === item.type) || (isAdmin && type === item.type) ? (
      <Typography key={item.label} variant="h6" gutterBottom>
        {item.label}: {value}
      </Typography>
    ) : null;
  };

  const workingHoursElement = (el: any) => {
    return el.duration ? (
      <Typography gutterBottom>
        {DaysOfWeek[el.dayOfWeek]}: {el.startHour} - {el.startHour + el.duration}
      </Typography>
    ) : null;
  };

  const removeAccount = async () => {
    const shouldDelete = confirm("Czy na pewno chcesz usunąć konto?");
    if (shouldDelete) {
      await deleteAccount();
      auth.logout();
    }
  };

  const { data: applicationsData, refetch: refetchApplications } = isStudent ? 
    useQuery({
      queryKey: ['applications', applicationsPage],
      queryFn: () => getApplications({ id, page: applicationsPage }),
      keepPreviousData : true
    }) 
    : { data: [], refetch: () => {} };

  const { data: offerData, refetch: refetchOffers } = isCompany ? useQuery({
    queryKey: ['offers', offersPage],
    queryFn: () => getRecruiterOffers({ id, page: offersPage }),
    keepPreviousData : true
  }) : { data: [], refetch: () => {} };

  const { data: reviewsData, refetch: refetchReviews } = useQuery({
    queryKey: ['reviews', reviewsPage],
    queryFn: () => getReviews({ id, type, page: reviewsPage }),
    keepPreviousData : true
  });

  const getProfileData = async () => {
    const newData = await getProfile(id, type);
    if (newData.resume !== null) setViewPdf(`data:application/pdf;base64,${newData.resume}`);
    setProfileData(newData);
  };

  const getProfilePic = async () => {
    const newPic = await getImage(id);
    setProfilePic(newPic.photo);
  };

  const closeListedOffer = 
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    if (isProcessing) return;
    setIsProcessing(true);

    await closeOffer(id).then(async _ => {
      await refetchApplications();
      setIsProcessing(false);
    });
  };

  const deleteListedOffer = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    if (isProcessing) return;
    setIsProcessing(true);

    await deleteOffer(id).then(async _ => {
      await refetchOffers();
      setIsProcessing(false);
    });
  };

  const withdrawOffer = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    if (isProcessing) return;
    setIsProcessing(true);

    await withdrawFromOffer(id).then(async _ => {
      await refetchApplications();
      setIsProcessing(false);
    });
  };

  const deleteUserReview = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    if (isProcessing) return;
    setIsProcessing(true);

    await deleteReview(id).then(async _ => {
      await refetchReviews();
      setIsProcessing(false);
    });
  };

  const deleteStudentApplication = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    if (isProcessing) return;
    setIsProcessing(true);

    await deleteApplication(id).then(async _ => {
      await refetchApplications();
      setIsProcessing(false);
    });
  };

  useEffect(() => {
    getProfileData();
    getProfilePic();
  }, []);

  return profileData ? (
    <Backdrop open className="registerBackground">
      <Card id="profileCard" sx={{ boxShadow: 12, borderRadius: 10 }}>
        <Box id="profileHeader">
          <Avatar id="profilePic" alt="Profile Picture" src={profilePic ? `data:image/jpeg;base64,${profilePic}` : imgDefault} />
          <Box>
            <Rating 
              name="read-only"
              size="large"
              getLabelText={(value) => `${value}`}
              value={profileData?.rating ?? 0}
              precision={0.1}
              readOnly />
            {profileData?.rating !== null && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {`${strings.profileView.meanScore} ${profileData?.rating}`}
              </Box>
            )}
          </Box>
        </Box>
        {profileForm.profile.info.map((item) => profileElement(item))}
        {profileData.availability?.map((el) => workingHoursElement(el))}
        {viewAllowance && isStudent && applicationsData?.items && applicationsData.items.length > 0 && (
            <div>
              <Typography variant="h6" gutterBottom>Aplikacje:</Typography>
              {applicationsData.items.map((item: any) => (
                <Card key={item.id} id="applicationsCard" sx={{ boxShadow: 10 }} onClick={() => navigate(`/work-offer/${item.offerId}`)}>
                  <Typography id="text" height={40} noWrap>{item.offer.company} - {item.offer.title} ({Math.round(item.distance)} km) Status: {item.status}</Typography>
                  {item.status === "Submitted" && (
                    <IconButton id="profileButton" onClick={(e) => withdrawOffer(e, item.id)}>
                      <CloseIcon />
                    </IconButton>
                  )}
                  {isAdmin && !isProcessing && (
                    <IconButton id="profileButton" onClick={(e) => deleteStudentApplication(e, item.id)}>
                      <DeleteIcon />
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
            </div>
          )
        }

        {viewAllowance && isCompany && offerData?.items && offerData.items.length > 0 && (
            <div>
              <Typography variant="h6" gutterBottom>Oferty:</Typography>
              {offerData.items.map((item: any) => (
                <Card id="offersCard" key={item.id} sx={{ boxShadow: 10 }} onClick={() => navigate(`/work-offer/${item.id}`)}>
                  <Typography id="text" height={40} noWrap>{item.title} - {item.role} ({item.status})</Typography>
                  {item.status !== 'Finished' && !isProcessing && (
                    <IconButton id="profileButton" onClick={(e) => closeListedOffer(e, item.id)}>
                      <LockIcon />
                    </IconButton>
                  )}
                  {isAdmin && !isProcessing && (
                    <IconButton id="profileButton" onClick={(e) => deleteListedOffer(e, item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Card>
              ))}
              <Box sx={{ display: 'flex', margin: '20px' }}>
                <Pagination 
                  count={offerData?.metaData?.pageCount ?? 1}
                  page={offersPage}
                  color="primary"
                  sx={{ margin: 'auto' }} 
                  onChange={(_, page) => setOffersPage(page)}
                />
              </Box>
            </div>
          )
        }

        <Typography variant="h6" gutterBottom>Recenzje:</Typography>
        {reviewsData?.items && reviewsData.items.length > 0 ? (
            <div>
              {reviewsData.items.map((item: any) => (
                <Card key={item.id} id="reviewsCard" sx={{ boxShadow: 10 }}>
                  <Typography key={item.id}>
                    {item.title} ({item.rating} <StarIcon fontSize="inherit" sx={{ verticalAlign: 'text-top' }}/>)
                  </Typography>
                  <Typography>{item.message}</Typography>
                  {isAdmin && !isProcessing && (
                    <IconButton id="profileButton" onClick={(e) => deleteUserReview(e, item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Card>
              ))}
              <Box sx={{ display: 'flex', margin: '20px' }}>
                <Pagination 
                  count={reviewsData?.metaData?.pageCount ?? 1}
                  page={reviewsPage}
                  color="primary"
                  sx={{ margin: 'auto' }} 
                  onChange={(_, page) => setReviewsPage(page)}
                />
              </Box>
            </div>
          ) : <Typography gutterBottom align='center'>Brak danych</Typography>          
        }

        {viewAllowance && (
          <Button 
            type="submit"
            variant="contained"
            color="error"
            sx={{ width: '30%', alignSelf: 'center', borderRadius: 10 }}
            onClick={removeAccount}
          >
            Usuń konto
          </Button>
        )}
      </Card>
    </Backdrop>
  ) : (
    <Backdrop open className="registerBackground">
      <Card id="profileCard" sx={{ boxShadow: 12, borderRadius: 10 }}>
        <CircularProgress id="spinner" />
      </Card>
    </Backdrop>
  );
}

export default Profile
