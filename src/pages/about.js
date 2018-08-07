import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { Card } from '../components/Card';
import { GUTTER } from '../utils/constants';

const About = () => (
  <PageWrapper>
    <Card padding={GUTTER.LG}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Sodales ut eu sem
        integer vitae justo. Imperdiet sed euismod nisi porta. Id volutpat lacus
        laoreet non curabitur gravida arcu ac. Semper risus in hendrerit gravida
        rutrum quisque non tellus orci. Non enim praesent elementum facilisis
        leo.
      </p>
      <p>
        Risus at ultrices mi tempus imperdiet. Volutpat sed cras ornare arcu.
        Mattis aliquam faucibus purus in massa tempor nec feugiat nisl. Integer
        eget aliquet nibh praesent. Rhoncus urna neque viverra justo. Enim
        tortor at auctor urna nunc. Nam aliquam sem et tortor consequat id
        porta. Est sit amet facilisis magna. Tempus egestas sed sed risus
        pretium quam vulputate. Ut morbi tincidunt augue interdum velit euismod.
        Et malesuada fames ac turpis egestas maecenas pharetra. Nunc lobortis
        mattis aliquam faucibus purus in massa tempor.\n\nSem fringilla ut morbi
        tincidunt. Vestibulum rhoncus est pellentesque elit. In fermentum
        posuere urna nec tincidunt praesent. Volutpat blandit aliquam etiam erat
        velit scelerisque in dictum non. Et netus et malesuada fames. Ut sem
        nulla pharetra diam sit amet nisl suscipit adipiscing. Auctor elit sed
        vulputate mi sit amet mauris commodo.
      </p>
      <p>
        Eros in cursus turpis massa. Mi ipsum faucibus vitae aliquet nec
        ullamcorper sit amet risus. Purus in mollis nunc sed id. Tellus at urna
        condimentum mattis. Turpis cursus in hac habitasse. Aliquet lectus proin
        nibh nisl condimentum id venenatis a. Ac placerat vestibulum lectus
        mauris ultrices eros in cursus. Nisl tincidunt eget nullam non. Id nibh
        tortor id aliquet lectus proin.
      </p>
    </Card>
  </PageWrapper>
);

export default About;
