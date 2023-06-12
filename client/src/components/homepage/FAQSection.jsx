import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ThemeProvider,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { theme } from '../../utils/themeUtils';
import SportsBarIcon from '@mui/icons-material/SportsBar';

const FAQSection = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
        >
          <Typography
            variant="h4"
            fontWeight="medium"
            sx={{
              fontSize: {
                xs: '1.8rem',
                sm: '1.9rem',
                md: '2.0rem',
                lg: '2.2rem',
              },
            }}
          >
            What you might be wondering:
          </Typography>
        </Box>
        <Box mt={5}>
          <Accordion
            sx={{
              background: 'transparent',
              boxShadow: 'none',
              '&:before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                borderBottom: theme => `1px solid ${theme.palette.divider}`,
                marginBottom: theme => theme.spacing(1),
              }}
            >
              <Typography variant="h6">Is CodeSnippet free to use?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                CodeSnippet is completely free, and it's going to stay free.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              background: 'transparent',
              boxShadow: 'none',
              '&:before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                borderBottom: theme => `1px solid ${theme.palette.divider}`,
                marginBottom: theme => theme.spacing(1),
              }}
            >
              <Typography variant="h6">How can I share my snippets?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                It's as simple as clicking on "Copy Link" in your vault, or by
                copying the URL while editing your snippet.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              background: 'transparent',
              boxShadow: 'none',
              '&:before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                borderBottom: theme => `1px solid ${theme.palette.divider}`,
                marginBottom: theme => theme.spacing(1),
              }}
            >
              <Typography variant="h6">
                Can I edit or update my code snippets after sharing them?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Absolutely, this is your personal vault for snippets, you can do
                anything you want!
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              background: 'transparent',
              boxShadow: 'none',
              '&:before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                borderBottom: theme => `1px solid ${theme.palette.divider}`,
                marginBottom: theme => theme.spacing(1),
              }}
            >
              <Typography variant="h6">
                Is there a limit to the number of code snippets I can store on
                CodeSnippet?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nope, you're free to store as many snippets as you wish.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              background: 'transparent',
              boxShadow: 'none',
              '&:before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                borderBottom: theme => `1px solid ${theme.palette.divider}`,
                marginBottom: theme => theme.spacing(1),
              }}
            >
              <Typography variant="h6">
                How long can I store the snippets, is there a time limit?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                There are no time limits, the snippet is going to be in your
                vault until you delete it.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              background: 'transparent',
              boxShadow: 'none',
              '&:before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                borderBottom: theme => `1px solid ${theme.palette.divider}`,
                marginBottom: theme => theme.spacing(1),
              }}
            >
              <Typography variant="h6">
                How can I support you and CodeSnippet?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Any support is greatly appreciated and would help for running
                costs. You can buy me a beer{' '}
                <a href="https://www.buymeacoffee.com/IvanXh0">here</a>.{' '}
                <SportsBarIcon />
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default FAQSection;
