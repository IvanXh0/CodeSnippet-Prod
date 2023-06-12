import Snippets from '../components/snippets/Snippets';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const SnippetPage = () => {
  return (
    <>
      <Helmet>
        <title>My Vault | CodeSnippet</title>
      </Helmet>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Snippets />
      </motion.div>
    </>
  );
};

export default SnippetPage;
