import { Box, Container } from '@mui/material';
import HeroSection from '../components/homepage/HeroSection';
import { motion } from 'framer-motion';
import SecondSection from '../components/homepage/SecondSection';
import ThirdSection from '../components/homepage/ThirdSection';
import FourthSection from '../components/homepage/FourthSection';
import FifthSection from '../components/homepage/FifthSection';
import FAQSection from '../components/homepage/FAQSection';

const Homepage = () => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: 'fit-content',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md" sx={{ my: 6 }}>
          <HeroSection />
        </Container>
      </Box>
      <Box
        mt={5}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: 'fit-content',
          textAlign: 'center',
          backgroundColor: '#E8E8E8',
        }}
      >
        <Container maxWidth="md" sx={{ my: 6 }}>
          <SecondSection />
        </Container>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          backgroundColor: '#F0F0F0',
        }}
      >
        <Container maxWidth="lg" sx={{ my: 6 }}>
          <ThirdSection />
        </Container>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          backgroundColor: '#E8E8E8',
        }}
      >
        <Container maxWidth="lg" sx={{ my: 6 }}>
          <FourthSection />
        </Container>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          backgroundColor: '#F0F0F0',
        }}
      >
        <Container maxWidth="lg" sx={{ my: 6 }}>
          <FifthSection />
        </Container>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: '50vh',
          backgroundColor: '#E8E8E8',
        }}
      >
        <Container maxWidth="lg" sx={{ my: 6 }}>
          <FAQSection />
        </Container>
      </Box>
    </motion.div>
  );
};

export default Homepage;
