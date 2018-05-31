import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default props => {
  return (
    <div>
      <Header />
      <div className="container main-container">
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
            integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp"
            crossorigin="anonymous"
          />
          <link rel="stylesheet" href="/static/css/main.css" />
        </Head>
        <div className="testContainer bordes z-depth-3">
          {props.children}
          <div className="divider" />
          <p className="footerText">
            Aplicación desarrollada por <i className="far fa-copyright" /> Ivan
            García Gálvez - Repositorio{' '}
            <a href="https://github.com/valkyriaivan/CryptoCampaigns">
              GitHub <i className="fab fa-github" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
