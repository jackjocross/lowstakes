import React from 'react';
import { Layout } from '../layouts';
import Flipster from '../components/Flipster';

const Jukebox = () => (
  <Layout>
    <Flipster id="flipster-one" />
    <Flipster id="flipster-two" />
  </Layout>
);

export default Jukebox;
