import { Backdrop, Button, Card, Grid, TextField } from '@mui/material';
import strings from '../../const/strings';
import { offerFormData } from '../../const/offers.const';
import './AddOffer.css';

const AddOffer = () => {
  const sendOffer = () => {};

  const gridElement = (el: any) => {
    return (
      <TextField
        required
        rows={5}
        name={el.name}
        label={el.label}
        className='regFormField'
        multiline={el.multiline}
        sx={{ width: el.halfSize ? '44%' : '90%' }}
        type={el.name.toLowerCase().includes('password') ? 'password' : ''}
      />
    )
  };

  return (
    <Backdrop open className="registerBackground">
      <Card id="addOfferCard" sx={{ boxShadow: 12, borderRadius: 10 }}>
        <Grid container id="addOfferContainer" component="form" onSubmit={sendOffer}>
          {Object.values(offerFormData.column).map((el) => gridElement(el))}
          <Button variant="contained" type="submit" id="addOfferButton">
            {strings.addOffer.button}
          </Button>
        </Grid>
      </Card>
    </Backdrop>
  )
}

export default AddOffer
