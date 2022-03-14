import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          display: 'inline',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
          border: '0px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          p: 1,
          m: 1,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '450',
          paddingTop: .5,
          height: 20,
          width: 60,
          ...sx,
        }}
        {...other}
      />
    );
  }
    
  Item.propTypes = {
    sx: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
      ),
      PropTypes.func,
      PropTypes.object,
    ]),
  };

export default Item;