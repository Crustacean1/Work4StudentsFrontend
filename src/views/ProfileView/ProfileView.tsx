import { useEffect, useState } from 'react';
import { Avatar, Backdrop, Box, Card, Pagination, Rating, Typography } from '@mui/material';
import strings from '../../const/strings';
import { UserType, useStore } from '../../stores/store';
import { data as profileForm } from '../../const/register.const';
import { ProfileData } from '../../const/types.const';
import { getProfile } from '../../functions/getProfile';
import { imgDefault } from '../../const/profileForm.const';
import './ProfileView.css';
import { useQuery } from 'react-query';
import { getApplications } from '../../functions/getApplications';
import { getRecruiterOffers } from '../../functions/getRecruiterOffers';
import { useNavigate } from 'react-router-dom';
import { getReviews } from '../../functions/getReviews';
import StarIcon from '@mui/icons-material/Star';
import { getImage } from '../../functions/getImage';
import { Document } from 'react-pdf';

const Profile = () => {
  const [applicationsPage, setApplicationsPage] = useState<number>(1);
  const [offersPage, setOffersPage] = useState<number>(1);
  const [reviewsPage, setReviewsPage] = useState<number>(1);
  const [profileData, setProfileData] = useState<ProfileData>();
  const [profilePic, setProfilePic] = useState<string>('');

  const store = useStore();
  const navigate = useNavigate();

  const profileElement = (item: { name: string[]; label: string; delimiter?: any[]; type?: UserType }) => {
    let value = '';
    item.name.map((el, index) => {
      const key = Object.keys(profileData ?? {}).findIndex(value => value === el);
      value += `${Object.values(profileData ?? {})[key]}${
        (item.delimiter && item.delimiter[index]) ? item.delimiter[index] : ''
      }
      ${(index !== item.name.length - 1) ? ' ' : ''}`
    });

    if(item.name.includes('resume')) return (
      <div key={item.label}>
        <Typography variant="h6" gutterBottom>
          {item.label}:
        </Typography>
        {profileData?.resume ? <Document file={profileData?.resume} /> : <Typography gutterBottom>Nie dodano jeszcze CV</Typography>}
      </div>
    );

    return item.type === undefined || item.type !== undefined 
      && (store.userType === item.type || store.userType === UserType.Admin) ? (
      <Typography key={item.label} variant="h6" gutterBottom>
        {item.label}: {value}
      </Typography>
    ) : null;
  };

  const { data: applicationsData } =  store.userType === UserType.Student ? useQuery({
    queryKey: ['applications', applicationsPage],
    queryFn: () => getApplications({ page: applicationsPage }),
    keepPreviousData : true
  }) : { data: [] };

  const { data: offerData } = store.userType === UserType.Company ? useQuery({
    queryKey: ['offers', offersPage],
    queryFn: () => getRecruiterOffers({ page: offersPage }),
    keepPreviousData : true
  }) : { data: [] };

  const { data: reviewsData } = useQuery({
    queryKey: ['reviews', reviewsPage],
    queryFn: () => getReviews({ page: reviewsPage }),
    keepPreviousData : true
  });

  const getProfileData = async () => {
    const newData = await getProfile();
    setProfileData(newData);
  };

  const getProfilePic = async () => {
    const newPic = await getImage();
    setProfilePic(newPic[0]);
  };

  useEffect(() => {
    getProfileData();
    getProfilePic();
  }, []);

  return (
    <Backdrop open className="registerBackground">
      <Card id="profileCard" sx={{ boxShadow: 12, borderRadius: 10 }}>
        <Box id="profileHeader">
          <Avatar id="profilePic" alt="Profile Picture" src={profilePic ?? imgDefault} />
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
        {store.userType === UserType.Student && applicationsData?.items &&
          applicationsData.items.length > 0 && (
            <div>
              <Typography variant="h6" gutterBottom>Aplikacje:</Typography>
              {applicationsData.items.map((item: any) => (
                 <Card key={item.id} id="applicationsCard" sx={{ boxShadow: 10 }} onClick={() => navigate(`/work-offer/${item.offerId}`)}>
                  <Typography>{item.offer.company} - {item.offer.title} ({Math.round(item.distance)} km)</Typography>
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

        {store.userType === UserType.Company &&
          offerData?.items && offerData.items.length > 0 && (
            <div>
              <Typography variant="h6" gutterBottom>Oferty:</Typography>
              {offerData.items.map((item: any) => (
                <Typography key={item.id}>{item.offerId}</Typography>
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
      </Card>
    </Backdrop>
  )
}

export default Profile
