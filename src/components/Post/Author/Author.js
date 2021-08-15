// @flow strict
import React from 'react';
import { getContactHref } from '../../../utils';
import styles from './Author.module.scss';
import { useSiteMetadata } from '../../../hooks';

const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles['author']}>
      <p className={styles['author__bio']}>
        Got feedback? Send me a message in&nbsp;
        <a href={getContactHref('twitter', author.contacts.twitter)}
          rel="noopener noreferrer"
          target="_blank"
        >
          Twitter
        </a>
        ,&nbsp;
        <a href={getContactHref('github', author.contacts.twitter)}
          rel="noopener noreferrer"
          target="_blank"
        >
          Github
        </a>
        ,&nbsp;
        <a href={getContactHref('linkedin', author.contacts.linkedin)}
          rel="noopener noreferrer"
          target="_blank"
        >
        LinkedIn
        </a>
        &nbsp; or &nbsp;
        <a href={getContactHref('youtube', author.contacts.youtube)}
          rel="noopener noreferrer"
          target="_blank"
        >
          Youtube
        </a>        
      </p>     
    </div>
  );
};

export default Author;
