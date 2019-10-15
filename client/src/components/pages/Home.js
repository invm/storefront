import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Container, Badge } from 'reactstrap';

const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    if (localStorage.token) authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className='home-brand'>
        <Container style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <p className='brand-name my-h1'>Storefront</p>
            <p className='brand-name my-h2'>
              The all-in-one solution for advanced logistics needs.
            </p>
            <p className='brand-name my-p'>
              Storefront provides simple solutions for complicated issues
              surrounding logistics in store management. <br /> We take care of
              ALL the supply chain management of your stores, while you focus on
              running your business. <br /> No need to schedule hundreds of
              deliveries from hundreds of suppliers, we got it all covered.
            </p>
          </div>
        </Container>
      </div>
      <Container>
        <div
          style={{
            marginTop: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <span className='h3 text-center'>
            Storefront is a Logistics as a service provider operating worldwide
            in order to simplify the supply chain complexities and ease the work
            for store owners and store chains.
            <br />
            <span
              className='col-2'
              style={{ fontSize: '5rem' }}
              role='img'
              aria-label='truck'
            >
              🚚{' '}
            </span>
            <br />
            <span>
              Storefront works with over 10000 suppliers and importers from
              around the globe to provide the best products at the best rate and
              as soon as needed.
            </span>
          </span>
          <div className='row'>
            <p className='col-xs-12 col-md-4' style={{ fontWeight: '600' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              accusantium deleniti nulla. Veniam, iste debitis officia
              blanditiis et dolorem facere.
            </p>
            <p className='col-xs-12 col-md-8'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi rem
              iusto magnam dolores laboriosam, corporis deserunt cumque! Labore
              ipsa quia totam atque exercitationem fugiat quam, at provident
              incidunt impedit quisquam? Voluptas ipsa laborum nesciunt dolore
              quisquam voluptates voluptatibus aspernatur perspiciatis quo quia!
              A impedit quisquam ipsa animi veritatis esse repudiandae!
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <h2>How does it work?</h2>
            <div
              style={{
                fontSize: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <Badge color='info'>Register</Badge>⬇
              <Badge color='info'>Add first store</Badge>⬇
              <Badge color='info'>Make first order</Badge>⬇
              <Badge color='info'>
                Sit back and relax
                <span
                  style={{ fontSize: '2rem' }}
                  role='img'
                  aria-label='cocktail'
                >
                  🍹
                </span>
              </Badge>
            </div>
            <h2>Now we take care of things</h2>
            <p>
              When you make an order, you specify a delivery date, and contact
              details , thats all we need.{' '}
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet
              quibusdam culpa nihil obcaecati commodi fugiat ab porro reiciendis
              perspiciatis, hic iste repudiandae! Libero reprehenderit deserunt
              voluptas molestiae eos dolores at minus dolor dolorum pariatur,
              velit assumenda suscipit odio corporis incidunt, debitis nulla
              culpa! Nulla libero iure modi laudantium explicabo debitis porro
              odit illo, reprehenderit ex autem iste, accusantium labore
              repellat quam fuga suscipit sed deleniti at asperiores. Fuga aut
              eligendi incidunt cupiditate natus maxime illum ad officiis
              placeat deserunt exercitationem laborum dolor commodi culpa, dicta
              dolorum veritatis aperiam tempora atque temporibus facilis nisi
              soluta. Saepe adipisci odio explicabo commodi nulla.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
